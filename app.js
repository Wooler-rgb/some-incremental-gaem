$(document).ready(function(){
    
    var coins = 0;
    var coinProduction = 1;
    var coffee_mult = 1;
    var pick_mult = 1;
    var global_multi = 1;
    var coinGenPrice = [10, 100, 1500, 12500, 100000];
    var coinGenEff = [1, 10, 100, 500, 3000];
    var coinBuffPrice = [1000, 10000];
    var coinGenAmount = [1, 0, 0, 0, 0];
    var coinBuffAmount = [0, 0];
    var coinUpgPrice = [1e7, 1e8, 1e9, 1e10, 1e11];
    var coinUpg = [0, 0, 0, 0, 0];
    var coinUpgMult = [1, 1, 1, 15, 1];
    var tickspeed = 50;
    var tickdiv = 20;
    var menu = "coin-gen";
    setInterval(function(){
        GetCoinGenEff();
        coinProduction = getProduction();
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
        coinGenPrice[3] *= 1.4;
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-5").click(function(){
        coins -= coinGenPrice[4];
        coinGenAmount[4] += 1;
        coinGenPrice[4] *= 1.5;
        coinProduction = getProduction();
        changeStats();
    })
    $("#coffee").click(function(){
        coins -= coinBuffPrice[0];
        coinBuffAmount[0] += 1;
        coinBuffPrice[0] *= 2.5;
        coffee_mult *= 1.1;
        global_multi *= 1.1;
        coinProduction = getProduction();
        changeStats();
    })
    $("#pickaxes").click(function(){
        coins -= coinBuffPrice[1];
        coinBuffAmount[1] += 1;
        coinBuffPrice[1] *= 10;
        pick_mult *= 2;
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
    $("#cheat-1").click(function(){
        coins += 1e6;
    })
    $("#cheat-2").click(function(){
        coins += 1e9;
    })
    
    function getProduction(){
        return (coinGenAmount[0] * coinGenEff[0] + (coinGenAmount[1] * coinGenEff[1]) + (coinGenAmount[2] * coinGenEff[2]) + (coinGenAmount[3] * coinGenEff[3]) + (coinGenAmount[4] * coinGenEff[4])) * global_multi;
    }
    function changeStats(){
        $("#coins").html(round(coins) + "&nbsp&nbsp&nbsp&nbsp");
        $("#c-per-s").html(round(coinProduction) + " c/s");
        $("#coin-gen-1-num").html("Slaves: " + coinGenAmount[0] + " ");
        $("#coin-gen-2-num").html("Staff: " + coinGenAmount[1] + " ");
        $("#coin-gen-3-num").html("Watchers: " + coinGenAmount[2] + " ");
        $("#coin-gen-4-num").html("Managers: " + coinGenAmount[3] + " ");
        $("#coin-gen-5-num").html("Overseers: " + coinGenAmount[4] + " ");
        $("#coffee-num").html("Coffee Machines: " + coinBuffAmount[0] + " ");
        $("#pickaxes-num").html("Pickaxes: " + coinBuffAmount[1] + " ");
        $("#coin-gen-1-cost").html("Cost: " + round(coinGenPrice[0]) + " coins");
        $("#coin-gen-2-cost").html("Cost: " + round(coinGenPrice[1]) + " coins");
        $("#coin-gen-3-cost").html("Cost: " + round(coinGenPrice[2]) + " coins");
        $("#coin-gen-4-cost").html("Cost: " + round(coinGenPrice[3]) + " coins");
        $("#coin-gen-5-cost").html("Cost: " + round(coinGenPrice[4]) + " coins");
        $("#coffee-cost").html("Cost: " + round(coinBuffPrice[0]) + " coins");
        $("#pickaxes-cost").html("Cost: " + round(coinBuffPrice[1]) + " coins");
        $("#coin-gen-1-prod").html(" " + round(coinGenAmount[0] * coinGenEff[0] * global_multi) + " c/s (" + round(coinGenEff[0] * global_multi) + " c/s per slave)");
        $("#coin-gen-2-prod").html(" " + round(coinGenAmount[1] * coinGenEff[1] * global_multi) + " c/s (" + round(coinGenEff[1] * global_multi) + " c/s per staff)");
        $("#coin-gen-3-prod").html(" " + round(coinGenAmount[2] * coinGenEff[2] * global_multi) + " c/s (" + round(coinGenEff[2] * global_multi) + " c/s per watcher)");
        $("#coin-gen-4-prod").html(" " + round(coinGenAmount[3] * coinGenEff[3] * global_multi) + " c/s (" + round(coinGenEff[3] * global_multi) + " c/s per manager)");
        $("#coin-gen-5-prod").html(" " + round(coinGenAmount[4] * coinGenEff[4] * global_multi) + " c/s (" + round(coinGenEff[4] * global_multi) + " c/s per overseer)");
        $("#coffee-eff").html(" " + round(coffee_mult * 100) + "% Production, +10% per coffee machine");
        $("#pickaxes-eff").html(" " + pick_mult + "x Production, Pickaxe Power: 2x");
        $("#coin-upg-1-desc").html(" Cost: 1e+7. Slaves produce more coins based on coins. Currently: " + round(coinUpgMult[0]) + "x");
        $("#coin-upg-2-desc").html(" Cost: 1e+8. Staff produces more coins based on Staff. Currently: " + round(coinUpgMult[1]) + "x");
        $("#coin-upg-3-desc").html(" Cost: 1e+9. Watchers produce more coins based on every producer. Currently: " + round(coinUpgMult[2]) + "x");
        $("#coin-upg-4-desc").html(" Cost: 1e+10. Managers produce 200x coins. 2x coins/s as well! Currently: " + round(coinUpgMult[3]) + "x");
        $("#coin-upg-5-desc").html(" Cost: 1e+11. Overseers boost coin gain. Currently: " + round(coinUpgMult[4]) + "x");
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
        if(coins < coinUpgPrice[0] || coinUpg[0] == 1)
            disableBtn("coin-upg-1");
        else
            enableBtn("coin-upg-1");
        if(coins < coinUpgPrice[1] || coinUpg[1] == 1)
            disableBtn("coin-upg-2");
        else
            enableBtn("coin-upg-2");
        if(coins < coinUpgPrice[2] || coinUpg[2] == 1)
            disableBtn("coin-upg-3");
        else
            enableBtn("coin-upg-3");
        if(coins < coinUpgPrice[3] || coinUpg[3] == 1)
            disableBtn("coin-upg-4");
        else
            enableBtn("coin-upg-4");
        if(coins < coinUpgPrice[4] || coinUpg[4] == 1)
            disableBtn("coin-upg-5");
        else
            enableBtn("coin-upg-5");
        if(coins >= 1e12){
            alert("YOU WON!");
            Prestige();
        }
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
    function round(num){
        if(num <= 1e6){
            return Math.round(num);
        }
        else{
            return num.toExponential(2);
        }
    }
    function logx(x, num){
        return Math.log(num) / Math.log(x);
    }
    function GetCoinGenEff(){
        coinUpgMult[0] = 1 + (logx(1.4, coins + 1) * coinUpg[0]);
        coinUpgMult[1] = 1 + (coinGenAmount[1] / 2.5 * coinUpg[1]);
        coinUpgMult[2] = 1 + ((coinGenAmount[0] + coinGenAmount[1] +  + coinGenAmount[2] + coinGenAmount[3] + coinGenAmount[4] + 1) / 3 * coinUpg[2]);
        coinUpgMult[3] = 1 + 199 * coinUpg[3];
        coinUpgMult[4] = 1 + coinGenAmount[4] / 4 * coinUpg[4];
        coinGenEff[0] = coinUpgMult[0];
        coinGenEff[1] = coinUpgMult[1] * 10;
        coinGenEff[2] = coinUpgMult[2] * 100;
        coinGenEff[3] = coinUpgMult[3] * 500;
        global_multi = coffee_mult * pick_mult * coinUpgMult[4] * (1 + 1 * coinUpg[3]);
    }
    function Prestige(){
        coins = 0;
        coinProduction = 1;
        coffee_mult = 1;
        pick_mult = 1;
        global_multi = 1;
        coinGenPrice = [10, 100, 1500, 12500, 100000];
        coinGenEff = [1, 10, 100, 500, 3000];
        coinBuffPrice = [1000, 10000];
        coinGenAmount = [1, 0, 0, 0, 0];
        coinBuffAmount = [0, 0];
        coinUpgPrice = [1e7, 1e8, 1e9, 1e10, 1e11];
        coinUpg = [0, 0, 0, 0, 0];
        $("#coin-upg-1").css("background-color", "black");
        $("#coin-upg-2").css("background-color", "black");
        $("#coin-upg-3").css("background-color", "black");
        $("#coin-upg-4").css("background-color", "black");
        $("#coin-upg-5").css("background-color", "black");
    }
});