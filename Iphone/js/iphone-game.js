/**
 * Created by cuikaidao on 2016/3/13.
 */
function Games(){
    this.t=0;
    this.n=1;
    this.ico=$("#icon");
    this.box=$("#box");
    this.aBtn=$("input");
    this.aP=$("p",$("#mark"));
    this.onOff=true;
}
Games.prototype.random=function(obj){
    this.r = Math.round(Math.random()*10) + 1;
    this.ico.innerHTML = '<img src="images/' + this.r + '.png">';
    this.l=Math.floor(Math.random() * 212);
    obj.style.left = this.l + "px";
};
Games.prototype.watchScore = function (){
    if( this.n >10 ){
        alert( "你赢了" );
        this.reset();
        return false;
    }
    if( this.t >=5 ){
        alert( "你输了" );
        this.reset();
        return false;
    }
    return true;
};
Games.prototype.icoDrop=function(obj){
    var _this=this;
    this.aBtn[0].style.color="red";
    this.ico.style.display = "block";
    this.aBtn[0].disabled = true;
    if(!obj.isStop){
        this.random(obj);
    }
    if(_this.watchScore()){
        doMove(obj,"top",230,this.n,function(){
            _this.t++;
            shake(_this.box,"top",15,function(){
                _this.ico.style.top=-25+"px";
                _this.icoDrop(_this.ico);
            });
            _this.aP[1].innerHTML = "失分：" + _this.t + " 分";
        });
    }
};
Games.prototype.reset=function(){
    this.aBtn[0].style.color="blue";
    this.aP[0].innerHTML = "得分：0 分";
    this.aP[1].innerHTML = "失分：0 分";
    this.aBtn[0].disabled = false;
    this.onOff=true;
    this.n = 1;
    this.t = 0;
};
Games.prototype.icoShake=function(obj){
    if(this.onOff==false)return;
    var _this=this;
    clearInterval(obj.timer);
    this.onOff=false;
    obj.timer = null;
    this.ico.innerHTML = '<img src="images/bad.png">';
    shake(obj,"left",10,function(){
        obj.isStop=false;
        _this.ico.style.top=-25+"px";
        _this.icoDrop(obj);
        _this.onOff=true;

    });
    this.aP[0].innerHTML = "得分：" + this.n + " 分";
    this.n++;
};
Games.prototype.suspend=function(obj){
    clearInterval(obj.timer);
    this.aBtn[0].style.color="blue";
    obj.timer = null;
    this.aBtn[0].disabled = false;
    obj.isStop=true;
    this.onOff=true;
};
window.onload=function(){
    var aBtn=$("input");
    var games = new Games();
    var oIco=$("#icon");
    var back=$("#return");
    aBtn[0].onclick=function(){
        games.icoDrop(oIco)
    };
    oIco.onmousedown=function(){
        games.icoShake(oIco);
    };
    aBtn[1].onclick=function(){
        games.suspend(oIco);
    }
    back.onclick=function(){
        window.location = "Menu.html";
    }
}