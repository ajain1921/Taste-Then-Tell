#!/usr/bin/env python3
import requests
import csv


UIUC_Dining_Halls = ["FAR Dining Hall", "IKE Dining Center", "ISR Dining Center", "LAR Dining Hall", "PAR Dining Hall"]
UIUC_University_ID = 145637

response = requests.get("https://api.cs50.io/dining/locations")

Harvard_Dining_Halls = []
locations = response.json()
for location in locations:
    Harvard_Dining_Halls.append(location["name"])

Harvard_University_ID = 166027

response = requests.get("https://m.mit.edu/apis/dining/venues/house/")

MIT_Dining_Halls = []
locations = response.json()
for location in locations:
    MIT_Dining_Halls.append(location["short_name"])

MIT_University_ID = 166683

dining_halls = {
    UIUC_University_ID: UIUC_Dining_Halls,
    Harvard_University_ID: Harvard_Dining_Halls,
    MIT_University_ID: MIT_Dining_Halls
}

response = requests.get("https://michigan-dining-api.tendiesti.me/v1/diningHalls")

UMich_Dining_Halls = []
locations = response.json()
for location in locations['diningHalls']:
    UMich_Dining_Halls.append(location["name"])

UMich_University_ID = 170976

dining_halls = {
    UIUC_University_ID: UIUC_Dining_Halls,
    Harvard_University_ID: Harvard_Dining_Halls,
    MIT_University_ID: MIT_Dining_Halls,
    UMich_University_ID: UMich_Dining_Halls
}

print(dining_halls)

i = 0

with open('db/csv/dining_halls.csv', 'w', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(["dining_hall_id", "university_id", "name"])
    for d in dining_halls:
        for x in dining_halls[d]:
            spamwriter.writerow([i, d, x])
            i += 1
        

    




            