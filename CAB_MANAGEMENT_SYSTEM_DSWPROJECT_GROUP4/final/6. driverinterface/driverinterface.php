<?php 
    session_start();
    $did=$_SESSION['driverid'];
    $PFname='';
    $PLname='';
    $PContact=''; 
    $BookingNo='';   
    $OTP='';
    $PickUp='';
    $DropLoc='';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driver Interface</title>
    <link rel="stylesheet" href="driverinterface.css">
    <script>
 window.setInterval(myfun(),3000);
 

 function myfun()
 {

<?php

        $flag=0;
        $did=$_SESSION['driverid'];
        $con=mysqli_connect("localhost","root","","dswproject");
        if (mysqli_connect_errno($con))
        {
            echo"Failed".mysqli_connect_error();
        }
    
        $sql="SELECT * FROM BOOKING WHERE D_ID='$did' and END_RIDE=0";

        $row=mysqli_query($con,$sql);

        if(mysqli_num_rows($row)>0)
        {          
           $flag=1;
           $sql2 = "SELECT p.P_Fname,p.P_Lname,p.P_phoneno,b.BOOKING_NO,b.BOARDING_OTP,b.BOARDING_POINT,b.DROPPING_POINT from passengers p , booking b WHERE b.D_ID='$did' and b.END_RIDE=0 and p.P_Id=b.P_ID;";
           $row2=mysqli_query($con,$sql2);
       
           if(mysqli_num_rows($row2)>0)
           {          
               while($p =mysqli_fetch_array($row2))
               {
                   $PFname=$p['P_Fname'];
                   $PLname=$p['P_Lname'];
                   $PContact=$p['P_phoneno']; 
                   $BookingNo=$p['BOOKING_NO']; 
                   $_SESSION['$BookNo']=$BookingNo;  
                   $OTP=$p['BOARDING_OTP'];
                   $PickUp=$p['BOARDING_POINT'];
                   $DropLoc=$p['DROPPING_POINT'];
                   
               }
               
            
           }

       
        }
        

?>

}

</script>

<?php

    $con=mysqli_connect("localhost","root","","dswproject");
    if (mysqli_connect_errno($con))
    {
        echo"Failed".mysqli_connect_error();
    }

    $sql = "SELECT d.D_Name,d.D_PHONENO,d.D_LICENSE,c.CAR_NO,c.MODEL from drivers d,car c,assign a WHERE d.D_ID='$did' and a.CAR_NO=c.CAR_NO and a.DRIVER_ID=d.D_ID;";

    $row=mysqli_query($con,$sql);

   if(mysqli_num_rows($row)>0)
   {          
       while($a =mysqli_fetch_array($row))
       {
           $DriverName=$a['D_Name'];
           $Contact=$a['D_PHONENO']; 
           $License=$a['D_LICENSE'];   
           $CarNum=$a['CAR_NO'];
           $CarModel=$a['MODEL'];
           
       }
   }
   else
       echo "<br>Failed to execute query as".mysqli_error($con);


    
    // $sql2 = "SELECT p.P_Fname,p.P_Lname,p.P_phoneno,b.BOOKING_NO,b.BOARDING_OTP,b.BOARDING_POINT,b.DROPPING_POINT from passengers p , booking b WHERE b.D_ID='$did' and b.END_TIME=0 and p.P_Id=b.P_ID;";
    // $row2=mysqli_query($con,$sql2);
       
    // if(mysqli_num_rows($row2)>0)
    // {          
    //     while($p =mysqli_fetch_array($row2))
    //     {
    //         $PFname=$p['P_Fname'];
    //         $PLname=$p['P_Lname'];
    //         $PContact=$p['P_phoneno']; 
    //         $BookingNo=$p['BOOKING_NO'];   
    //         $OTP=$p['BOARDING_OTP'];
    //         $PickUp=$p['BOARDING_POINT'];
    //        $DropLoc=$p['DROPPING_POINT'];
            
    //     }
    // }
    // else
    //     echo "<br>Failed to execute query as".mysqli_error($con);
 
 

?>


<?php
           {
               
                // header('location: \PHP\project\final\6. driverinterface\dire.php');
                if(isset($_POST['endbtn']))
                {
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
          
 

                }
           }

        ?>

    
