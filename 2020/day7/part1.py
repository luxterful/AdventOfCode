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

def traverse_and_store_parents(node,visited):
    if node.parents:
        for parent in node.parents:
            visited.append(parent)
            traverse_and_store_parents(parent,visited)
                
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
                
                bagnode.add_child(subbagnode)
                subbagnode.add_parent(bagnode)
    
    visited = []
    traverse_and_store_parents(baglist.get("shiny gold"),visited)
    print(len(list(set(visited))))