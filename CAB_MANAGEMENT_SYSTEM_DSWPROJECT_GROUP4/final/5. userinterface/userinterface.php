<?php
session_start();
$BookNum=$_SESSION['booknum'];
$UID=$_SESSION['userid'];


?>

<?php
   $con=mysqli_connect("localhost","root","","dswproject");
   if (mysqli_connect_errno($con))
   {
       echo"Failed".mysqli_connect_error();
   }

   $sql = "SELECT d.d_name ,c.CAR_NO ,c.MODEL ,d.D_PHONENO,b.BOARDING_OTP,b.BOARDING_POINT,b.DROPPING_POINT from drivers d,car c,booking b,assign a where b.BOOKING_NO='$BookNum' and b.D_ID=d.D_ID and c.CAR_NO=a.CAR_NO and a.DRIVER_ID=d.D_ID and b.END_RIDE=0";
   $row=mysqli_query($con,$sql);

   if(mysqli_num_rows($row)>0)
   {          
       while($a =mysqli_fetch_array($row))
       {
           $DriverName=$a['d_name'];
           $CarNum=$a['CAR_NO'];
           $CarModel=$a['MODEL'];
           $Contact=$a['D_PHONENO'];  
           $OTP=$a['BOARDING_OTP'];         
           $PickUp=$a['BOARDING_POINT'];
           $DropLoc=$a['DROPPING_POINT'];
       }
   }
   else
       echo "<br>Failed to execute query as".mysqli_error($con);


       $sql2 = "Select P_Fname,P_Lname,P_email,P_phoneno from passengers where P_Id='$UID'";
       $row2=mysqli_query($con,$sql2);
    
       if(mysqli_num_rows($row2)>0)
       {          
           while($p =mysqli_fetch_array($row2))
           {
              $FName=$p['P_Fname'];
              $LName=$p['P_Lname'];
              $PEmail=$p['P_email'];
              $P_Phone=$p['P_phoneno'];
                
            //    echo "Hi<br>". $DriverName." ".$CarNum." ".$CarModel." ".$Contact." ".$PickUp." ".$DropLoc ;
           }
       }
       else
           echo "<br>Failed to execute query as".mysqli_error($con);
    
 
 
 
 ?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Interface</title>
    
    <!-- <script src="userinterace.js"></script> -->
    <script>
        setInterval(myTimer, 1000);
        
        function myTimer() {
        //   if start_time!=NULL,  goto next page
        }
        </script>
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
   color: rgb(255, 255, 255);
   margin-left: 20px;
}

