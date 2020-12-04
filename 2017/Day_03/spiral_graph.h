#ifndef ADVENTOFCODE_SPIRAL_GRAPH_H
#define ADVENTOFCODE_SPIRAL_GRAPH_H

#include <iostream>

using namespace std;

class spiral_graph {


public:
    enum direction {
        dir_none = 0, dir_top = 1, dir_right = 2, dir_bottom = 3, dir_left = 4
    };

private:
    class node {
    private:
        node *node_top = nullptr;

        node *node_bottom = nullptr;

        node *node_left = nullptr;

        node *node_right = nullptr;

        direction _butt_dir = dir_none;

        direction _head_dir = dir_none;

        int _value;

    public:
        node(int value, direction but_dir, node *in_node);

        void add_head(direction head_dir, node *head);

        void add_butt(direction head_dir, node *head);

        void add_side(direction head_dir, node *head);

        int get_value();

        node *getHead();

        node *getButt();

        node *getNode(direction dir);

        void set_value(int value);

        void sum_nbs(direction dir);
    };

    node *front = nullptr;
    node *back = nullptr;

    direction current_dir = dir_top;

public:

    void add_node(int value);

    static direction get_leftrotated_dir(direction dir);

    static direction get_rightrotated_dir(direction dir);

    static direction get_opposite_dir(direction dir);

    void rotate_current_dir_left();

    node *get_front();
    node *get_back();

    void print();

    string print_node(node* node);
};

#endif //ADVENTOFCODE_SPIRAL_GRAPH_H