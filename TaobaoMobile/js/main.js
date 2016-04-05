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
window.onload=function(){
    var picList=$("#list");
    var aImg=$("img",picList);
    var nav=$("#nav");
    var a=$("a",nav);
    var n=0;
    var m=0;
    setInterval(function(){
        n++;
        m++;
        if(n>aImg.length-1){
            n=0;
        }
        if(m> a.length-1){
            m=0
        }
        for (var i = 0; i < a.length; i++) {
            a[i].className="";
        }
        a[m].className="active";
        picList.style.transition="1s";
        picList.style.left = -n *16+"rem";
    },2000);
    picList.addEventListener("webkitTransitionEnd",function(){
        if(n>=aImg.length-1){
            picList.style.transition="none";
            picList.style.left=0;
            a[0].className="active";
            n=0;
        }
    })
}
