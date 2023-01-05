<?php session_start();
$amt1= $_SESSION['amt1'];
$_SESSION['$amt2']=$amt1;
?>

<?php
    $flag=0;
    $usernam=$_SESSION['$un'];
    $_SESSION['userid']=$usernam;
    echo "Your UserId is ".$usernam;

    $arr=array(
        "noida,uttar pradesh, India",
        "worlds of wonder, Sector 38 A, Noida",
        "noida golf course,Sector 38, Noida,",
        "brahmaputra market,Sector 29, Noida",
        "stupa 18 gallery,Sector 25, Yamuna Expressway(Greater Noida)",
        "buddh international circuit,Sector 38, Noida,",
        "botanic garden of indian republic,Sector 38, Noida",
        "okhla bird sanctuary,Sector 95, Noida",
        "Rashtriya Dalit Prerna Sthal and Green Garden, Noida,Sector 95, Noida",
        "Smaaash, Noida,DLF Mall of India, Sector 18",
        "Snow World, Noida,DLF Mall of India, Sector 18, Noida	",
        "Kidzania, Noida,The Great India Place, Sector 38 A, Noida",
        "The Grand Venice Mall, Noida,Near Pari Chowk, Greater Noida",
        "The Great India Place, Noida,Near Pari Chowk, Greater Noida",
        "Atta Market, Noida,Near Pari Chowk, Greater Noida",
        "Appu Ghar Express, Noida,The Great India Place, Sector 38, Noida"
    );

    $con=mysqli_connect("localhost","root","","dswproject");
    if (mysqli_connect_errno($con))
    {
         echo"Failed connect".mysqli_connect_error();
    }

    if(isset($_POST['Bookct']))
    {
        $pick1=$_POST['places1'];
        $pick=$arr[$pick1];

        $drop1=$_POST['places2'];
        $drop=$arr[$drop1];

        $when=$_POST['vehicle'];  ///for radio.
        
        $BoardOtp=rand(100000,933827);
        $Type='City Taxi';

        $count=0;
        $ans;
        $booknum;
        $sql = "Select d.D_ID from drivers d,car c,assign a where d.AVAILABILITY=1 and a.DRIVER_ID=d.D_ID and a.CAR_NO=c.CAR_NO and c.TYPE='$when' Order by RAND() LIMIT 1;";
    
        ///add cartype radio button.
        $row=mysqli_query($con,$sql);
    
        if(mysqli_num_rows($row)>0)
        {          
            while($a =mysqli_fetch_array($row))
            {
                $ans=$a['D_ID'];
                echo "<br>".$a['D_ID'];
                $count=1;
            }
        }
        else
            echo "<br>Failed availa to execute query as".mysqli_error($con);
     
        if($count==1)
        {
             $sql="Update drivers SET AVAILABILITY=0 where D_ID='$ans'";           
     
             if(mysqli_query($con,$sql))
             {
                 echo "<br>Driver Availability Updated successfully";
                 $booknum=rand(10000000,99999999);
                 $flag=1;
             }
             else
                 echo "<br>Failed to update Driver as".mysqli_error($con);
                
       
        }

    
        


    }
    else if(isset($_POST['Bookos']))
    {
        $arr2=array(
            
            "Gaziabad","Faridabad","Dadri","New Delhi","Dasna","Loni","Dankaur","Muradnagar","Sikandrabad","Pilkhuwa","Faridnagar","Nangloi Jat","Gurgaon","Agra"
         );
         $pick1=$_POST['places3'];
         $pick=$arr2[$pick1];
 
         $drop1=$_POST['places4'];
         $drop=$arr2[$drop1];
 
         $when=$_POST['vehicle'];  
         $BoardOtp=rand(100000,933827);
         $Type='Outstation';

       
        $count=0;
       
        $sql="Select D_ID from drivers where AVAILABILITY=1  Order by RAND() LIMIT 1";
        $row=mysqli_query($con,$sql);
    
        if(mysqli_num_rows($row)>0)
        {          
            while($a =mysqli_fetch_array($row))
            {
                $ans=$a['D_ID'];
                echo "<br>".$a['D_ID'];
                $count=1;
            }
        }
        else
            echo "<br>Failed to execute query as".mysqli_error($con);
     
        if($count==1)
        {
             $sql="Update drivers SET AVAILABILITY=0 where D_ID='$ans'";           
     
             if(mysqli_query($con,$sql))
             {
                 echo "<br>Driver Availability Updated successfully";
                 $booknum=rand(10000000,99999999);
                 $flag=1;
      
             }
             else
                 echo "<br>Failed to update Driver as".mysqli_error($con);
                
       
        }
        


    }

    // else if(isset($_POST['Bookrt']))
    // {
    //     $pick=$_POST['pickloc'];
    //     $When=$_POST['when'];
    //     $BoardOtp=rand(100000,933827);
    //     $Type='Rentals';
    //     $drop="";


    //     $count=0;
       
    //     $sql="Select D_ID from drivers where AVAILABILITY=1  Order by RAND() LIMIT 1";
    //     $row=mysqli_query($con,$sql);
    
    //     if(mysqli_num_rows($row)>0)
    //     {          
    //         while($a =mysqli_fetch_array($row))
    //         {
    //             $ans=$a['D_ID'];
    //             echo "<br>".$a['D_ID'];
    //             $count=1;
    //         }
    //     }
    //     else
    //         echo "<br>Failed to execute query as".mysqli_error($con);
     
    //     if($count==1)
    //     {
    //          $sql="Update drivers SET AVAILABILITY=0 where D_ID='$ans'";           
     
    //          if(mysqli_query($con,$sql))
    //          {
    //              echo "<br>Driver Availability Updated successfully";
    //              $booknum=rand(10000000,99999999);
    //              $flag=1;

    //          }
    //          else
    //              echo "<br>Failed to update Driver as".mysqli_error($con);
                
    //     }
        
    // }

    if($flag==1)
    {
        $sql2="Insert into booking values('$booknum','$BoardOtp','$pick','$drop','$Type','$usernam','$ans',0)";
        if(mysqli_query($con,$sql2))
        {
            echo "Inserted";
            $_SESSION['booknum']=$booknum;
            header('location: \PHP\project\final\5. userinterface\userinterface.php');

        }
        else
        echo "Not inserted as ".mysqli_error($con);
    }

?>
