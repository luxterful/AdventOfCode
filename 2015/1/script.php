<?php

$input = getenv("AOC_INPUT");
$input_array = str_split($input);

$floor = 0;
$first_entered_basemend = 0;

foreach ($input_array as $key=>$value) {
    if($value == "(") {
        $floor += 1;
        continue;
    }
    $floor -= 1;
    if($first_entered_basemend == 0 && $floor == -1) {
        $first_entered_basemend = $key + 1;
    }
}
echo $first_entered_basemend;
echo "\n\r";
print_r($floor);