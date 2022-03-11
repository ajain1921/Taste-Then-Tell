#!/usr/bin/env python3
import csv

x = dict()


      
with open('db/csv/all_food_data_not_combined.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if ((row['itemname']).strip() in x):
            y = x[row['itemname'].strip()]
            y['allergen'].append(row['allergen'])
        else:
            x[row['itemname'].strip()] = {'food_id': row['food_id'], 'allergen': []}

with open('db/csv/foods.csv', 'w', newline='') as csvfile1:
    spamwriter = csv.writer(csvfile1, delimiter=',')
    for a in x:
        if (not x[a]['food_id']):
            continue
        if (x[a]['allergen']):
            #print(x[a]['allergen'][0])
            spamwriter.writerow([x[a]['food_id'], a, x[a]['allergen'][0]])
        else:
            spamwriter.writerow([x[a]['food_id'], a])
            
print(x['Beans Green Whole (frozen)'])