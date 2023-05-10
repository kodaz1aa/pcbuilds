import requests
from bs4 import BeautifulSoup

url = 'https://www.techpowerup.com/cpu-specs/?released=2023&sort=name'
page2023 = requests.get(url)
page2022 = requests.get("https://www.techpowerup.com/cpu-specs/?released=2022&sort=name")
page2021 = requests.get("https://www.techpowerup.com/cpu-specs/?released=2021&sort=name")
page2020 = requests.get("https://www.techpowerup.com/cpu-specs/?released=2020&sort=name")
page2019 = requests.get("https://www.techpowerup.com/cpu-specs/?released=2019&sort=name")

with open  ("p23.html", "w") as f: 
    f.write(page2023.content.decode('utf-8'))

with open  ("p22.html", "w") as f: 
    f.write(page2022.content.decode('utf-8'))

with open  ("p21.html", "w") as f: 
    f.write(page2021.content.decode('utf-8'))

with open  ("p20.html", "w") as f: 
    f.write(page2020.content.decode('utf-8'))

with open  ("p19.html", "w") as f: 
    f.write(page2019.content.decode('utf-8'))

