function crash( obj1,obj2 ){
    var r = $(obj1).position().left;
    var u = $(obj1).position().left + $(obj1).innerWidth();
    var v = $(obj1).position().top;
    var x = $(obj1).position().top + $(obj1).innerHeight();
    var q = $(obj2).position().left;
    var s = $(obj2).position().left +$(obj2).innerWidth();
    var t = $(obj2).position().top;
    var w = $(obj2).position().top +$(obj2).innerHeight();
    if( r < s && u >q && v < w && x > t){
        return true
    }else{
        return false
    }
}
function space(move, div) {
    var X = move.offset().left - div.offset().left;
    var Y = move.offset().top - div.offset().top;
    return Math.round(Math.sqrt(X * X + Y * Y))
}
$(function(){
    var arrApp = ["Mail.html","Clock.html","Calendar.html","Game.html","Music.html","Photos.html","QQ.html","Settings.html","Video.html","Phone.html","Safari.html","Store.html"];
    var aLi=$("#appList li");
    var appList=$("#appList");
    $("#return").click(function(){
        window.location = "index.html";
    })
    aLi.each(function(index,item){
        $(this).css("position","absolute");
        $(this).animate({
            left:index%4*60,
            top:Math.floor(index/4)*85
        },500);
    });
    aLi.each(function(index,item){
        $(this).dblclick(function(){
            event.preventDefault();
            $("#bottom").fadeOut("slow");
            appList.fadeOut("slow", function(){
                window.location = arrApp[index];
            });
        })
    });
    var zIndex=1;
    appList.bind("mousedown",function(ev){
        var target=ev.target;
        zIndex++;
        if( target.nodeName === "LI" || target.nodeName === "IMG" && (target = target.parentNode.parentNode) ){
            $(target).css({
                zIndex:zIndex
            });
            var L=$(target).position().left;
            var T=$(target).position().top;
            var x = ev.clientX-$(target).position().left;
            var y = ev.clientY-$(target).position().top;
            var obj ={},max = +Infinity,k = 0;
            $(document).bind("mousemove", function (ev) {
                max = +Infinity;
                k = 0;
                $(target).css({
                    left:ev.clientX-x,
                    top:ev.clientY-y
                });
                aLi.each(function(index,item){
                    $(this).css({
                        border:"none",
                        margin:0
                    });
                    if(crash($(target),$(this))){
                        if( this !== target){
                            obj[index]=item;
                            for(var attr in obj){
                                var S = space($(target), $(obj[attr]));
                                if(max>S){
                                    max=S;
                                    k=attr;
                                }
                            }
                        }
                    }
                });
                $(obj[k]).css({
                    border:'2px solid red',
                    margin:-2
                });
                if( ev.preventDefault ){
                    ev.preventDefault();
                }
            })
            $(document).bind("mouseup", function (ev) {
                $(document).unbind("mouseup mousemove");
                if(obj[k]){
                    $(target).animate({
                        left:$(obj[k]).position().left,
                        top:$(obj[k]).position().top
                    });
                    $(obj[k]).animate({
                        left:L,
                        top:T
                    }).css({
                        border:0,
                        margin:0
                    });
                    obj[k].index = [target.index,target.index = obj[k].index][0];
                }else {
                    $(target).animate({
                        left:L,
                        top:T
                    })
                }
            })
        }
    })
})