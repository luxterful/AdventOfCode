import re
import string

with open("input", "r") as myfile:
    sum = 0
    for match in re.findall(r"(?:[a-z]+\n)+", myfile.read()):
        lines = list(map(lambda x: set(x), match.split("\n")[:-1]))

        s = set(string.ascii_lowercase)

        for line in lines:
            s = s.intersection(line)

        sum += len(s)

    print(sum)