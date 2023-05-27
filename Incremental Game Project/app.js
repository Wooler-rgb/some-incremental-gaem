$(document).ready(function(){
    
    var coins = 0;
    var coinProduction = 1;
    var coinGen1Price = 10;
    var coinGen1Amount = 1;
    var tickspeed = 50;
    var tickdiv = 20;
    var menu = "coin-gen";
    setInterval(function(){
        coins += coinProduction / tickdiv;
        changeStats();
    }, tickspeed); 
    $("#coin-gen-1").click(function(){
        coins -= 10;
        coinGen1Amount += 1;
        coinProduction = getProduction();
        changeStats();
    })
    $("#upg").click(function(){
        menu = switchMenu("upgrades");
    })
    $("#gens").click(function(){
        menu = switchMenu("coin-gen");
    })
    function getProduction(){
        return coinGen1Amount;
    }
    function changeStats(){
        $("#coins").html(Math.round(coins));
        $("#coin-gen-1-num").html("Slaves: " + coinGen1Amount + " ");
        if(coins < 10)
            disableBtn("coin-gen-1");
        else
            enableBtn("coin-gen-1");
    }
    function switchMenu(fmenu){
        
        $("." + menu).css("display", "none");
        $("." + fmenu).css("display", "block");
        return fmenu;
    }
    function disableBtn(btn) {
        document.getElementById(btn).disabled = true;
    }
    function enableBtn(btn) {
        document.getElementById(btn).disabled = false;
    }
});