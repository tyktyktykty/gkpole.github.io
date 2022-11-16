var snowCount = 12;
var snowColor = new Array("#b9dff4", "#b9dff5", "#b9dff6", "#b9dff7", "#b9dff8");
var snowType = new Array("Times");
var snowletter = "*"
var sinkSpeed = 0.5;
var snowSizeMin = 10;
var snowSizeMax = 40;
var snowLocation = 1; // 1 - по всему экрану, 2 - слева, 3 - по центру, 4 - справа

// Элементы для работы скрипта (здесь не стоит ничего менять)
var snow = new Array();
var marginbottom;
var marginright;
var timer;
var i_snow = 0;
var x_mv = new Array();
var crds = new Array();
var lftrght = new Array();
var browserinfos = navigator.userAgent;
var ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/);
var ns6 = document.getElementById && !document.all;
var opera = browserinfos.match(/Opera/);
var browserok = ie5 || ns6 || opera;

function RandomMaker(range){
  return Math.floor(range * Math.random());
}

function InitSnow(){
  if (ie5 || opera){
     marginbottom = document.body.scrollHeight;
     marginright = document.body.clientWidth - 15;
  }else if (ns6){
     marginbottom = document.body.scrollHeight;
     marginright = window.innerWidth - 15;
  }
  var snowsizerange = snowSizeMax - snowSizeMin;
  for (i = 0; i <= snowCount; i++){
     crds[i] = 0;
     lftrght[i] = Math.random() * 15;
     x_mv[i] = 0.03 + Math.random() / 10;
     snow[i] = document.getElementById("s" + i);
     snow[i].style.fontFamily = snowType[RandomMaker(snowType.length)];
     snow[i].size = RandomMaker(snowsizerange) + snowSizeMin;
     snow[i].style.fontSize = snow[i].size + "px";
     snow[i].style.color = snowColor[RandomMaker(snowColor.length)];
     snow[i].style.zIndex = 1000;
     snow[i].sink=sinkSpeed * snow[i].size / 5;
     if (snowLocation == 1){
         snow[i].posx = RandomMaker(marginright - snow[i].size);
     }
     if (snowLocation == 2){
     snow[i].posx = RandomMaker(marginright / 2 - snow[i].size);
     }
     if (snowLocation == 3){
     snow[i].posx = RandomMaker(marginright / 2 - snow[i].size) + marginright / 4
     }
     if (snowLocation == 4){
     snow[i].posx = RandomMaker(marginright / 2 - snow[i].size) + marginright / 2
     }
     snow[i].posy = RandomMaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
     snow[i].style.left = snow[i].posx + "px";
     snow[i].style.top = snow[i].posy + "px";
  }
  MoveSnow();
}

function MoveSnow(){
  for (i = 0; i <= snowCount; i++){
     crds[i] += x_mv[i];
     snow[i].posy += snow[i].sink;
     snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
     snow[i].style.top = snow[i].posy + "px";
     if (snow[i].posy >= marginbottom - 2 * snow[i].size ||
         parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])){
         if (snowLocation == 1){
             snow[i].posx = RandomMaker(marginright - snow[i].size)
         }
         if (snowLocation == 2){
             snow[i].posx = RandomMaker(marginright / 2 - snow[i].size)
         }
         if (snowLocation == 3){
             snow[i].posx = RandomMaker(marginright / 2 - snow[i].size) + marginright / 4
         }
         if (snowLocation == 4){
             snow[i].posx = RandomMaker(marginright / 2 - snow[i].size) + marginright / 2
         }
         snow[i].posy = 0;
       }
    }
    var timer = setTimeout("MoveSnow()", 50);
}

for (i = 0; i <= snowCount; i++){
   document.write("<span id='s" + i + "' style='position:absolute;top:-" + snowSizeMax +
       "'>" + snowletter + "</span>");
}

if (browserok){
   window.onload = InitSnow;
}
