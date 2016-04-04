/**
 * Created by cuikaidao on 2016/3/12.
 */
function zero(n){
    return n<10? "0"+n : n
}
function getTimes(){
    var d=new Date();
    return zero(d.getHours())+":"+zero(d.getMinutes())
}
function getDate(){
    var month=["January","February","March","April","May","June","July","August","October","November","December"]
    var weekend=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var d=new Date();
    return weekend[d.getDay()]+"，"+month[d.getMonth()]+" "+zero(d.getDate())
}
window.onload=function(){
    //时间
    var unlockTop=document.getElementById("unlock-top");
    var aP = unlockTop.getElementsByTagName("p");
    setInterval(function(){
        aP[0].innerHTML=getTimes();
        aP[1].innerHTML=getDate();
    },1000);
    //图标拖动
    var handle=document.getElementById("unlock-handle");
    handle.onmousedown=function(ev){
        var e=ev||event;
        var x=e.clientX-handle.offsetLeft;
        document.onmousemove=function(ev){
            var e=ev || event;
            var l= e.clientX-x;
            if(l<18){
                l=18
            }
            if(l>170){
                l=170
            }
            handle.style.left=l+"px";
        }
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
            if($(handle).position().left == 170){
                unlock();
            }
            else{
                $(handle).animate({left:18}, 200 );
            }
        };
        return false;
    }
    var unlock = function(){
        $("#unlock-bottom").animate({bottom: -100}, 300);
        $("#unlock-top").animate({top: -100}, 300, '', function()
        {});
        $("#iphone-inside").fadeOut("normal", function(){window.location="Menu.html";});
    }
}