cmake_minimum_required(VERSION 3.9)
project(AdventOfCode)

set(CMAKE_CXX_STANDARD 11)

#Day 1
add_executable(AdventOfCode_Day_01 Day_01/Day_01.cpp)

#Day 2
add_executable(AdventOfCode_Day_02 Day_02/Day_02.cpp)

# DAY 3
add_executable(AdventOfCode_Day_03 Day_03/Day_03.cpp Day_03/spiral_graph.cpp Day_03/spiral_graph.h)

#Day 4
add_executable(AdventOfCode_Day_04 Day_04/Day_04.cpp)

#Day 5
configure_file(Day_05/input.txt Day_05/input.txt COPYONLY)
add_executable(AdventOfCode_Day_05 Day_05/Day_05.cpp)

#Day 5
configure_file(Day_06/input.txt Day_06/input.txt COPYONLY)
add_executable(AdventOfCode_Day_06 Day_06/Day_06.cpp)

#Day 7
configure_file(Day_07/input.txt Day_07/input.txt COPYONLY)
add_executable(AdventOfCode_Day_07 Day_07/Day_07.cpp)

#Day 19
configure_file(Day_19/input.txt Day_19/input.txt COPYONLY)
add_executable(AdventOfCode_Day_19 Day_19/Day_19.cpp)