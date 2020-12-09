inv = 18272118

with open("input") as inputfile:
    inputarray = list(map(lambda x: int(x[:-1]), inputfile.readlines()))

    start = 0

    while True:

        start +=1
        sum_arr = []
        x = start
        while True:
            x += 1
            sum_arr.append(inputarray[x])
            summe = sum(sum_arr)
            if summe == inv:
                print("max " + str(max(sum_arr)) + " min " + str(min(sum_arr)) + " = " + str(max(sum_arr) + min(sum_arr)))
                break
            if summe > inv:
                break