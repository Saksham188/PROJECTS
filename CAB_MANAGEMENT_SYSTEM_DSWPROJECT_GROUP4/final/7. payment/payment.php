<?php session_start()
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="payment.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Zen+Kurenaido&display=swap" rel="stylesheet">
    <title>loginquickCabs</title>
    <!-- <script src="index.js"></script> -->
    <!--To insert JAVASCRIPT-->
</head>

<body>

    <?php
        // header('location: \PHP\project\final\4. booknow\booknow.php');

       $payment_id = mt_rand(10000000, 99999999);
       $booknum=$_SESSION['booknum'];
       $amount=$_SESSION['$amt3'];

    ?> 
    <div id="screen">
        <div class="login">
            <div class="logo">
                <a href="../1. homepage/homepage.html" class="logolink">
                    Quick Cabs
                </a>
            </div>
            <div class="formm">
                Payment ID: <?php echo $payment_id ?> <br>
              

                Booking No. : <?php echo $booknum ?>
                <br>
                <form action="payment.php" method="post" name="myForm" >

                <div class="p_type">
                <label for="payment_type">Payment type</label>
                <input type="radio" name="payment_type" id="cash" value="cash"  onclick="hideCard()">Cash
                <input type="radio" name="payment_type" id="Card" value="Card" onclick="showCard()">Card<br>
                </div>
                <div id="card" style="display: none;">
                <div class="card_details">
                    <label for="cno">Enter Your Card Number</label>
                    <input type="text" name="cno" id="cno" placeholder="XXXX-XXXX-XXXX"><br>
                    </div>
                    <div class="e_det">
                    <label for="exp">Expiry Date</label>
                    <input type="text" name = "exp" placeholder="mm">
                    <input type="text" name = "exp" placeholder="yyyy">
                    </div>
                    <div class="cvv">
                        <label for="cvv">Enter CVV</label>
                        <input type="text" name="cvv" id="cvv" placeholder="XXX">
                    </div>
                    </div>
                    
                    

                    

                 
                <input class="btn" type="submit" name="PAY-NOW" value="PAY NOW">

                
            </div>

            
        </div>
    </div>
    <div class="backgroundani">
        <div class="animation-area">
            <ul class="box-area">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>

<script>
function hideCard(){
document.getElementById("card").style.display= "none";
}
function showCard(){
document.getElementById("card").style.display= "block";
}

</script>
</body>

</html>

<?php
        if(isset($_POST['PAY-NOW']))
        {
            $payment_id = mt_rand(10000000, 99999999);
            $booknum=$_SESSION['booknum'];
            $type=$_POST['payment_type'];
            $cno=$_POST['cno'];

            $con=mysqli_connect("localhost","root","","dswproject");
            if (mysqli_connect_errno($con))
            {
                 echo"Failed".mysqli_connect_error();
            }
            $sql="Insert into payment VALUES('$payment_id','$type','$cno','$booknum')";

            if(mysqli_query($con,$sql))
            {
                echo "<br>Payment successful";
                header('location: \PHP\project\final\1. homepage\homepage.php');
            }
            else
                echo "<br>Failed to Do Payment as".mysqli_error($con);
               
        }
?>