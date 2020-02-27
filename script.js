var canvas = document.getElementById("c1");
var ctx = canvas.getContext("2d");


var x = 190;
var y = 590;
var fireX = 205;
var fireY = 590 ;
var direction = 0;
var timer;
var nX = 205;
var nY = 30;
var v = true;
var count = true;
var arr1 = [];
var arr = [];
var t = 0;
var b = 0;
var we = true;
var time;


function arsenal(){
    var gX = Math.floor(Math.random()*360+15);
    var gY = 0;
    
    var obj = {
        nX: gX,
        nY: gY,
        color: "rgba("+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+" ," +Math.floor(Math.random()*255)+")"
    }
    arr.push(obj);
    setTimeout(arsenal, 1000);
}

arsenal()
  


function player(){

    ctx.beginPath();
    ctx.fillRect(x,y,40,10);
    ctx.stroke();

    for(var i=0; i<arr1.length; i++){
        ctx.beginPath();
        ctx.fillRect(arr1[i].m,arr1[i].k,10,10);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.fillRect(x+15,y-10,10,10);
    ctx.stroke();
}
player()


addEventListener("keydown",function(e){
    if(e.keyCode == 37 && v && we){
        count = true
        left()
    }
    if(e.keyCode == 39 && v && we){
        count = true
        right()
    }
})   

addEventListener("keyup",function(e){
    if(e.keyCode == 37){
        count = false;
    }
    if(e.keyCode == 39){
        count = false;
    }
})

function left(){
    v = false
    if(x>0){ 
        ctx.clearRect(x,y,48,10);
        ctx.clearRect(x+15,y-10,14,10);
        player()
        x-=2
    }
    if(count){
        setTimeout(left,10)
    }else{
        v = true
    }
}
function right(){
    v = false
    if(x<360){ 
        ctx.clearRect(x-10,y,48,10);
        ctx.clearRect(x,y-10,18,10);
        player()
        x+=2
    }
    if(count){
        setTimeout(right,10)
    }else{
        v = true
    }
}

addEventListener("keyup",function(e){
    if(e.keyCode == 32 && we){
        arr1.push({m:x+15,k:590})
        fire()
    } 
})

function fire(){
    if(fireY >= nY){
        for(var i=0; i<arr1.length; i++){
            ctx.clearRect(arr1[i].m,arr1[i].k,10,11);
            ctx.beginPath();
            ctx.fillRect(arr1[i].m,arr1[i].k,10,10);
            ctx.stroke()            
            arr1[i].k--;
            if(arr1[i].k <= 0){
                arr1.splice(i,1)
            }
        }
        player();
    }
    if(direction == 0){        
        timer = setInterval(fire,1);
        direction = 1;
    }
    if(t == 100){
        ctx.clearRect(0,0,400,600)
    }
}


function adversary(){
    
    ctx.clearRect(0,0,400,600)
    time = setTimeout(adversary,10)
    player()
    for(var i=0; i<arr.length; i++){
        arr[i].nY++
        ctx.beginPath();
        ctx.fillRect(arr[i].nX,arr[i].nY,10,10);
        ctx.fillStyle = arr[i].color;
        ctx.stroke();
        if(arr[i].nY == 600){
            b++
        }
        for(var j = 0; j< arr1.length; j++){
            if( arr[i].nX-10<=arr1[j].m && arr[i].nX+10>=arr1[j].m && arr[i].nY >= arr1[j].k){
                arr.splice(i,1);
                arr1.splice(j,1);
                i = 0;
                j = 0;
                t++;
            }
        }
    }
    if(t == 100){
        ctx.clearRect(0,0,400,600)
        clearTimeout(time);
        clearInterval(timer);
        we = false;
        ctx.font = "50px Arial";
        ctx.fillText("You Win",100,300);
    } 
    if(b==3){
        ctx.clearRect(0,0,400,600)
        clearTimeout(time);
        clearInterval(timer);
        we = false
        ctx.font = "50px Arial";
        ctx.fillText("You Lose",100,300);
    }
    
    ctx.font = "30px Arial";
    ctx.fillText(t,10,30);
    ctx.fillText(b,10,550);
}
adversary()
