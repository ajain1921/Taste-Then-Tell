#!/usr/bin/env python3
import csv
import pandas as pd

temp = pd.Timestamp("8/17/2020")
print(temp,  temp.day_of_week, temp.day_name())


x = dict()


      
""" with open('db/csv/combinedSchedule.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if ((row['itemname']).strip() in x):
            y = x[row['itemname'].strip()]
            y['allergen'].append(row['allergen'])
        else:
            x[row['itemname'].strip()] = {'food_id': row['food_id'], 'allergen': []}

with open('db/csv/foods.csv', 'w', newline='') as csvfile1:
    spamwriter = csv.writer(csvfile1, delimiter=',')
    spamwriter.writerow(["food_id", "name"])
    for a in x:
        if (not x[a]['food_id']):
            continue
        b = a.replace(",", " &")
        b = b.replace("\"", " in.")
        spamwriter.writerow([x[a]['food_id'], b])


with open('db/csv/food_allergens.csv', 'w', newline='') as csvfile1:
    spamwriter = csv.writer(csvfile1, delimiter=',')
    spamwriter.writerow(["food_id", "allergen"])
    for a in x:
        if (not x[a]['food_id']):
            continue
        if (x[a]['allergen']):
            allergens = x[a]['allergen'][0].split(',')
            for allergen in allergens:
                spamwriter.writerow([x[a]['food_id'], allergen])
            
print(x['Beans Green Whole (frozen)']) """