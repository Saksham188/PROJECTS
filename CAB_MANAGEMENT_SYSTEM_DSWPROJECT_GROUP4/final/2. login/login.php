  <!-- add time interval for header. -->
<?php session_start();
 $_SESSION['username']='';
?>
<?php

if(isset($_POST['Login']))
{
    $type=$_POST['User_type'];

    if($type=='User')
    {
        $_SESSION['username']=$_POST['username']; ///user id 

    }
    if($type=='Driver')
    {
        $_SESSION['driverid']=$_POST['username'];
    }
    $nam=$_POST['username'];
    $pass=$_POST['password'];

    echo "<br>".$nam." ".$pass." ".$type."<br>";

    if($type=='User')
    {
        $con=mysqli_connect("localhost","root","","dswproject");
        if (mysqli_connect_errno($con))
        {
             echo"Failed".mysqli_connect_error();
        }
     
     
         $sql="Select P_Fname,password from passengers where P_Id='$nam' and Password='$pass'";
         $row=mysqli_fetch_array(mysqli_query($con,$sql));
         if( mysqli_num_rows(mysqli_query($con,$sql)) > 0){
            //  echo "Login Successful";
             echo $row["P_Fname"];
             header('location: \PHP\project\final\4. booknow\booknow.php');

        
         }
         else
         echo "User Login failed";
         

     
         
     mysqli_close($con);

    }
    else if($type=='Driver')
    {
        $con=mysqli_connect("localhost","root","","dswproject");
        if (mysqli_connect_errno($con))
        {
             echo"Failed".mysqli_connect_error();
         }
         else

     
         $sql2="Select D_Name,pass from drivers where D_Id='$nam' and Pass='$pass'";
         $row=mysqli_fetch_array(mysqli_query($con,$sql2));
         if( mysqli_num_rows(mysqli_query($con,$sql2)) > 0){
             echo "<br>DriverLogin Successful<br>";
             echo $row["D_Name"];
         
         $sql3="Update drivers SET availability=1 where D_Id='$nam'"; 
         if(mysqli_query($con,$sql3))
         {
             echo "<br>Query Successful.";
             header('location: \PHP\project\final\6. driverinterface\driverinterface.php');
         }   
            
        }
         else
         echo "Driver Login failed";
     
     
         
     mysqli_close($con);

    }
    
  
}

?>