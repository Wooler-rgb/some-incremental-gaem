$(document).ready(function(){
    
    var coins = 0;
    var coinProduction = 1;
    var global_multi = 1;
    var coinGenPrice = [10, 100, 1500, 12500, 100000];
    var coinBuffPrice = [1000, 10000];
    var coinGenAmount = [1, 0, 0, 0, 0];
    var coinBuffAmount = [0, 0];
    var tickspeed = 50;
    var tickdiv = 20;
    var menu = "coin-gen";
    setInterval(function(){
        coins += coinProduction / tickdiv;
        changeStats();
    }, tickspeed); 
    $("#coin-gen-1").click(function(){
        coins -= coinGenPrice[0];
        coinGenAmount[0] += 1;
        coinGenPrice[0] *= 1.2;
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-2").click(function(){
        coins -= coinGenPrice[1];
        coinGenAmount[1] += 1;
        coinGenPrice[1] *= 1.25;
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-3").click(function(){
        coins -= coinGenPrice[2];
        coinGenAmount[2] += 1;
        coinGenPrice[2] *= 1.3;
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-4").click(function(){
        coins -= coinGenPrice[3];
        coinGenAmount[3] += 1;
        coinGenPrice[3] *= 1.35;
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-5").click(function(){
        coins -= coinGenPrice[4];
        coinGenAmount[4] += 1;
        coinGenPrice[4] *= 1.4;
        coinProduction = getProduction();
        changeStats();
    })
    $("#coffee").click(function(){
        coins -= coinBuffPrice[0];
        coinBuffAmount[0] += 1;
        coinBuffPrice[0] *= 2;
        global_multi *= 1.1;
        coinProduction = getProduction();
        changeStats();
    })
    $("#pickaxes").click(function(){
        coins -= coinBuffPrice[1];
        coinBuffAmount[1] += 1;
        coinBuffPrice[1] *= 10;
        global_multi *= 2;
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
        return (coinGenAmount[0] + (coinGenAmount[1] * 10) + (coinGenAmount[2] * 100) + (coinGenAmount[3] * 500) + (coinGenAmount[4] * 4000)) * global_multi;
    }
    function changeStats(){
        $("#coins").html(~~coins);
        $("#coin-gen-1-num").html("Slaves: " + coinGenAmount[0] + " ");
        $("#coin-gen-2-num").html("Staff: " + coinGenAmount[1] + " ");
        $("#coin-gen-3-num").html("Watchers: " + coinGenAmount[2] + " ");
        $("#coin-gen-4-num").html("Managers: " + coinGenAmount[3] + " ");
        $("#coin-gen-5-num").html("Overseers: " + coinGenAmount[4] + " ");
        $("#coffee-num").html("Coffee Machines: " + coinBuffAmount[0] + " ");
        $("#pickaxes-num").html("Pickaxes: " + coinBuffAmount[1] + " ");
        $("#coin-gen-1-cost").html("Cost: " + ~~coinGenPrice[0] + " coins");
        $("#coin-gen-2-cost").html("Cost: " + ~~coinGenPrice[1] + " coins");
        $("#coin-gen-3-cost").html("Cost: " + ~~coinGenPrice[2] + " coins");
        $("#coin-gen-4-cost").html("Cost: " + ~~coinGenPrice[3] + " coins");
        $("#coin-gen-5-cost").html("Cost: " + ~~coinGenPrice[4] + " coins");
        $("#coffee-cost").html("Cost: " + ~~coinBuffPrice[0] + " coins");
        $("#pickaxes-5-cost").html("Cost: " + ~~coinBuffPrice[1] + " coins");
        if(coins < coinGenPrice[0])
            disableBtn("coin-gen-1");
        else
            enableBtn("coin-gen-1");
        if(coins < coinGenPrice[1])
            disableBtn("coin-gen-2");
        else
            enableBtn("coin-gen-2");
        if(coins < coinGenPrice[2])
            disableBtn("coin-gen-3");
        else
            enableBtn("coin-gen-3");
        if(coins < coinGenPrice[3])
            disableBtn("coin-gen-4");
        else
            enableBtn("coin-gen-4");
        if(coins < coinGenPrice[4])
            disableBtn("coin-gen-5");
        else
            enableBtn("coin-gen-5");
        if(coins < coinBuffPrice[0])
            disableBtn("coffee");
        else
            enableBtn("coffee");
        if(coins < coinBuffPrice[1])
            disableBtn("pickaxes");
        else
            enableBtn("pickaxes");
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