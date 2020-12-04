$array = @() 
$go = @(3,1) 

foreach($line in Get-Content .\input3.txt) { 
    $array.Add($line.toCharArry()) 
}

$mod = $array[0].Count() 
$depth = $array.Count() 
$sum = 0 

for ($i=0; $i -lt $depth; $i++){ 
    $array[$i-1] 
} 

Write-Host $sum 