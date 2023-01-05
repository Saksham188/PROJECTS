<?php 
    session_start();
?>
<?php

 $did=$_SESSION['driverid'];
 $BookingNo=$_SESSION['$BookNo'];
     
     $con=mysqli_connect("localhost","root","","dswproject");
     
     if (mysqli_connect_errno($con))
     {
          echo"Failed connect".mysqli_connect_error();
     }
 
      $sql="Update drivers SET AVAILABILITY=1 where D_ID='$did'";           

      if(mysqli_query($con,$sql))
      {
          echo "<br>Driver Availability Updated successfully";

      }
      else

          echo "<br>Failed to update Driver as".mysqli_error($con);
     
     $sql="Update booking SET END_RIDE=1 where D_ID='$did' and BOOKING_NO='$BookingNo' and END_RIDE=0";           

     if(mysqli_query($con,$sql))
     {
         echo "<br>Booking Availability Updated successfully";
         header('location: \PHP\project\final\6. driverinterface\driverinterface.php');
    }
          else
              echo "<br>Failed to update Booking as".mysqli_error($con);     
          
     

?>