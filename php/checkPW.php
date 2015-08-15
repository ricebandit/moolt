<?php
$pwCheck = $_POST["data"];

$pw = "buzzword";

if($pw == $pwCheck)
{
	echo "true";
	return ;
}

echo "false";
?>