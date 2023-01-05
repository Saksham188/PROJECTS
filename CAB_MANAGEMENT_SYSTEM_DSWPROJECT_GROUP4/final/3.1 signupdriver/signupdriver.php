
<?php

if(isset($_POST['Sign-up2']))
{  
    echo "Welcome to SignUp2 completion page.<br>";
    $did=$_POST['driverid'];
    $fname=$_POST['name'];
    $pass=$_POST['password'];
    $address=$_POST['address'];
    $license=$_POST['license'];
    $phone=$_POST['phone'];

    echo"<br> ".$fname." ".$address."  ".$phone."  ".$license;

    $con= mysqli_connect("localhost","root","","dswproject");
   if(mysqli_connect_errno($con))
   {
       echo "<br>Failed to connect to server as".mysqli_error($con);
   }
   else
   {
    //    $ans;
       $sql="Insert into Drivers Values('$did','$fname','$address','$phone','$license','$pass',0)";
    
       if(mysqli_query($con,$sql))
       {
           echo "<br>Values inserted successfully";

       }
       
          $count=0;
       
           $sql="Select Car_No from car where AVAILABILITY=1  Order by RAND() LIMIT 1";
           $row=mysqli_query($con,$sql);
           $ans;
           if(mysqli_num_rows($row)>0)
           {          
               while($a =mysqli_fetch_array($row))
               {
                   $ans=$a['Car_No'];
                   echo "<br>".$a['Car_No'];
                   $count=1;
               }
           }
      
        
               if($count==1)
               {
                $sql="Update car SET AVAILABILITY=0 where Car_No='$ans'";           
        
                if(mysqli_query($con,$sql))
                {
                    echo "<br>car Updated successfully";
         
                }
                   
          
                    $sql="Insert into assign VALUES('$did','$ans')";           
        
                if(mysqli_query($con,$sql))
                {
                    echo "<br>car Assigned successfully";
                    header('location: \PHP\project\final\2. login\login.html');

                    
                }
                 
         

               }

    }

    
 
mysqli_close($con);

}

?>
