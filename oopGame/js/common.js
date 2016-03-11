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
function $(selector,content){
    var firstChar=selector.charAt(0);
    if (firstChar=='#'){
        return document.getElementById(selector.substring(1));
    }else {
        var c = content || document;
        return c.getElementsByTagName(selector);
    }
}
function shake(obj,attr,speed,callBack){
    if(obj.timer)return;
    var cur=parseInt(getStyle(obj,attr));
    var arr=[];
    for (var i = speed; i>0; i-=3) {
        arr.push(-i,i);
    }
    arr.push(0);
    var n=0;
    obj.timer=setInterval(function(){
        obj.style[attr]=arr[n]+cur+"px";
        n++;
        if(n>=arr.length){
            clearInterval(obj.timer);
            obj.timer=null;
            typeof callBack === "function" &&　callBack();
        }
    },40)
}