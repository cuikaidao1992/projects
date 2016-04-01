/**
 * Created by cuikaidao on 2016/3/2.
 */

function $(selector,content){
    if( selector.charAt(0) === "#" ){
        return document.getElementById(selector.substring(1))
    }else{
        content = content || document;
        return  content.getElementsByTagName(selector);
    }
}
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
window.onload=function(){
    var timer = null;
    var n=0;
    var picList=$("#list");
    var pic=$("#pic");
    var aImg=$("img",picList);
    var nextBtn=$("span",pic)[1];
    var prevBtn=$("span",pic)[0];
    var aPic=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg"];
    var focus=$("#focus");
    var aLLA=$("a",focus);
    function play(){
        timer=setInterval(function(){
            n++;
            if(n>aPic.length-1){
                n=0;
            }
            aImg[1].src=aPic[n];
            for (var j = 0; j < aLLA.length; j++) {
                aLLA[j].className="next bg"
            }
            aLLA[n].className="current bg";
            doMove(picList,"left",-400,30,function(){
                picList.style.left=0;
                aImg[0].src=aImg[1].src;
            })
        },2000);
    }
    play();
    for (var i = 0; i < aLLA.length; i++) {
        aLLA[i].index=i;
        aLLA[i].onmouseover=function(){
            clearInterval( timer );
            aImg[0].src=aPic[this.index];
            for (var j = 0; j < aLLA.length; j++) {
                aLLA[j].className="next bg"
            }
            aLLA[this.index].className="current bg";
            n=this.index;
        };
        aLLA[i].onmouseout=function(){
            play()
        }
    }
    nextBtn.onmouseover=function(){
        clearInterval(timer)
    };
    nextBtn.onmouseout=function(){
        play()
    };
    prevBtn.onmouseover=function(){
        clearInterval(timer)
    };
    prevBtn.onmouseout=function(){
        play()
    };
    prevBtn.onclick=function(){
        console.log(n)
        n--;
        if(n<0){
           n= aPic.length-1
        }
        aImg[0].src=aPic[n];
        for (var j = 0; j < aLLA.length; j++) {
            aLLA[j].className="next bg"
        }
        aLLA[n].className="current bg";
    };
    nextBtn.onclick=function(){
        n++;
        if(n>aPic.length-1){
            n=0
        }
        aImg[0].src=aPic[n];
        for (var j = 0; j < aLLA.length; j++) {
            aLLA[j].className="next bg"
        }
        aLLA[n].className="current bg";
    }
};