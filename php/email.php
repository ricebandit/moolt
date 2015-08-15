<?PHP
//Parse the external variables
$from = $_POST['email_address'];
$theMessage = $_POST['email_message'];
$firstName = $_POST['first_name'];
$lastName = $_POST['last_name'];
$name = $firstName . " " . $lastName;



//Build the email
$to = "mooltfilms@gmail.com"; 

$subject = stripslashes("MooltFilms.com: A Message from ".$name);
$message = stripslashes($theMessage);
$headers = "From: $from";

$check = check_email_address($from);

if($check != "true"){echo $check; return;};

$check = checkName($firstName, "first");

if($check != "true"){echo $check; return;};

$check = checkName($lastName, "last");

if($check != "true"){echo $check; return;};

$check = checkMessage($message);

if($check != "true"){echo $check; return;};


//Send the email and echo results
if($check == "true"){
	$sentOk = mail($to,$subject,$message,$headers);
	echo $check;
}else{
	echo $check;
}

function checkMessage($str)
{
	if(strlen($str) == 0)
	{
		return "Please enter your message.";
	}
	
	return "true";
}

function checkName($str, $type)
{
	if(strlen($str) == 0)
	{
		return "Please enter your " . $type . " name.";
	}
	
	return "true";
}

function check_email_address($email) {
  // First, we check that there's one @ symbol, 
  // and that the lengths are right.
  if (!ereg("^[^@]{1,64}@[^@]{1,255}$", $email)) {
    // Email invalid because wrong number of characters 
    // in one section or wrong number of @ symbols.
    return "Invalid Email Address";
  }
  
  // Split it into sections to make life easier
  $email_array = explode("@", $email);
  $local_array = explode(".", $email_array[0]);
  for ($i = 0; $i < sizeof($local_array); $i++) {
    if
(!ereg("^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&
↪'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$",
$local_array[$i])) {
      return "Invalid Email Address";
    }
  }
  
  // Check if domain is IP. If not, 
  // it should be valid domain name
  if (!ereg("^\[?[0-9\.]+\]?$", $email_array[1])) {
    $domain_array = explode(".", $email_array[1]);
    if (sizeof($domain_array) < 2) {
        return "Invalid Email Address"; // Not enough parts to domain
    }
    for ($i = 0; $i < sizeof($domain_array); $i++) {
      if
(!ereg("^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|
↪([A-Za-z0-9]+))$",
$domain_array[$i])) {
        return "Invalid Email Address";
      }
    }
  }
  
  return "true";
}

?> 