</head>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');
*{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 62.5%;
    font-family: 'Poppins', sans-serif;
}

body{
    overflow: hidden;
}

.navbar{
    position: fixed;
    background-color:black;
    width: 100%;
    z-index: 999;
    overflow: hidden;
}

.navbar a {
    float: left;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
}
.navbar h4
{
    height: 100%;
    align-content: center;
    float: left;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
    margin-right: 20px;
    float: right;
    margin-top: 13px;
}
#logobtn{
   background-color:rgba(0, 0, 0, 0); 
   font-size: 20px; 
   height: 100%; 
   font-family: 'Orbitron', sans-serif; 
   color: white;
   margin-left: 20px;
}

.logo{
    height: 46px;
    /* margin-right: calc(100% - 470.82px - 144.81px); */
}
.content{
    height: 100vh;
    background: rgb(25,209,179);
background: linear-gradient(90deg, rgba(25,209,179,1) 0%, rgba(25,61,203,1) 57%, rgba(0,245,255,1) 100%);
}
.leftcon{
    float: left;
    height: 80vh;
    width: 44vw;
    margin-top: 15vh;
    margin-left: 3vw;
    margin-right: 3vw;
    background-color: rgb(174, 252, 245);
    box-shadow: 5px 0 20px 0 rgb(43, 42, 42);
    border-radius: 10px;
}
.rightcon{
    overflow: hidden;
    float: left;
    height: 80vh;
    width: 44vw;
    margin-top: 15vh;
    margin-left: 3vw;
    margin-right: 3vw;
    background-color: rgb(175, 255, 168);
    box-shadow: 5px 0 20px 0 rgb(31, 30, 30);
    border-radius: 10px;
}
#logoutdiv{
    position: fixed;
    right: 10px;
    top: 50px;
}
#logout{
    margin: 5px;
    padding: 5px 10px;
    font-size: 20px;
    border: 2px solid black;
    background-color: transparent;
    border-radius: 10pxs;
    font-family: 'Comic Neue', cursive;
    
}
#logout:hover{
    background-color: rgb(0, 0, 0);
    color: rgb(113, 210, 255);
    border: 2px solid black;
}

