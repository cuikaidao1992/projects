/**
 * Created by cuikaidao on 2016/3/26.
 */
window.onload = function () {
    function play(){
        var aImg=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg"];
        var oList=document.getElementById("list");
        var iNub=0;
        var iNow=0;
        var iZindex=aImg.length;
        var aLi=oList.children;
        var p=document.getElementsByTagName("p")[0];
        var t=0;
        function start(){
            var str="";
            for(var i=0;i<aImg.length;i++){
                str+="<li style='background-image:url("+aImg[i]+");z-index:"+(aImg.length-i)+"'></li>";
            }
            oList.innerHTML=str;
            for(var i=0;i<aLi.length;i++){
                var iDeg=parseInt(Math.random()*100)%3+i*4;
                aLi[i].iDeg=iDeg;
                aLi[i].style.WebkitTransform="rotate("+iDeg+"deg) scale(1.5)";
            }
            var timer=setInterval(function(){
                t++;
                if(t==aImg.length){
                    clearInterval(timer)
                }
                p.innerHTML=t+"/"+aImg.length;
            },350);
            setTimeout(function(){
                show();
            },100);
        }
        function show(){
            $("#list li").each(function(index,item){
                $(this).css({
                    transition:".5s "+($("#list li").length-index)*300+"ms",
                    WebkitTransform:"rotate("+$("#list li")[index].iDeg+"deg) scale(1)",
                    opacity:1
                })
            });
        }
        function end(){
            var _this=this;
            this.removeEventListener("webkitTransitionEnd",end,false);
            this.style.transition="none";
            this.style.WebkitTransform="rotate("+this.iDeg+"deg) scale(1.2)";
            iZindex++;
            _this.style.zIndex=iZindex;
            console.log( iZindex%4+1)
            setTimeout(function(){
                _this.style.transition="0.6s";
                _this.style.top=0;
                _this.style.opacity=1;
                _this.style.WebkitTransform="rotate("+_this.iDeg+"deg) scale(1)";
            },50);
        }
        for(var i=0;i<aImg.length;i++) {
            var oImg = new Image();
            oImg.src = aImg[i];
            oImg.onload = function () {
                iNub++;
                if (iNub == aImg.length) {
                    start();
                }
            };
        }
        $(".wrap a").eq(0).click(function(){
            iNow--;
            if(iNow<0){
                iNow=aLi.length-1;
            }
            $("#list li")[iNow].addEventListener("webkitTransitionEnd",end,false);
            $("#list li").eq(iNow).css({
                transition:"1s",
                top:"-140px",
                opacity:0
            });
            $("p")[0].innerHTML=iNow+1+"/"+aImg.length;
        })
        $(".wrap a").eq(1).click(function(){
            iNow++;
            if(iNow>aLi.length-1){
                iNow=0;
            }
            $("#list li")[iNow].addEventListener("webkitTransitionEnd",end,false)
            $("#list li").eq(iNow).css({
                transition:"1s",
                top:"140px",
                opacity:0
            });
            $("p")[0].innerHTML=iNow+1+"/"+aImg.length;
        })
    }
    function fn(){
        $(".pic_list li").bind("click",function(){
            $(".wrap").css("display","none").eq(1).css("display","block");
            play()
        })
    }
    fn()
    function e(move, div) {
        var X = move.offset().left - div.offset().left;
        var Y = move.offset().top - div.offset().top;
        return Math.round(Math.sqrt(X * X + Y * Y))
    }
    $(function(){
        var aLi=$("#wrap li");
        aLi.each(function(index,item){
            $(this).animate({
                left:index%3*74,
                top:Math.floor(index/3)*58
            })
        })
    })
    $("#return").click(function(){
        window.location = "Menu.html";
    })

}