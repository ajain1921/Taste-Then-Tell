#!/usr/bin/env python3
import csv
import names
import random
import datetime

print(names.get_full_name())

uids = []
x = dict()


x ={0: "M", 1: "T", 2: "W", 3: "Th", 4: "F", 5: "S", 6: "Su"}

with open('db/csv/newCombinedSchedule.csv', 'r', newline='') as csvfile1:
    next(csvfile1)
    reader = csv.reader(csvfile1, delimiter=',')
  

    with open('db/csv/scheduleWithDays.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)

        for row in reader:
            date = row[2].split("/")
            b = datetime.datetime(int(date[2]), int(date[0]), int(date[1]))
            row[2] = x[b.timetuple().tm_wday]
            writer.writerow(row)

    
    



        