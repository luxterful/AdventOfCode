import re

with open("input") as inputfile:
    inputarray = list(
        map(
            lambda x: re.match(r"(acc|jmp|nop) ([+-]\d+)\n", x).groups(),
            inputfile.readlines(),
        )
    )

    print(inputarray)
    inputarray.append(("fin", "0"))

    acc = 0
    cip = 0
    visited = []
    changed = []
    currentchange = -1

    while True:

        if cip in visited:
            print("visited -> reset -> acc was: " + str(acc))
            print()
            acc = 0
            cip = 0
            visited = []
            currentchange = -1

        visited.append(cip)

        print(
            "cip:"
            + str(cip)
            + " visited:"
            + str(len(visited))
            + " changed:"
            + str(len(changed))
            + " acc: "
            + str(acc)
        )

        opp, val = inputarray[cip]

        if opp == "acc":
            acc += int(val)
            cip += 1
        elif opp == "jmp":
            if cip not in changed and currentchange == -1 or currentchange == cip:
                print("changed jmp -> nop " + str(val) + ": " + str(cip))
                currentchange = cip
                changed.append(cip)
                cip += 1
            else:
                cip += int(val)

        elif opp == "nop":
            if cip not in changed and currentchange == -1 or currentchange == cip:
                print("changed nop -> jmp " + str(val) + ": " + str(cip))
                currentchange = cip
                changed.append(cip)
                cip += int(val)
            else:
                cip += 1
        elif opp == "fin":
            print("fin" + str(acc))
            break
