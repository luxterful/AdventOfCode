#include <iostream>
#include "spiral_graph.h"

using namespace std;

int find_next_smlr_qrt(int z) {
    int exp = 1;
    while (exp * exp < z) {
        exp++;
    }
    return exp - 1;
}

int main() {

    int input = 277678; //-> 475
    /*
    int next_smlr_qrt = find_next_smlr_qrt(input);
    int next_smlr_exp = next_smlr_qrt * next_smlr_qrt;

    int x_moves = 0;
    int y_moves = 0;

    if (next_smlr_qrt % 2 == 0) {
        x_moves = next_smlr_qrt / 2;

        int dist_from_prev_border = (input - next_smlr_exp) % next_smlr_qrt;

        if (dist_from_prev_border < (next_smlr_qrt / 2)) {
            y_moves = (next_smlr_qrt / 2) - dist_from_prev_border - 1;
        } else {
            y_moves = dist_from_prev_border - (next_smlr_qrt / 2) - 1;
        }

    } else {
        x_moves = next_smlr_qrt / 2 + 1;

        // TODO!
        // NOT IMPLEMENTED YET!
    }

    cout << "Naechstkleinere Kante: " << next_smlr_exp << endl;
    cout << "Wurzel der naechstkleineren Kante: " << next_smlr_qrt << endl;
    cout << "Bewegung um X " << x_moves << endl;
    cout << "Bewegung um Y " << y_moves << endl;

    cout << "Result: " << x_moves + y_moves << endl << endl;

     */

    spiral_graph *graph = new spiral_graph;
    for(int i = 1; i < 1000; i++){
        graph->add_node(i);
    }
/*
    graph->add_node(i);
    if(graph->get_front()->get_value() > input){
        cout << graph->get_front()->get_value() << endl;
        break;
    }
*/
    graph->print();

    cout << "#1#: " << graph->get_back()->getHead()->get_value() << endl;
    cout << "#2#: " << graph->get_front()->getButt()->getButt()->getButt()->getButt()->getButt()->getHead()->getHead()->get_value() << endl;
    //cout << "Node2: " << graph->get_back()->getHead()->getHead()->get_value() << endl;

    return 0;
}

/*
enum direction {
    dir_top, dir_bottom, dir_left, dir_right, dir_none
};

class node {
private:
    node *node_up = nullptr;
    node *node_down = nullptr;
    node *node_left = nullptr;
    node *node_right = nullptr;

    direction _in;
    string _value;

public:
    void node(string value, direction in, node *in_node) {
        _value = value;
        _in = in;
        switch (_in) {
            case dir_bottom:
                node_down = in_node;
            case dir_top:
                node_up = in_node;
            case dir_left:
                node_left = in_node;
            case dir_right:
                node_right = in_node;
        }
    }

    string get_value() { return _value; }
};

class spiral_graph {
    node *front = nullptr;
    node *back = nullptr;

    int walkback = 0;
    direction current_dir = dir_top;

    void add_node(string value) {
        if (front == nullptr) {
            front = new node("1", dir_none, nullptr);
            back = front;
        }
    }

    direction get_rotated_dir() {
        switch (current_dir) {
            case dir_bottom:
                return dir_right;
            case dir_top:
                return dir_left;
            case dir_left:
                return dir_bottom;
            case dir_right:
                return dir_top;
        }
    }

    void rotate_current_dir() {
        current_dir = get_rotated_dir();
    }
};
 */