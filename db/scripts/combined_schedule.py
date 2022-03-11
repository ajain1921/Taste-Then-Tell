#!/usr/bin/env python3
import csv
import names
import random


print(names.get_full_name())

uids = []
x = dict()


with open('db/csv/combinedSchedule.csv', 'w', newline='') as csvfile1:
    spamwriter = csv.writer(csvfile1, delimiter=',')
  

    with open('db/csv/schedule.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if (row['university_id'] not in x):
                uids.append(row['university_id'])
                x[row['university_id']] = 0 

    

print(uids) 
num = len(uids)     



        