function b1clicked(){
    const b=1;
    bgcolorfunc(b);
    colorfunc(b);
    displayfunc(b);
}
function b2clicked(){
    const b=2;
    bgcolorfunc(b);
    colorfunc(b);
    displayfunc(b);
}
// function b3clicked(){
//     const b=3;
//     bgcolorfunc(b);
//     colorfunc(b);
//     displayfunc(b);
// }
							

// function initMap() {
//     const myLatLng = { lat: -25.363, lng: 131.044 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: myLatLng,
//     });
  
//     new google.maps.Marker({
//       position: myLatLng,
//       map,
//       title: "Hello World!",
//     });
//   }
// var marker = new google.maps.Marker({
//     place : points[3],
//     location : place[4]
// });
// google.maps.event.addListener(marker, 'click', function() {
//     document.getElementById("droploc")=this.location;
// });

// var select = document.getElementById("places");
// var points =[
//     "noida,uttar pradesh, India",
//     "worlds of wonder, Sector 38 A, Noida",
//     "noida golf course,Sector 38, Noida,",
//     "brahmaputra market,Sector 29, Noida",
//     "stupa 18 gallery,Sector 25, Yamuna Expressway(Greater Noida)",
//     "buddh international circuit,Sector 38, Noida,",
//     "botanic garden of indian republic,Sector 38, Noida",
//     "okhla bird sanctuary,Sector 95, Noida",
//     "Rashtriya Dalit Prerna Sthal and Green Garden, Noida,Sector 95, Noida",
//     "Smaaash, Noida,DLF Mall of India, Sector 18",
//     "Snow World, Noida,DLF Mall of India, Sector 18, Noida	",
//     "Kidzania, Noida,The Great India Place, Sector 38 A, Noida",
//     "The Grand Venice Mall, Noida,Near Pari Chowk, Greater Noida",
//     "The Great India Place, Noida,Near Pari Chowk, Greater Noida",
//     "Atta Market, Noida,Near Pari Chowk, Greater Noida",
//     "Appu Ghar Express, Noida,The Great India Place, Sector 38, Noida"
// ];

//     for (var i = 0; i < points.length; i++) {
//         var el = document.createElement("option");
//         el.innerHTML = points[i];
//         el.value = points[i];
//         select.appendChild(el);
//     }
// function initMap() {

//   var macc = {lat: 42.1382114, lng: -71.5212585};

//   var map = new google.maps.Map(

//       document.getElementById('map'), {zoom: 15, center: macc});

//   var marker = new google.maps.Marker({position: macc, map: map});

// }


 

function bgcolorfunc(b){
    if (b==1){
        document.getElementById('b1').style.backgroundColor = 'rgb(55, 124, 124)';
        document.getElementById('b2').style.backgroundColor = 'rgb(55, 124, 124, 0)';
        // document.getElementById('b3').style.backgroundColor = 'rgb(55, 124, 124, 0)';
    }
    if (b==2){
        document.getElementById('b1').style.backgroundColor = 'rgb(55, 124, 124, 0)';
        document.getElementById('b2').style.backgroundColor = 'rgb(55, 124, 124)';
        // document.getElementById('b3').style.backgroundColor = 'rgb(55, 124, 124, 0)';
    }
    // if (b==3){
    //     document.getElementById('b1').style.backgroundColor = 'rgb(55, 124, 124, 0)';
    //     document.getElementById('b2').style.backgroundColor = 'rgb(55, 124, 124, 0)';
    //     document.getElementById('b3').style.backgroundColor = 'rgb(55, 124, 124)';
    // }
}
function colorfunc(b){
    if (b==1){
        document.getElementById('b1').style.color = 'white';
        document.getElementById('b2').style.color = 'rgb(16, 80, 80)';
        // document.getElementById('b3').style.color = 'rgb(16, 80, 80)';
    }
    if (b==2){
        document.getElementById('b1').style.color = 'rgb(16, 80, 80)';
        document.getElementById('b2').style.color = 'white';
        // document.getElementById('b3').style.color = 'rgb(16, 80, 80)';
    }
    // if (b==3){
    //     document.getElementById('b1').style.color = 'rgb(16, 80, 80)';
    //     document.getElementById('b2').style.color = 'rgb(16, 80, 80)';
    //     document.getElementById('b3').style.color = 'white';
    // }
}
function displayfunc(b){
    if (b==1){
        document.getElementById('ctform').style.display = 'block';
        document.getElementById('osform').style.display = 'none';
        // document.getElementById('rtform').style.display = 'none';
    }
    if (b==2){
        document.getElementById('ctform').style.display = 'none';
        document.getElementById('osform').style.display = 'block';
        // document.getElementById('rtform').style.display = 'none';
    }
    // if (b==3){
    //     document.getElementById('ctform').style.display = 'none';
    //     document.getElementById('osform').style.display = 'none';
    //     document.getElementById('rtform').style.display = 'block';
    // }
}