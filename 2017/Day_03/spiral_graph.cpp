#include "spiral_graph.h"

void spiral_graph::add_node(int value) {
    if (front == nullptr) {
        front = new node(value, dir_none, nullptr);
        back = front;
    } else {
        //look for the NW-Node seen from current directory
        if (front->getNode(get_leftrotated_dir(current_dir)) != nullptr &&
            front->getNode(get_leftrotated_dir(current_dir))->getNode(current_dir) != nullptr) {
            // go straight

            node *to_connect = front->getNode(get_leftrotated_dir(current_dir))->getNode(current_dir);

            node *new_node = new node(value, get_opposite_dir(current_dir), front);
            front->add_head(current_dir, new_node);
            front = new_node;

            front->add_side(get_leftrotated_dir(current_dir), to_connect);
            to_connect->add_side(get_rightrotated_dir(current_dir), front);

            front->sum_nbs(current_dir);

            cout << current_dir << " -> " << current_dir << " o " << endl;
        } else {
            // go straight and turn left
            node *new_node = new node(value, get_opposite_dir(current_dir), front);
            front->add_head(current_dir, new_node);
            front = new_node;

            direction olddir = current_dir;
            current_dir = get_leftrotated_dir(current_dir);
            cout << olddir << " -> " << current_dir << endl;

            front->sum_nbs(current_dir);
        }
    }
}

spiral_graph::direction spiral_graph::get_leftrotated_dir(direction dir) {
    return static_cast<direction>(((dir + 3) % 4 == 0) ? (dir + 3) : ((dir + 3) % 4));
}

spiral_graph::direction spiral_graph::get_rightrotated_dir(direction dir) {
    return static_cast<direction>(((dir + 1) % 4 == 0) ? (dir + 1) : ((dir + 1) % 4));
}

spiral_graph::direction spiral_graph::get_opposite_dir(direction dir) {
    return static_cast<direction>(((dir + 2) % 4 == 0) ? (dir + 2) : ((dir + 2) % 4));
}

spiral_graph::node *spiral_graph::get_front() {
    return front;
}

spiral_graph::node *spiral_graph::get_back() {
    return back;
}

void spiral_graph::print() {
    node *c = back;
    cout << print_node(c);
    while ((c = c->getHead()) != nullptr) {
        cout << " --> " << print_node(c);
    }
    cout << endl;
}

string spiral_graph::print_node(node *c) {
    return to_string(c->get_value())
           + "(" +
           ((c->getNode(dir_top) != nullptr) ? to_string(c->getNode(dir_top)->get_value()) : "0")
           + "," +
           ((c->getNode(dir_right) != nullptr) ? to_string(c->getNode(dir_right)->get_value()) : "0")
           + "," +
           ((c->getNode(dir_bottom) != nullptr) ? to_string(c->getNode(dir_bottom)->get_value()) : "0")
           + "," +
           ((c->getNode(dir_left) != nullptr) ? to_string(c->getNode(dir_left)->get_value()) : "0")
           + ")";
}

// --------------------------------------------------------------------- //
// ------------------ NODE DEFINITION BEGINS HERE ---------------------- //
// --------------------------------------------------------------------- //

void spiral_graph::node::sum_nbs(direction dir){
    int sum = 0;
    // NORTH
    if(getNode(get_leftrotated_dir(dir)) != nullptr){
        sum += getNode(get_leftrotated_dir(dir))->get_value();

        //NORT-WEST
        if(getNode(get_leftrotated_dir(dir))->getNode(dir) != nullptr){
            sum += getNode(get_leftrotated_dir(dir))->getNode(dir)->get_value();
        }

        //SOUTH-WEST
        if(getNode(get_leftrotated_dir(dir))->getNode(get_opposite_dir(dir)) != nullptr){
            sum += getNode(get_leftrotated_dir(dir))->getNode(get_opposite_dir(dir))->get_value();
        }
    }
    // WEST
    if(getNode(dir) != nullptr){
        sum += getNode(dir)->get_value();
    }
    // SOUTH
    if(getNode(get_opposite_dir(dir)) != nullptr){
        sum += getNode(get_opposite_dir(dir))->get_value();
    }

    _value = sum;
}

spiral_graph::node::node(int value, direction butt_dir, node *in_node) {
    _value = value;
    _butt_dir = butt_dir;
    switch (butt_dir) {
        case dir_bottom:
            node_bottom = in_node;
            break;
        case dir_top:
            node_top = in_node;
            break;
        case dir_left:
            node_left = in_node;
            break;
        case dir_right:
            node_right = in_node;
            break;
        default:
            break;
    }
}

void spiral_graph::node::add_head(direction head_dir, node *head) {
    if (head_dir != dir_none && _head_dir == dir_none) {
        _head_dir = head_dir;
        add_side(head_dir, head);
    }
}

void spiral_graph::node::add_butt(direction butt_dir, node *butt) {
    if (butt_dir != dir_none && _head_dir == dir_none) {
        _butt_dir = butt_dir;
        add_side(butt_dir, butt);
    }
}

void spiral_graph::node::add_side(direction dir, node *node) {
    if (dir != dir_none) {
        switch (dir) {
            case dir_bottom:
                if (node_bottom == nullptr)
                    node_bottom = node;
                break;
            case dir_top:
                if (node_top == nullptr)
                    node_top = node;
                break;
            case dir_left:
                if (node_left == nullptr)
                    node_left = node;
                break;
            case dir_right:
                if (node_right == nullptr)
                    node_right = node;
                break;
            default:
                break;
        }
    }
}

int spiral_graph::node::get_value() { return _value; }

spiral_graph::node *spiral_graph::node::getHead() {
    return getNode(_head_dir);
}

spiral_graph::node *spiral_graph::node::getButt() {
    return getNode(_butt_dir);
}

spiral_graph::node *spiral_graph::node::getNode(direction dir) {
    switch (dir) {
        case dir_bottom:
            return node_bottom;

        case dir_top:
            return node_top;

        case dir_left:
            return node_left;

        case dir_right:
            return node_right;

        default:
            return nullptr;
    }
}

void spiral_graph::node::set_value(int value){
    _value = value;
}