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
function b3clicked(){
    const b=3;
    bgcolorfunc(b);
    colorfunc(b);
    displayfunc(b);
}



function bgcolorfunc(b){
    if (b==1){
        document.getElementById('b1').style.backgroundColor = 'rgb(55, 124, 124)';
        document.getElementById('b2').style.backgroundColor = 'rgb(55, 124, 124, 0)';
        document.getElementById('b3').style.backgroundColor = 'rgb(55, 124, 124, 0)';
    }
    if (b==2){
        document.getElementById('b1').style.backgroundColor = 'rgb(55, 124, 124, 0)';
        document.getElementById('b2').style.backgroundColor = 'rgb(55, 124, 124)';
        document.getElementById('b3').style.backgroundColor = 'rgb(55, 124, 124, 0)';
    }
    if (b==3){
        document.getElementById('b1').style.backgroundColor = 'rgb(55, 124, 124, 0)';
        document.getElementById('b2').style.backgroundColor = 'rgb(55, 124, 124, 0)';
        document.getElementById('b3').style.backgroundColor = 'rgb(55, 124, 124)';
    }
}
function colorfunc(b){
    if (b==1){
        document.getElementById('b1').style.color = 'white';
        document.getElementById('b2').style.color = 'rgb(16, 80, 80)';
        document.getElementById('b3').style.color = 'rgb(16, 80, 80)';
    }
    if (b==2){
        document.getElementById('b1').style.color = 'rgb(16, 80, 80)';
        document.getElementById('b2').style.color = 'white';
        document.getElementById('b3').style.color = 'rgb(16, 80, 80)';
    }
    if (b==3){
        document.getElementById('b1').style.color = 'rgb(16, 80, 80)';
        document.getElementById('b2').style.color = 'rgb(16, 80, 80)';
        document.getElementById('b3').style.color = 'white';
    }
}
function displayfunc(b){
    if (b==1){
        document.getElementById('ctform').style.display = 'block';
        document.getElementById('osform').style.display = 'none';
        document.getElementById('rtform').style.display = 'none';
    }
    if (b==2){
        document.getElementById('ctform').style.display = 'none';
        document.getElementById('osform').style.display = 'block';
        document.getElementById('rtform').style.display = 'none';
    }
    if (b==3){
        document.getElementById('ctform').style.display = 'none';
        document.getElementById('osform').style.display = 'none';
        document.getElementById('rtform').style.display = 'block';
    }
}