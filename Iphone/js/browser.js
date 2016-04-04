/**
 * Created by cuikaidao on 2016/3/29.
 */
function init(data){
    var s = data.s;
    var str = '';
    for( var i = 0; i < s.length; i++ ){
        str += '<li><a target="_blank" href="https://www.baidu.com/s?wd='+s[i]+'">'+s[i]+'</a></li>'
    }
    search_list.innerHTML = str;
    var aLi=search_list.getElementsByTagName("li");
    var aA=search_list.getElementsByTagName("a");
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index=i;
        aLi[i].onclick=function(){
            search_list.style.display="none";
            search_text.value="";
            search_text.value=aA[this.index].innerHTML;
        }
    }
};
window.onload = function(){
    var search_list=document.getElementById("search_list");
    var search_text=document.getElementById("search_text");
    var back = document.getElementById("return");
    search_text.onfocus=function(){
        search_list.style.display="block";
        search_text.value="";
    };
    search_text.oninput = function (){
        var customScript = document.getElementById("customScript");
        if( customScript ){
            document.body.removeChild(customScript);
        }
        var script = document.createElement('script');
        script.id = "customScript";
        script.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+this.value+'&cb=init';
        document.body.appendChild(script);
    };
    btn.onclick=function(){
        search_text.value="";
        search_list.style.display="none"
    };

    back.onclick=function(){
        window.location = "Menu.html";
    }
};