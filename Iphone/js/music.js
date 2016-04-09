function changeTime(iNum) {
    iNum = parseInt(iNum);
    var iM = zero(Math.floor(iNum % 3600 / 60));
    var iS = zero(Math.floor(iNum % 60));
    return iM + ':' + iS;
}
function nowTime(){
    var aImg=["images/play_btn.png","images/pause.png"];
    $(".play-time").html(changeTime(mp3.currentTime)) ;
    var scale = mp3.currentTime/mp3.duration;
    $(".course i").css("left", scale * 133 );
    if(mp3.ended){
        $(".logo").css("animationPlayState","paused");
        $(".play-time").html("00:00");
        $(".play").data("onOff",false).children()[0].src=aImg[1];
        $(".course i").css("left",0);
    }
}
(function ($) {
    $.fn.drag = function (options) {
        var newOption = $.extend({}, options);
        newOption.target=newOption.target || this
        newOption.min = newOption.min || -Infinity;
        newOption.max = newOption.max || +Infinity;
        this.bind("mousedown", function (ev) {
            var x = ev.clientX - newOption.target.position().left;
            $(document).bind("mousemove", function (ev) {
                var l = ev.clientX - x;
                if(l<newOption.min){
                    l=newOption.min
                }
                if(l>newOption.max){
                    l=newOption.max
                }
                newOption.target.css({
                    left: l
                })
                var scale = l/newOption.max
                if(newOption.volume ){
                    mp3.volume =scale
                }else {
                    mp3.currentTime = scale * mp3.duration;
                    nowTime();
                }
                return false;
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
    aImg=["images/play_btn.png","images/pause.png"];
    var timer=null;
    var mp3= $("#mp3")[0]
    $(".play").data("onOff",true).click(function(){
        if($(this).data("onOff")){
            mp3.pause();
            clearInterval(timer);
            $(".logo").css("animationPlayState","paused");
            $(this).children()[0].src=aImg[1];
            $(this).data("onOff",false);
        }else {
            mp3.play();
            nowTime();
            timer = setInterval(nowTime,1000);
            $(".logo").css("animationPlayState","running");
            $(this).children()[0].src=aImg[0];
            $(this).data("onOff",true);
        }
    })
    $("#music-list li").click(function(){
        if(mp3.paused){
            mp3.play();
            nowTime();
            timer = setInterval(nowTime,1000);
        }
        $("#play").css("left",0);
        $(".logo img")[0].src=arrPic[$(this).index()];
    })
    $(".course i").drag({
        min:1,
        max:133
    });
    $(".volume i").drag({
        min:10,
        max:172,
        volume :true
    });
    $("#return").click(function(){
        window.location = "Menu.html";
    })
})