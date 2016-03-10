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
    var picList=$("#list");
    var aImg=$("img",picList);
    var n=0;
    var aPic=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg"];
    setInterval(function(){
        n++;
        if(n>aPic.length-1){
            n=0;
        }
        aImg[1].src=aPic[n];
        doMove(picList,"left",-300,20,function(){
            picList.style.left=0;
            aImg[0].src=aImg[1].src;
        })
    },3000);


}