
$(function(){
    var str="";
    var newText="";
    var i=0;
    $("#phone_num li").click(function(){
       str +=$(this).text();
       $("#text")[0].value=str;
    });
    $("#phone_num li").hover(function(){
       $(this).css({
           background:"green",
           color:"#fff"
       })
    },function(){
        $(this).css({
            background:"",
            color:"#000"
        })
    });
    $("#number").find("span").click(function(){
        var val=$("#text")[0].value;
        i=val.length;
        i--;
        newText=val.substring(0,i);
        $("#text")[0].value=newText;
        str=newText;
    })
    $("#return").click(function(){
        window.location = "Menu.html";
    })
})