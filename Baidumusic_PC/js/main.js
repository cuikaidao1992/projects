window.onload=function(){
    var controlLeft=document.getElementById("controlL");
    var controlRight=document.getElementById("controlR");
    var picList=$("#list");
    var aImg=$("img",picList);
    var page=$("#page");
    var allA=page.getElementsByTagName("a");
    var n=0;
    var aPic=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg","images/7.jpg"];
    var timer=null;
    play();
    function play(){
        timer=setInterval(function(){
            n++;
            if(n>aPic.length-1){
                n=0;
            }
            aImg[1].src=aPic[n];
            doMove(picList,"left",-580,30,function(){
                picList.style.left=0;
                aImg[0].src=aImg[1].src;
            });
            for (var j = 0; j < allA.length; j++) {
                allA[j].className="next bg"
            }
            allA[n].className="page_on bg";
        },3000);
    }
    controlLeft.onmousemove=function(){
        clearInterval(timer)
    };
    controlLeft.onmouseout=function(){
        play()
    };
    controlRight.onmouseover=function(){
        clearInterval(timer)
    };
    controlRight.onmouseout=function(){
        play()
    };
    controlLeft.onclick=function(){
        n--;
        if(n<0){
            n=aPic.length-1
        }
        aImg[0].src=aPic[n];
        for (var j = 0; j < allA.length; j++) {
            allA[j].className="next bg"
        }
        allA[n].className="page_on bg";
    };
    controlRight.onclick=function(){
        n++;
        if(n>aPic.length-1){
            n=0
        }
        aImg[0].src=aPic[n];
        for (var j = 0; j < allA.length; j++) {
            allA[j].className="next bg"
        }
        allA[n].className="page_on bg";
    };
    for (var i = 0; i < allA.length; i++) {
        allA[i].index=i;
        allA[i].onclick=function(){
            for (var j = 0; j < allA.length; j++) {
                allA[j].className="next bg"
            }
            this.className="page_on bg";
            aImg[0].src=aPic[this.index];
            n=this.index
        }
        allA[i].onmousemove=function(){
            clearInterval(timer);
            for (var j = 0; j < allA.length; j++) {
                allA[j].className="next bg"
            }
            this.className="page_on bg";
            aImg[0].src=aPic[this.index];
            n=this.index
        }
        allA[i].onmouseout=function(){
            play()
        }
    }
}