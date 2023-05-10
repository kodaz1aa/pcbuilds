import json
import psycopg2
from datetime import datetime
import re

db_config = {
    'dbname': 'pcbuilds',
    'user': 'postgres',
    'password': 'ignas',
    'host': 'localhost',
    'port': '5432'
}

 
json_files = ['data19.json', 'data20.json', 'data21.json', 'data22.json', 'data23.json']

def read_json_file(file_name):
    with open(file_name, 'r') as file:
        data = json.load(file)
    return data

def delete_all_records(conn):
    cursor = conn.cursor()
    cursor.execute("DELETE FROM existing_cpu")
    cursor.execute("ALTER SEQUENCE existing_cpu_id_seq RESTART WITH 1")
    conn.commit()
    cursor.close()

def insert_records(records, conn):
    cursor = conn.cursor()

    for record in records:
        if not record:  
            continue

        
        name = record['Name'].strip()

        
        cores_str = record['Cores']
        cores = int(re.search(r'\d+', cores_str).group())

        cursor.execute("""
            INSERT INTO existing_cpu (name, codename, cores, clock, socket, process, l3_cache, tdp, released)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            name,  
            record['Codename'],
            cores,  
            record['Clock'],
            record['Socket'],
            record['Process'],
            record['L3 Cache'],
            record['TDP'],
            record['Released']  
        ))

    conn.commit()
    cursor.close()

def main():
    conn = psycopg2.connect(**db_config)
    delete_all_records(conn)

    for json_file in json_files:
        records = read_json_file(json_file)
        insert_records(records, conn)

    conn.close()

if __name__ == '__main__':
    main()