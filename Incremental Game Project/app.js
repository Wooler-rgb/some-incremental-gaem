$(document).ready(function(){
    
    var coins = 10;
    var coinProduction = 0;
    var coinGen1Price = 10;
    var coinGen1Amount = 0;
    var menu = "coin-gen";
    //function getProduction(){
        //return coinGen1Amount;
    //}
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
    function switchMenu(fmenu){
        
        $("." + menu).css("display", "none");
        $("." + fmenu).css("display", "block");
        return fmenu;
    }
});