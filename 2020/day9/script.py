preamble = 25

with open("input") as inputfile:
    inputarray = list(map(lambda x: int(x[:-1]), inputfile.readlines()))

    for cip in range(preamble, len(inputarray)):

        check = (inputarray[:cip])[-preamble:]

        print(str(cip) + ": " + str(inputarray[cip]) + " ----------------------------------------------- ")
        found = False
        for x in range(0,preamble - 1):
            for y in range(x + 1,preamble):#
                sum = check[x] + check[y]

                print("clac " + str(check[x]) + " + " + str(check[y]) + " = " + str(check[x] + check[y]))

                if sum == inputarray[cip]:
                    print(sum)
                    found = True
        
        if found == False:
            print("FIN: " + str(inputarray[cip]))
            break

        #print(check[0])