.lcdiv, .rcdiv{
    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
}
/* #dvinfo{
    background-color: rgba(128, 128, 128, 0.1);
} */
#dvinfo h1,#pvinfo h1, #no_customer h1, #ride_end h1{
    font-size: 20px;
    font-weight: 900;
}
#dvinfo span,#pvinfo span, #no_customer span, #ride_end span{
    font-size: 14px;
}
#ride_end span{
    font-size: 18px;
}
#no_customer{
    text-align: center;
    padding-top: 200px;
}
#ride_end{
    text-align: center;
    padding-top: 150px;
}
#ncspan{
    font-size: 30px;
    font-weight: 600;
}
#dvspan{
    font-weight: 600;
}
#driOTP, #otpbtn, #endbtn{
    height: auto;
    width: 70%;
    font-size: 20px;
    border: 1px solid black;
    border-radius: 10px;
    text-align: center;   
}
#otpdiv{
    width: 100%;
    text-align: center;
}
#otpbtn, #endbtn{
    /* float: right; */
    font-size: 16px;
    width: auto;
    border-radius: 0;
    background-color: rgb(0, 255, 76);
}
#otpbtn:hover, #endbtn:hover{
    background-color: yellow;
}
.lcdiv h1 
{
    font-family: 'Orbitron', sans-serif;
    font-size: 40px;
    text-align: center;
}
.lcdiv span 
{
    font-family: 'Comic Neue', cursive;
    font-size: 30px;
}
.rcdiv h1 
{
    font-family: 'Orbitron', sans-serif;
    font-size: 40px;
    text-align: center;
}
.rcdiv span 
{
    font-family: 'Comic Neue', cursive;
    font-size: 30px;
}
.navbar h4 
{
    font-family: 'Comic Neue', cursive;
    font-size: 20px;
    font-family: 100;
}
</style>
<body>
    <div class="navbar">                
        <div id="logoicon">
            <a class="logo" href="homepage.html">
                <button id="logobtn" >Quick Cabs</button>
            </a>
            <h4>Hello, <?=$DriverName?></h4>            <!--change 'name' with driver's name using php-->
        </div>
    </div>
    <div class="content">
        <div id="logoutdiv">
            <button id="logout" value="clicked" name="logout">LOG OUT</button>
        </div>
        <div class="leftcon">
            <div class="lcdiv">
                <!-- <div id="no_customer" style="display: block;">
                    <h1>NO CUSTOMER ALLOCATED RIGHT NOW</h1>
                    <br>
                    <span>Please wait for a while.</span>
                </div> -->
                <div id="pvinfo" style="display: block;">
                    <br><br>
                    <h1>PASSENGERS INFO</h1>
                    <br>
                    <span>Passenger's Name: </span>
                    <span id="dvspan"><?=$PFname?> <?=$PLname?></span><br>
                    <span>Contact: </span>
                    <span id="dvspan"><?=$PContact?></span><br>
                    <span>Pick Up: </span>
                    <span id="dvspan"><?=$PickUp?></span><br>
                    <span>Drop Location: </span>
                    <span id="dvspan"><?=$DropLoc?></span><br>
                    <br><br><br><br><br><br><br><br><br><br><br><br>
                   

                    <div id="otpdiv" style="display:block;">
                    <h1>Enter OTP below:</h1>
                    <br><br><br><br><br>
                        <input type="number" id="driOTP" name="driOTP" placeholder="XXXXXX"><br><br>
                        <button id="otpbtn" value="clicked" name="otpbtn" onclick="verifyotp()">Click to start</button>
                    </div>
                    <div id="yesotp" style="display: none;">
                        <h1>YOUR RIDE HAS BEEN STARTED.</h1><br>
                        <h1>ENJOY YOUR RIDE.</h1>
                        <br><br><br><br><br>
                    <span>Have you reached your destination? </span><br><br>
                    <form action="#" method="POST">
                    <button id="endbtn" value="clicked" name="endbtn">End drive</button>
                    </form>
                    </div>
                    <br><br>

                </div>
                <!-- <div id="ride_end" style="display: none;">
                    <h1>RIDE STARTED</h1>
                    <br>
                    <span>Drop Location: </span>
                    <br><br><br><br><br>
                    <span>Have you reached your destination? </span>
                    <button id="endbtn" value="clicked" name="endbtn">End drive</button>
                </div> -->
            </div>
        </div>
        <div class="rightcon">
            <!-- <p id="rcdivp" style="font-size: 20px;"></p>
            <p style="font-size: 20px;">TimeInterval example</p> -->
            
            <div class="rcdiv">
                <div id="dvinfo">
                    <br><br>
                    <h1>PERSONAL INFO</h1>
                    <br>    
                    <span>Name: </span>
                    <span id="dvspan"><?=$DriverName?></span><br>
                    <span>Phone: </span>
                    <span id="dvspan"><?=$Contact?></span><br>
                    <span>Licence No: </span>
                    <span id="dvspan"><?=$License?></span><br>
                    <br><br>
                    <h1>CAR INFO</h1>
                    <br>    
                    <span>Car Model: </span>
                    <span id="dvspan"><?=$CarModel?></span><br>
                    <span>Car Number: </span>
                    <span id="dvspan"><?=$CarNum?></span><br>
                    
                    <br><br><br><br><br>
                    <h1>Instructions</h1>
                    <span>1. Do not drink and drive.</span><br>
                    <span>2. Always carry your driving licence and car documents.</span><br>
                    <span>3. Follow all COVID-19 precautions carefully.</span>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>    
                    <span>For any problem, contact us at 9184818341 or mail us at admin@quickcabs.com</span>
                    <br><br><br>
                    
                </div>
            </div>
        </div>
    </div>
    <script>
           function verifyotp()
           {
               var otp=<?=$OTP?>;
               var otpinp=document.getElementById('driOTP').value;
            
               if(otp==otpinp)
               {
                   document.getElementById('otpdiv').style.display='none';
                   document.getElementById('yesotp').style.display='block';
               }
           }

       
      </script>  


  
</body>
</html>
