from bs4 import BeautifulSoup
import json

with open("p23.html") as f:
    soup = BeautifulSoup(f)

    table = soup.find_all('table')[1]
    headers = [heading.text for heading in table.find_all('th')]
    headers.pop(0)
    table_rows = [row for row in table.find_all('tr')]
    results = [{headers[index]: cell.text.replace(
        'Socket ', '') for index, cell in enumerate(row.find_all("td"))} for row in table_rows]

    with open('data23.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)


with open("p22.html") as f:
    soup = BeautifulSoup(f)
    table = soup.find_all('table')[1]
    headers = [heading.text for heading in table.find_all('th')]
    headers.pop(0)
    table_rows = [row for row in table.find_all('tr')]
    results = [{headers[index]: cell.text.replace(
        'Socket ', '') for index, cell in enumerate(row.find_all("td"))} for row in table_rows]

    with open('data22.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)

with open("p21.html") as f:
    soup = BeautifulSoup(f)

    table = soup.find_all('table')[1]
    headers = [heading.text for heading in table.find_all('th')]
    headers.pop(0)
    table_rows = [row for row in table.find_all('tr')]
    results = [{headers[index]: cell.text.replace(
        'Socket ', '') for index, cell in enumerate(row.find_all("td"))} for row in table_rows]

    with open('data21.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)


with open("p20.html") as f:
    soup = BeautifulSoup(f)

    table = soup.find_all('table')[1]
    headers = [heading.text for heading in table.find_all('th')]
    headers.pop(0)
    table_rows = [row for row in table.find_all('tr')]
    results = [{headers[index]: cell.text.replace(
        'Socket ', '') for index, cell in enumerate(row.find_all("td"))} for row in table_rows]

    with open('data20.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)

with open("p19.html") as f:
    soup = BeautifulSoup(f)

    table = soup.find_all('table')[1]
    headers = [heading.text for heading in table.find_all('th')]
    headers.pop(0)
    table_rows = [row for row in table.find_all('tr')]
    results = [{headers[index]: cell.text.replace(
        'Socket ', '') for index, cell in enumerate(row.find_all("td"))} for row in table_rows]

    with open('data19.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)
