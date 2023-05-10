const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: 'postgresql://postgres:ignas@localhost:5432/pcbuilds',
});

app.use(cors()); 
app.use(express.json())

app.get('/api/parts/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { socket } = req.query;
    const result = await pool.query(
      `SELECT * FROM ${type}${socket ? ` WHERE socket ILIKE '%' || $1 || '%'` : ""}`,
      socket ? [socket] : []
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'xml.xml');
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    res.status(400).send('No file was uploaded');
    return;
  }

  try {
    const pythonProcess = spawn('python', ['./uploads/xml_upload.py']);
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        res.status(200).send('File uploaded and processed successfully');
      } else {
        res.status(500).send('Error occurred while processing the file');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while processing the file');
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE login = $1 AND password = $2',
      [username, password]
    );

    if (result.rowCount === 1) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

