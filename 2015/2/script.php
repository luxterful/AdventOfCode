<?php

$input = getenv("AOC_INPUT");
$input_array = preg_split("/\r?\n/", $input);
array_pop($input_array);

$total_surface = 0;
$total_ribbon = 0;
foreach ($input_array as $value) {
   
    $sides = explode("x", $value);
    [$l, $w, $h] = explode("x", $value);

    $surfaces = [2*$l*$w, 2*$w*$h, 2*$h*$l];

    $box_surface = array_sum($surfaces);
    $min_surface = min($surfaces);

    $total_surface += $box_surface + $min_surface / 2;

    $ribbon_bow = $l * $w * $h;

    sort($sides);
    [$side1, $side2] = $sides;

    $ribbon = 2*$side1 + 2*$side2;

    $total_ribbon += $ribbon_bow + $ribbon;
}
echo "Part 1: ".$total_surface."\n\r";
echo "Part 2: ".$total_ribbon."\n\r";
