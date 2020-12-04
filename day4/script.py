import re


def check_height(i):
    m = re.match(r"(\d+)(cm|in)", i)
    if m:
        if m.group(2) == "cm":
            return int(m.group(1)) >= 150 and int(m.group(1)) <= 193
        elif m.group(2) == "in":
            return int(m.group(1)) >= 59 and int(m.group(1)) <= 76
    return False


required = {
    "byr": (lambda i: len(i) == 4 and int(i) >= 1920 and int(i) <= 2002),
    "iyr": (lambda i: len(i) == 4 and int(i) >= 2010 and int(i) <= 2020),
    "eyr": (lambda i: len(i) == 4 and int(i) >= 2020 and int(i) <= 2030),
    "hgt": (lambda i: check_height(i)),
    "hcl": (lambda i: re.match(r"#[0-9a-f]{6}", i)),
    "ecl": (lambda i: i in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]),
    "pid": (lambda i: len(i) == 9 and re.match(r"\d+", i)),
}

rx = r"((byr|iyr|eyr|hgt|hcl|ecl|pid|cid):([^\s \n]*)[\s\n]?)"
rx_full = r"(?:(?:byr|iyr|eyr|hgt|hcl|ecl|pid|cid):(?:[^\s \n]*)[\s\n]?)+\n?"

with open("input", "r") as myfile:
    valid_count = 0
    for match in re.findall(rx_full, myfile.read()):
        m = re.findall(rx, match)
        requ_count = 0
        for value in m:
            if value[1] in required.keys():
                if required.get(value[1])(value[2]):
                    requ_count += 1
        if requ_count == len(required.keys()):
            valid_count += 1
    print("valid: " + str(valid_count))
