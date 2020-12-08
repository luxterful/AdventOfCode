import re

class Node:
    def __init__(self, name):
        self.parents = []
        self.children = []
        self.name = name
    def __repr__(self):
        return "<"+self.name+" [chrildren]:"+str(len(self.children))+" [parents]:"+str(len(self.parents))+">"
    def __str__(self):
        return self.__repr__()
    def add_child(self,child):
        self.children.append(child)
    def add_parent(self,parent):
        self.parents.append(parent)

def traverse_and_count_children(node, count):
    if node.children:
        sum = 0
        for child in node.children:
            print(str(child.get("amount")) + " " + str(child.get("node")))
            sum += traverse_and_count_children(child.get("node"), count * child.get("amount"))
        return sum + count
    else:
        return count
                
with open("input", "r") as input:

    baglist = dict()

    for line in input:
        bagname, tail = re.match(r"(.*) bags contain (.*).", line).groups()

        if bagname in baglist:
            bagnode = baglist.get(bagname)
        else:
            bagnode = Node(bagname)
            baglist[bagname] = bagnode

        if tail != "no other bags":
            for subbag in tail.split(", "):
                subbagcount, subbagname = re.match(r"(\d) (.*) bag(?:s)?", subbag).groups()
                
                if subbagname in baglist:
                    subbagnode = baglist.get(subbagname)
                else:
                    subbagnode = Node(subbagname)
                    baglist[subbagname] = subbagnode
                
                bagnode.add_child({"node":subbagnode, "amount":int(subbagcount)})
                subbagnode.add_parent(bagnode)
    
    
    print(traverse_and_count_children(baglist.get("shiny gold"),1)-1)
    