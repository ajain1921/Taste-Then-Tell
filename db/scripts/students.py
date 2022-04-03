#!/usr/bin/env python3
import csv
import names
import random


print(names.get_full_name())

uids = []
x = dict()

with open('db/csv/colleges.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if (row['university_id'] not in x):
            uids.append(row['university_id'])
            x[row['university_id']] = 0 

print(uids) 
num = len(uids)     

with open('db/csv/students.csv', 'w', newline='') as csvfile1:
    spamwriter = csv.writer(csvfile1, delimiter=',', lineterminator='\n')
    spamwriter.writerow(["user_id", "university_id", "first_name", "last_name", "email", "password"])
    
    for i in range(1000):
        name = names.get_full_name()
        first = name.split(" ")[0]
        last = name.split(" ")[1]
        email = first + last + "@gmail.com"
        spamwriter.writerow([i, uids[random.randint(0, num-1)], first, last, email, "test123"])

        