import re

with open("test1") as inputfile:
    print(inputfile)
    inputarray = list(
        map(
            lambda x: re.match(r"(acc|jmp|nop) ([+-]\d+)\n", x).groups(),
            inputfile.readlines(),
        )
    )

    acc = 0
    iop = 0
    visited = []
    while True:
        print(iop)
        if iop in visited:
            print(acc)
            break
        else:
            visited.append(iop)

        opp, val = inputarray[iop]

        if opp == "acc":
            acc += int(val)
            iop += 1
        elif opp == "jmp":
            iop += int(val)
        elif opp == "nop":
            iop += 1
