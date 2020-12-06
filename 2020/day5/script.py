import re
import math

with open("input", "r") as input:
    highest = 0
    seatlist = []
    for line in input:
        rowcode, seatcode = re.match(r"([FB]{7})([LR]{3})", line).groups()
        row = [0, 127]
        for char in rowcode:
            newnum = sum(row) / 2
            if char == "F":
                row[1] = math.floor(newnum)
            if char == "B":
                row[0] = math.ceil(newnum)

        seat = [0, 7]
        for char in seatcode:
            newnum = sum(seat) / 2
            if char == "L":
                seat[1] = math.floor(newnum)
            if char == "R":
                seat[0] = math.ceil(newnum)

        checksum = row[0] * 8 + seat[0]

        seatlist.append(checksum)

        if checksum > highest:
            highest = checksum

        seatlist.sort()

    current = seatlist[0]
    for val in seatlist[1:]:
        if val != current + 1:
            print(current + 1)
            break
        current = val