.logo{
    height: 46px;
    /* margin-right: calc(100% - 470.82px - 144.81px); */
}
.content{
    height: 100vh;
    background: rgb(202,209,25);
    background: linear-gradient(90deg, rgba(202,209,25,1) 0%, rgba(203,131,25,1) 57%, rgba(219,255,0,1) 100%);
}
.leftcon{
    float: left;
    height: 80vh;
    width: 44vw;
    margin-top: 15vh;
    margin-left: 3vw;
    margin-right: 3vw;
    background-color: rgb(174, 252, 245);
    border-radius: 10px;
    box-shadow: 5px 0 20px 0 rgb(27, 27, 27);
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
    border-radius: 10px;
    box-shadow: 5px 0 20px 0 rgb(27, 27, 27);
}
#logoutdiv{
    position: fixed;
    right: 10px;
    top: 50px;
}
.btn{
    color: darkblue;
    font-size: 20px;
    border: 2px solid black;
    background-color: cyan;
    border-radius: 10pxs;
    font-family: 'Comic Neue', cursive;
    
}
.btn:hover{
    background-color: lightcoral;
    color: black;
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
#dvinfo h1{
    font-size: 20px;
    font-weight: 900;
}
#dvinfo span{
    font-size: 14px;
}
#dvspan{
    font-weight: 600;
}
.loaderdiv{
    width: 100%;
    padding-left: calc(50% - 60px);
    padding-top: 15%;
    /* background-color: red; */
}
.loader {
    margin-left: calc( var(--width) - 60px);
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

 #ride_started h1{
    font-size: 20px;
    font-weight: 900;
}
#ride_started span{
    font-size: 14px;
}
#ride_started{
    text-align: center;
    padding-top: 200px;
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
            <a class="logo" href="#">
                <button id="logobtn" >Quick Cabs</button>
            </a>
            <h4>Hello, <?=$FName?></h4>            <!--change 'user' with user's nameusing php-->
        </div>
    </div>
    <div class="content">
      
        <div class="leftcon">
            <div class="lcdiv">
                <div id="dvinfo" style="display: block;">
                    <br><br>
                    <h1>DRIVER INFO</h1>
                    <br>
                    <span>Driver's Name: </span>
                    <span id="dvspan"><?php echo $DriverName?></span><br><br>
                  

                    <span>Car Model: </span>
                    <span id="dvspan"><?= $CarModel?></span><br><br>
                    <span>Car Number: </span>
                    <span id="dvspan"><?=$CarNum?></span><br><br>
                    <span>Contact: </span>
                    <span id="dvspan"><?=$Contact?></span><br><br>
                    <span>Pick Up: </span>
                    <span id="dvspan"><?=$PickUp?></span><br><br>
                    <span>Drop Location: </span>
                    <span id="dvspan"><?=$DropLoc?></span><br><br>
                    <span>Booking Number: </span>
                    <span id="dvspan"><?php echo $BookNum?></span><br><br>

                    <br><br><br>
                    <div id="OTP1">
                    <h1>OTP: <?=$OTP?></h1><br><br>
                    <span id="otpab">give OTP to the driver to start the ride</span>
                    </div>
                    <br><br>
                    <div id="OTP2">
                        <form action="../7. payment/payment.php" onsubmit="return abcd()" method="POST">
                            <input type="submit" name="PaySub" class="btn" value="GO TO PAYMENT">

                        </form>
                    </div>
                  
                </div>
                <div id="ride_started" style="display: none;">
                    <h1>RIDE HAS  STARTED</h1>
                    <br>
                    <span>Please tighten your seatbelt.</span>
                </div>
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
                    <span id="dvspan"><?=$FName?> <?=$LName?></span><br><br>
                    <span>Phone: </span>
                    <span id="dvspan"><?=$P_Phone?></span><br><br>
                    <span>Email: </span>
                    <span id="dvspan"><?=$PEmail?></span><br><br>
                    <br><br><br><br><br>
                    <h1>Instructions</h1>
                    <span>1. Don't share OTP with anyone.</span><br>
                    <span>2. Tell driver your OTP only when you have sitted in the cab.</span><br>
                    <span>3. Follow all COVID-19 precautions carefully.</span>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    <h1 style="text-align: center;">BE SAFE</h1>
                    <h1 style="text-align: center;">HAVE A GREAT JOURNEY</h1>
                    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>    
                    <span>For any problem, contact us at 9184818341 or mail us at admin@quickcabs.com</span>
                    <br><br><br>
                    
                </div>
            </div>
        </div>
    </div>
    <?php 
    function abcd()
    {
        if(isset($_POST['PaySub']))
        {
            $BookNum=$_SESSION['booknum'];
            $UID=$_SESSION['userid'];
                
                $con=mysqli_connect("localhost","root","","dswproject");
                
                if (mysqli_connect_errno($con))
                {
                     echo"Failed connect".mysqli_connect_error();
                }
            
                $sql="Select P_ID from booking where P_Id='$UID' and BOOKING_NO='$BookNum' and END_RIDE=0";
                $row=mysqli_fetch_array(mysqli_query($con,$sql));
                
                if( mysqli_num_rows(mysqli_query($con,$sql)) > 0)
                {
                    echo "<br><br>Ride Hasnot Finished Yet!!";
                    return false;
                }  
                           
                 else
                 {
                    //  header('location: \PHP\project\final\7. payment\payment.php');
                     return true;
                 }
           
                
        }

        
    }
    ?>


</body>
</html>


