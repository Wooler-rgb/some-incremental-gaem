$(document).ready(function(){
    
    var coins = 10;
    var coinProduction = 10;
    var coinGen1Price = 10;
    var coinGen1Amount = 0;
    var tickspeed = 50;
    var tickdiv = 20;
    var menu = "coin-gen";
    //function getProduction(){
        //return coinGen1Amount;
    //}
    setInterval(function(){
        coins += coinProduction / tickdiv;
        changeStats();
    }, tickspeed); 
    $("#coin-gen-1").click(function(){
        coinGen1Amount += 1;
        coinProduction = getProduction();
    })
    $("#upg").click(function(){
        menu = switchMenu("upgrades");
    })
    $("#gens").click(function(){
        menu = switchMenu("coin-gen");
    })
    function changeStats(){
        $("#coins").html(Math.round(coins));

    }
    function switchMenu(fmenu){
        
        $("." + menu).css("display", "none");
        $("." + fmenu).css("display", "block");
        return fmenu;
    }
});