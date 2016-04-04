/**
 * Created by cuikaidao on 2016/3/31.
 */
window.onload=function(){
    var picList=$("#list");
    var aImg=$("img",picList);
    var n=0;
    var aPic=["images/bj1.jpg","images/bj2.jpg","images/bj3.jpg","images/bj4.jpg","images/bj5.jpg"];
    var timer=null;
    var list=document.getElementById("picList");
    var aLi=list.getElementsByTagName("li");
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].style.left=i*94+"px";
        aLi[i].style.top=0
    }
    play();
    var m=0;
    function play(){
        timer=setInterval(function(){
            n++;
            if(n>aPic.length-1){
                n=0;
            }
            if(m>aLi.length-1){
                m=0
            }
            aImg[1].src=aPic[n];
            aLi[m].className="";
            aLi[n].className="active";
            m++;
            doMove(picList,"left",-980,35,function(){
                picList.style.left=0;
                aImg[0].src=aImg[1].src;
            });
        },2500);
    }
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index=i;
        aLi[i].onmouseover=function(){
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].className="";
            }
            this.className="active";
            clearInterval(timer);
            aImg[0].src=aPic[this.index]
        }
        aLi[i].onmouseout=function(){
            n=this.index;
            m=this.index;
            play();
        }
    }
    var leftBtn=document.getElementById("left-btn");
    var rightBtn=document.getElementById("right_btn");
    leftBtn.onmouseover=function(){
        clearInterval(timer);
    };
    leftBtn.onmouseover=function(){
        play();
    };
    rightBtn.onmouseover=function(){
        clearInterval(timer);
    };
    rightBtn.onmouseout=function(){
        play();
    };
    leftBtn.onclick=function(){
        n--;
        m--;
        if(n<0){
            n=aPic.length-1
        }
        if(m<0){
            m=aLi.length-1
        }
        for (var j = 0; j < aLi.length; j++) {
            aLi[j].className="";
        }
        aLi[m].className="active";
        aImg[0].src=aPic[n]
    }
    rightBtn.onclick=function(){
        n++;
        m++;
        if(n>aPic.length-1){
            n=0
        }
        if(m>aLi.length-1){
            m=0
        }
        for (var j = 0; j < aLi.length; j++) {
            aLi[j].className="";
        }
        aLi[m].className="active";
        aImg[0].src=aPic[n]
    }
}
