foreach($line in Get-Content .\input2.txt) { 
    $r = $line -match "(\d+)-(\d+) ([a-z]): ([a-z]+)" 

    if(($Matches[4].ToCharArray()[[int]$Matches[1]-1] -eq $Matches[3]) -XOR ($Matches[4].ToCharArray()[[int]$Matches[2]-1] -eq $Matches[3])){$sum++} 
} 

Write-Host $sum 