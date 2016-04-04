/**
 * Created by cuikaidao on 2016/3/26.
 */
(function ($) {
    $.fn.drag = function (options) {
        var newOption = $.extend({}, options);
        newOption.target = newOption.target || this;
        this.bind("mousedown", function (ev) {
            var x = ev.clientX - newOption.target.offset().left;
            $(document).bind("mousemove", function (ev) {
                console.log(ev.clientX,x)
                var l = ev.clientX - x-568;
                if(l<10){
                    l=10
                }
                if(l>173){
                    l=173
                }
                newOption.target.css({
                    left: l
                })
            });
            $(document).bind("mouseup", function (ev) {
                $(this).unbind("mouseup mousemove")
            })
        })
    }
})(jQuery);
function zero(n){
    return n<10? "0"+n : n
}
$(function(){
    var arrPic=["images/tfboy.png","images/baiwei.png","images/mingfei.png","images/qingchun.png","images/iamsinger.png"]
    var aImg=["images/play_btn.png","images/pause.png"];
    var i;
    var j;
    var n;
    var timer=null;
    $(".play").data("onOff",true).click(function(){
        if($(this).data("onOff")){
            $(".logo").css("animationPlayState","paused");
            $(this).children()[0].src=aImg[1];
            $(this).data("onOff",false);
            clearInterval(timer);
            timer=null;
        }else {
            $(".logo").css("animationPlayState","running");
            $(this).children()[0].src=aImg[0];
            $(this).data("onOff",true);
            move()
        }
    })
    $("#music-list li").click(function(){
        i=0;
        j=44;
        n=0;
        $("#play").css("left",0);
        $(".logo img")[0].src=arrPic[$(this).index()];
        move()
    })
    $(".volume i").drag();
    function move(){
        if(timer)return
        timer=setInterval(function(){
            i++;
            j++;
            if(i==60){
                n++;
                i=0;
            }
            if(j>150){
                clearInterval(timer);
            }
            $(".course i").css("left",j);
            $(".play-time")[0].innerHTML=n+":"+zero(i);
        },1000)
    }
    $("#return").click(function(){
        window.location = "Menu.html";
    })

})