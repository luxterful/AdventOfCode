import re

regx = r"(?:[a-z]+\n)+"

with open("input", "r") as myfile:
    sum = 0
    for match in re.findall(regx, myfile.read()):

        sum += len(set(list(match.replace("\n", ""))))

    print(sum)