#include <iostream>
#include <sstream>
#include <fstream>

using namespace std;

int main() {
    ifstream ifs("Day_05/input.txt");

    int linecount = 0;
    for(std::string line; getline(ifs, line); ){
        linecount++;
    }

    int lines[linecount];
    ifs = ifstream("Day_05/input.txt");

    string line;
    for(int i = 0; getline(ifs, line); i++ ){
        lines[i] = stoi(line);
    }

    int idx = 0;
    int count = 0;
    while(idx >= 0 && idx <= linecount){
        int jump = lines[idx];

        if(jump>=3)lines[idx]--;
        else lines[idx]++;

        idx += jump;
        count ++;
    }
    count--;

    cout << count;

}