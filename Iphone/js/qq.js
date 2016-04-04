/**
 * Created by cuikaidao on 2016/3/19.
 */
window.onload=function(){
    var aH3=$("h3");
    var aLi=$(".list ul li");
    for (var i = 0; i < aH3.length; i++) {
        aH3[i].onOff=true;
        aH3[i].onclick = function(){
            if(this.onOff){
                this.nextElementSibling.style.display="block";
                $(this).children().eq(0).css({
                    transform: "rotate(90deg)"
                })
                this.onOff=false;
            }else {
                this.nextElementSibling.style.display="none";
                $(this).children().eq(0).css({
                    transform: "rotate(0deg)"
                })
                this.onOff=true;
            }
        }
    }
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].onclick=function(){
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].className="";
            }
            this.className="active";
        }
    }
    var aDiv=$("#tab div");
    var aSpan=aDiv.find("span");
    var tab=$("#type > div");
    aDiv.click(function(){
        tab.hide().eq($(this).index()).show();
        aSpan.removeClass("active").eq($(this).index()).addClass("active")
    })
    $("#return").click(function(){
        window.location = "Menu.html";
    })
}

