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
    def set_children(self,children):
        self.children = children
    def set_parents(self,parents):
        self.parents = parents

def traverse_and_count_parents(parents,visited,count):
    if node not in visited:
        return count
    else:
        amount = 0
        for parent in node.get_parents:
            
        return count + count_parents()


with open("test", "r") as input:

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
    
    amount = 0
    visited = {}
    for parent in baglist.get("shiny gold").parents:
        amount += count_parents(parent,amount,visited)