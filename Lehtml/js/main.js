/**
 * Created by cuikaidao on 2016/3/2.
 */
function getStyle(obj,attr){
    if( obj.currentStyle ){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    }
}
function doMove(obj,attr,target,speed,callBack){
    var cur = parseInt( getStyle(obj,attr) );
    speed = cur < target ? Math.abs(speed) : -Math.abs(speed);
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        cur += speed;
        if(  cur >= target && speed > 0 ||  cur <= target && speed < 0){
            clearInterval(obj.timer);
            cur = target;
            obj.style[attr] = cur + "PX";
            typeof callBack === "function" &&　callBack();
        }else{
            obj.style[attr] = cur + "PX";
        }
    },30);
}
function addZero(n){
    return n < 10 ? "0"+n : n;
}
window.onload=function(){
    var picList=document.getElementById("list");
    var aImg=picList.getElementsByTagName("img");
    var p=picList.getElementsByTagName("p");
    var aDiv=picList.getElementsByTagName("div");
    var n=0;
    var timer=null;
    var data=[
        {
            title:"1.《琅琊榜》曾一度要在猴年春晚上“大聚首”。不过，以往年春晚经验来看，在除夕夜正式开始春晚直播之前，任何节目都有可能瞬息万变。"
        },
        {
            title:"2.《琅琊榜》曾一度要在猴年春晚上“大聚首”。不过，以往年春晚经验来看，在除夕夜正式开始春晚直播之前，任何节目都有可能瞬息万变。"
        },
        {
            title:"3.《琅琊榜》曾一度要在猴年春晚上“大聚首”。不过，以往年春晚经验来看，在除夕夜正式开始春晚直播之前，任何节目都有可能瞬息万变。"
        },
        {
            title:"4.《琅琊榜》曾一度要在猴年春晚上“大聚首”。不过，以往年春晚经验来看，在除夕夜正式开始春晚直播之前，任何节目都有可能瞬息万变。"
        },
        {
            title:"5.《琅琊榜》曾一度要在猴年春晚上“大聚首”。不过，以往年春晚经验来看，在除夕夜正式开始春晚直播之前，任何节目都有可能瞬息万变。"
        }
    ]
    var aPic=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg"];
    function play(){
        timer=setInterval(function(){
            n++;
            if(n>aPic.length-1){
                n=0;
            }
            aImg[1].src=aPic[n];
            p[1].innerHTML=data[n].title;
            doMove(aDiv[0],"bottom",-80,10,function(){
                doMove(picList,"left",-580,30,function(){
                    doMove(aDiv[1],"bottom",0,10,function(){
                        aDiv[0].style.bottom=0;
                        aDiv[1].style.bottom=-80+"px";
                        picList.style.left=0;
                        aImg[0].src=aImg[1].src;
                        p[0].innerHTML=p[1].innerHTML;
                    })
                })
            })
        },2000);
    }
    play();
    var getTime=document.getElementById("gettime");
    var allSpan = getTime.getElementsByTagName("span");
    var futureTime = new Date(2016,4,31,24,0,0);
        setInterval(function (){
            var now = new Date();
            var t = (futureTime.getTime() - now.getTime())/1000;
            if( t <0 ){
                console.log("时间到了");
            }
            var D =  Math.floor(t/86400);
            var H =  Math.floor(t%86400/3600);
            var Min =  Math.floor(t%86400%3600/60);
            var S = Math.floor(t%60);
            var str =addZero(D)+"-"+addZero(H)+"-"+addZero(Min)+"-"+addZero(S);
            var newTime=str.split("-");
            var time=newTime.join("");
            for( var i = 0; i < time.length; i++ ){
                if(time.charAt(i) !=""){
                    allSpan[i].innerHTML = time.charAt(i);
                }
            }
        },1000)
    var btn=document.getElementById("btn");
    var aSpan=btn.getElementsByTagName("span");
    aSpan[0].onmouseover=function(){
        clearInterval(timer);
        this.style.background="green"
    };
    aSpan[0].onmouseout=function(){
        this.style.background="#4c4c4c";
       play()
    };
    aSpan[1].onmouseover=function(){
        clearInterval(timer);
        this.style.background="green"
    };
    aSpan[1].onmouseout=function(){
        this.style.background="#4c4c4c";
        play()
    };
    aSpan[0].onclick=function(){
        n--;
        if(n<0){
            n=aPic.length-1
        }
        aImg[0].src=aPic[n];
        p[0].innerHTML=data[n].title;
    };
    aSpan[1].onclick=function(){
        n++;
        if(n>aPic.length-1){
            n=0
        }
        aImg[0].src=aPic[n];
        p[0].innerHTML=data[n].title;
    }
    $(".userinf").each(function(index,item){
        $(this).mouseover(function(){
            var H=$(".aside").eq(index).offset().top+$(".aside").eq(index).height();
            var h=$(document).scrollTop()+$(window).height();
            if(H>h){
                $(".aside").eq(index).css({
                    top:-150
                })
            }else {
                $(".aside").eq(index).css({
                    top:30
                })
            }
            $(".aside").eq(index).css({
                opacity:1
            })

        }).mouseout(function(){
            $(".aside").eq(index).css({
                top:30,
                opacity:0
            })

        })
    })
}