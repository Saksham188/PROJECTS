<?php

if(isset($_POST['Sign-up']))
{  
    echo "Welcome to SignUp completion page.";
    $pid=$_POST['userid'];
    $fname=$_POST['fname'];
    $lname=$_POST['lname'];
    $phone=$_POST['phone'];
    $pass=$_POST['password'];
    $Email=$_POST['email'];  

    echo"<br> ".$fname." ".$lname."  ".$phone."  ".$Email;

    $con= mysqli_connect("localhost","root","","dswproject");
   if(mysqli_connect_errno($con))
   {
       echo "Failed to connect to server as".mysqli_error($con);

   }
   else
   {
   
       
       $sql="Insert into Passengers Values('$pid','$fname','$lname','$Email','$phone','$pass')";
    
    if(mysqli_query($con,$sql))
       {
           echo "<br>Values inserted successfully";
           header('location: \PHP\project\final\2. login\login.html');


       }
       else
           echo "<br>Failed to insert values as".mysqli_error($con);
       
           
    }



}
else
echo "Fail";



?>

