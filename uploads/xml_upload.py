import xml.etree.ElementTree as ET
import psycopg2

def upload_to_database(table, title, price, url, socket=None, memory=None):
    try:
        connection = psycopg2.connect(
            host="localhost",
            database="pcbuilds",
            user="postgres",
            password="ignas"
        )
        cursor = connection.cursor()

        if table == 'motherboard':
            query = f"INSERT INTO {table} (name, price, url, socket, memory) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(query, (title, price, url, socket, memory))
        else:
            query = f"INSERT INTO {table} (name, price, url) VALUES (%s, %s, %s)"
            cursor.execute(query, (title, price, url))

        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print("Error while uploading data to the database:", error)

    finally:
        if connection:
            cursor.close()
            connection.close()

def truncate_table(table):
    try:
        connection = psycopg2.connect(
            host="localhost",
            database="pcbuilds",
            user="postgres",
            password="ignas"
        )
        cursor = connection.cursor()

        query = f"TRUNCATE TABLE {table}; ALTER SEQUENCE {table}_id_seq RESTART WITH 1;"
        cursor.execute(query)
        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print("Error while truncating table:", error)

    finally:
        if connection:
            cursor.close()
            connection.close()

def extract_cpu_name(product):
    desired_spec_names = [
        "CPU code",
        "Processor model",
        "*Model number",
        "*Prozessor",
        "*Processor Type",
    ]
    for spec in product.findall("specs/spec"):
        spec_name = spec.get("name")
        if spec_name in desired_spec_names:
            return spec.text.strip()
    return None

def get_socket_and_memory(title):
    socket_memory_map = {
        "AM4": ("DDR4", ["B550", "B450", "B350", "X570", "X470", "X370", "A320", "A420", "A520"]),
        "AM5": ("DDR5", ["B650", "X670", "A620"]),
        "1200": ("DDR4", ["H410", "B460", "H470", "Q470", "Z490", "W480", "H510", "B560", "H570", "Q570", "Z590", "W580"]),
        "1700": ("DDR4", ["H610", "B660", "H670", "Q670", "Z690", "W680"]),
        "1700_DDR5": ("DDR5", ["B760", "H770", "Z790"]),
    }

    for socket, (memory, phrases) in socket_memory_map.items():
        for phrase in phrases:
            if phrase in title:
                if socket == "1700_DDR5":
                    socket = "1700"
                return socket, memory
    return None, None

def parse_xml_and_upload_data(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()

    category_to_table = {
        "Procesoriai (CPU)": "cpu_with_socket",
        "CPU aušintuvai": "cooler",
        "Korpusai": "deze",
        "Vaizdo plokštės (GPU)": "gpu",
        "Pagr. plokštės": "motherboard",
        "Maitinimo blokai (PSU)": "psu",
        "Kompiuterių RAM atmintis": "ram",
        "Vidiniai SSD diskai": "storage",
        "Vidiniai HDD diskai": "storage"
    }

    tables = set(category_to_table.values())
    for table in tables:
        truncate_table(table)

    for product in root.findall("product"):
        price = float(product.find("item_price").text.strip())
        url = product.find("product_url").text.strip() if product.find("product_url") is not None else None
        category = product.find("categories/category").text.strip()

        table_name = category_to_table.get(category)
        if table_name == "cpu_with_socket":
            title = extract_cpu_name(product)
            if title:
                upload_to_database(table_name, title, price, url)
        elif table_name == "motherboard":
            title = product.find("title").text.strip()
            socket, memory = get_socket_and_memory(title)
            upload_to_database(table_name, title, price, url, socket, memory)
        elif table_name:
            title = product.find("title").text.strip()
            upload_to_database(table_name, title, price, url)

    print("All rows have been inserted")

if __name__ == "__main__":
    xml_file = "xml.xml"
    parse_xml_and_upload_data(xml_file)

