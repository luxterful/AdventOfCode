#include <iostream>
#include <fstream>
#include <regex>
#include <list>

using namespace std;

class node;

int part_I(int input){
    return 0;
}

int part_II(int input){
    return 0;
}

int main() {
    std::ifstream ifs("input.txt");

    regex expr_node_with_child("([a-z]*)\\s\\(\\d*\\)\\s->\\s([a-z]+(?:\\,\\s[a-z]+)*)");
    regex expr_get_all_childs("[a-z]+");

    node* root;
    list<node*> nirvana;

    //root = new node("");

    for(std::string line; getline( ifs, line ); )
    {
        smatch all_matches;
        if (regex_search(line, all_matches, expr_node_with_child)){
            //cout << all_matches[1] << " >> " << all_matches[2] << endl;

            smatch child_matches;
            if (regex_search(all_matches[2].str(), child_matches, expr_get_all_childs)) {
                for(int idx = 0; idx < child_matches.size(); idx++){
                    cout << child_matches[0] << endl;
                }

            }




        }else{ //node without child

        }
    }

    ifs.close();
    return 0;
}

class node
{
    private:
        list<node*> m_childs;
        node* m_father;
        string m_val;

    public:
        node(string val){
            m_val = val;
        }

        void add_child(node* child){
            m_childs.push_back(child);
        }

        void set_father(node* father){
            m_father = father;
        }

        string getVal(){
            return m_val;
        }

};
