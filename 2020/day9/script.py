with open("input") as inputfile:
    inputarray = list(map(lambda x: x[:-1], inputfile.readlines()))

    for cip in range(20, len(inputarray)):

        check = (inputarray[:cip])[-20:]

        print(check[0])