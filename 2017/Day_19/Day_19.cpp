#include <iostream>
#include <sstream>
#include <fstream>
#include <string>

using namespace std;

enum dir{minusX, plusX, minusY, plusY};

bool add_letter_if_letter(char c, string *add_to){
    if((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') or true){
        *add_to += c;
        return true;
    }
    return false;
}

void do_turn(int *grid[], int X, int Y, dir *current_dir){
    if(*current_dir == plusY or *current_dir == minusY){
        if(grid[X+1][Y] == '-') *current_dir = plusX;
        else if(grid[X-1][Y] == '-') *current_dir = minusX;
    }else if(*current_dir == plusX or *current_dir == minusX){
        if(grid[X][Y+1] == '|') *current_dir = plusX;
        else if(grid[X][Y-1] == '|') *current_dir = minusX;
    }

}

int main() {
    std::ifstream ifs("Day_19/input.txt");

    int max_linelength = 0;
    int linecount = 0;
    for(std::string line; getline(ifs, line); ){
        if(line.length() > max_linelength){
            max_linelength = line.length();
        }
        linecount++;
    }

    ifs = std::ifstream("Day_19/input.txt");
    char grid[max_linelength][linecount];
    std::string line;
    for(int y = 0; getline(ifs, line); y++ ){
        for(int x = 0; x < line.length(); x++){
            grid[x][y] = line.at(x);
        }
    }

    int X = 0;
    int Y = 0;

    // find start point in first line
    for(; grid[X][Y] != '|'; X++);

    //first direction is downward. in this case upward because input is mirrored on x-axis
    dir current_dir = plusY;

    string way = "";

    bool finish = false;

    while (!finish){
        switch(current_dir){
            case plusY:
                for(; grid[X][Y] != '+'; Y++){
                    if(add_letter_if_letter(grid[X][Y], &way)){
                        if(grid[X][Y+1] == ' ') {
                            finish = true;
                            break;
                        }
                    }
                }
                way+="+";

                if(grid[X+1][Y] == '-') {
                    current_dir = plusX;
                    X++;
                }
                else if(grid[X-1][Y] == '-') {
                    current_dir = minusX;
                    X--;
                }
                //cout << "Y++" << endl;
                break;
            case plusX:
                for(; grid[X][Y] != '+'; X++){
                    if(add_letter_if_letter(grid[X][Y], &way)){
                        if(grid[X+1][Y] == ' '){
                            finish = true;
                            break;
                        }
                    }
                }
                way+="+";

                if(grid[X][Y+1] == '|') {
                    current_dir = plusY;
                    Y++;
                }
                else if(grid[X][Y-1] == '|') {
                    current_dir = minusY;
                    Y--;
                }
                //cout << "Y++" << endl;
                break;
            case minusY:
                for(; grid[X][Y] != '+'; Y--){
                    if(add_letter_if_letter(grid[X][Y], &way)){
                        if(grid[X][Y-1] == ' '){
                            finish = true;
                            break;
                        }
                    }
                }
                way+="+";

                if(grid[X+1][Y] == '-') {
                    current_dir = plusX;
                    X++;
                }
                else if(grid[X-1][Y] == '-') {
                    current_dir = minusX;
                    X--;
                }
                //cout << "Y--" << endl;
                break;
            case minusX:
                for(; grid[X][Y] != '+'; X--){
                    if(add_letter_if_letter(grid[X][Y], &way)){
                        if(grid[X-1][Y] == ' '){
                            finish = true;
                            break;
                        }
                    }
                }
                way+="+";

                if(grid[X][Y+1] == '|') {
                    current_dir = plusY;
                    Y++;
                }
                else if(grid[X][Y-1] == '|') {
                    current_dir = minusY;
                    Y--;
                }
                //cout << "X--" << endl;
                break;
        }
    }
    cout << way << endl;
    cout << " X: " << X << " Y: " << Y << endl;
    //cout << steps << endl;
    cout << way.length() << endl;
}