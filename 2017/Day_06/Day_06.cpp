#include <iostream>
#include <sstream>
#include <fstream>
#include <regex>

using namespace std;

int main() {
    ifstream ifs("Day_05/input.txt");

    regex reg{"(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)\\t(\\d+)"};

    int mem_banks[16];

    for(std::string line; getline(ifs, line); ){

        smatch all_matches;
        regex_search(line, all_matches, reg);

        for(int i = 0; i < 16 ; i++){
            mem_banks[i] = stoi(all_matches[i+1]);
        }


    }


}