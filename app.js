$(document).ready(function(){
    
    var coins = 0;
    var coinProduction = 1;
    var coffee_mult = 1;
    var pick_mult = 1;
    var global_multi = 1;
    var coinGenPrice = [10, 100, 1500, 12500, 100000];
    var coinGenEff = [1, 10, 100, 500, 3000];
    var coinGenExpo = [1.2, 1.25, 1.3, 1.4, 1.5];
    var coinGenSoft = [120, 90, 60, 40, 30];
    var coinBuffExpo = [2.5, 10];
    var coinBuffSoft = [24, 8];
    var expoGrowth = 1.02;
    var coinBuffPrice = [1000, 10000];
    var coinGenAmount = [1, 0, 0, 0, 0];
    var coinGenAmountFree = [0, 0, 0, 0, 0];
    var coinBuffAmount = [0, 0];
    var coinBuffAmountFree = [0, 0];
    var coinBuffEff = [1.1, 2];
    var coinUpgPrice = [1e7, 1e8, 1e9, 1e10, 1e11];
    var GoldUpgPrice = [10, 350, 1666, 200, 999, 2000];
    var coinUpg = [0, 0, 0, 0, 0];
    var GoldUpg = [0, 0, 0, 0, 0, 0];
    var furnaceUpgAmount = [0, 0, 0, 0];
    var furnaceUpgPrice = [1, 10, 20, 5];
    var coinUpgMult = [1, 1, 1, 15, 1];
    var tickspeed = 50;
    var tickdiv = 20;
    var menu = "coin-gen";
    var gold_ore = 0;
    var ingot = 0;
    var isFurnaceActive = 0;
    var conv_eff = 0.1;
    var didPrestige = false;
    var furnaceBonus = 1;
    var furnaceBonusEff = 5;
    var ingotUpgBoost = 1;
    var ore_gain = 0;
    var furnaceSpeed = 1;
    setInterval(function(){
        GetCoinGenEff();
        coinProduction = getProduction();
        coins += coinProduction / tickdiv;
        if(GoldUpg[5]){
            ore_gain = Math.pow(coins, 0.2);
        }
        else{
            ore_gain = Math.pow(coins, 0.2) / 2.5;
        }
        if(gold_ore < 0){
            gold_ore = 0;
        }
        if(isFurnaceActive && gold_ore > 0){
            gold_ore -= 1 / tickdiv * furnaceSpeed;
            ingot += (1 / tickdiv) * conv_eff * furnaceSpeed;
        }
        changeStats();
    }, tickspeed); 
    $("#coin-gen-1").click(function(){
        coins -= coinGenPrice[0];
        coinGenAmount[0] += 1;
        coinGenPrice[0] *= coinGenExpo[0];
        if(coinGenAmount[0] > coinGenSoft[0]){
            coinGenExpo[0] *= expoGrowth;
        }
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-2").click(function(){
        coins -= coinGenPrice[1];
        coinGenAmount[1] += 1;
        coinGenPrice[1] *= coinGenExpo[1];
        if(coinGenAmount[1] > coinGenSoft[1]){
            coinGenExpo[1] *= expoGrowth;
        }
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-3").click(function(){
        coins -= coinGenPrice[2];
        coinGenAmount[2] += 1;
        coinGenPrice[2] *= coinGenExpo[2];
        if(coinGenAmount[2] > coinGenSoft[2]){
            coinGenExpo[2] *= expoGrowth;
        }
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-4").click(function(){
        coins -= coinGenPrice[3];
        coinGenAmount[3] += 1;
        coinGenPrice[3] *= coinGenExpo[3];
        if(coinGenAmount[3] > coinGenSoft[3]){
            coinGenExpo[3] *= expoGrowth;
        }
        coinProduction = getProduction();
        changeStats();
    })
    $("#coin-gen-5").click(function(){
        coins -= coinGenPrice[4];
        coinGenAmount[4] += 1;
        coinGenPrice[4] *= coinGenExpo[4];
        if(coinGenAmount[4] > coinGenSoft[4]){
            coinGenExpo[4] *= expoGrowth;
        }
        coinProduction = getProduction();
        changeStats();
    })
    $("#coffee").click(function(){
        coins -= coinBuffPrice[0];
        coinBuffAmount[0] += 1;
        coinBuffPrice[0] *= coinBuffExpo[0];
        if(coinBuffAmount[0] > coinBuffSoft[0]){
            coinBuffExpo[0] *= expoGrowth;
        }
        coinProduction = getProduction();
        changeStats();
    })
    $("#pickaxes").click(function(){
        coins -= coinBuffPrice[1];
        coinBuffAmount[1] += 1;
        coinBuffPrice[1] *= coinBuffExpo[1];
        if(coinBuffAmount[1] > coinBuffSoft[1]){
            coinBuffExpo[1] *= expoGrowth;
        }
        coinProduction = getProduction();
        changeStats();
    })
    $("#upg").click(function(){
        menu = switchMenu("upgrades");
    })
    $("#gens").click(function(){
        menu = switchMenu("coin-gen");
    })
    $("#prs").click(function(){
        menu = switchMenu("prestige");
    })
    $("#furnace-menu").click(function(){
        menu = switchMenu("furnace");
    })
    $("#gold-upg").click(function(){
        menu = switchMenu("gold-upgrades");
    })
    $("#cheat-1").click(function(){
        coins += 1e6;
    })
    $("#cheat-2").click(function(){
        coins += 1e9;
    })
    $("#cheat-3").click(function(){
        coins += 1e12;
    })
    $("#cheat-4").click(function(){
        gold_ore += 1;
    })
    $("#cheat-5").click(function(){
        gold_ore += 1000;
    })
    $("#coin-upg-1").click(function(){
        $("#coin-upg-1").css("background-color", "green");
        coins -= coinUpgPrice[0];
        coinUpg[0] += 1;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#coin-upg-2").click(function(){
        $("#coin-upg-2").css("background-color", "green");
        coins -= coinUpgPrice[1];
        coinUpg[1] += 1;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#coin-upg-3").click(function(){
        $("#coin-upg-3").css("background-color", "green");
        coins -= coinUpgPrice[2];
        coinUpg[2] += 1;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#coin-upg-4").click(function(){
        $("#coin-upg-4").css("background-color", "green");
        coins -= coinUpgPrice[3];
        coinUpg[3] += 1;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#coin-upg-5").click(function(){
        $("#coin-upg-5").css("background-color", "green");
        coins -= coinUpgPrice[4];
        coinUpg[4] += 1;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#furnace-upg-1").click(function(){
        ingot -= furnaceUpgPrice[0];
        furnaceUpgAmount[0] += 1;
        conv_eff += 0.01;
        furnaceUpgPrice[0] *= 1.5;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#furnace-upg-2").click(function(){
        ingot -= furnaceUpgPrice[1];
        furnaceUpgAmount[1] += 1;
        furnaceBonusEff += 1;
        furnaceUpgPrice[1] *= 2;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#furnace-upg-3").click(function(){
        ingot -= furnaceUpgPrice[2];
        furnaceUpgAmount[2] += 1;
        furnaceSpeed *= 2;
        furnaceUpgPrice[2] *= 2.5;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#furnace-upg-4").click(function(){
        ingot -= furnaceUpgPrice[3];
        furnaceUpgAmount[3] += 1;
        coinBuffEff[0] += 0.001;
        coinBuffAmountFree[0] += 1;
        furnaceUpgPrice[3] *= 2;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#headstart-upg-1").click(function(){
        $("#headstart-upg-1").css("background-color", "green");
        gold_ore -= GoldUpgPrice[0];
        GoldUpg[0] += 1;
        coins += 10000;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#headstart-upg-2").click(function(){
        $("#headstart-upg-2").css("background-color", "green");
        gold_ore -= GoldUpgPrice[1];
        GoldUpg[1] += 1;
        coinGenAmountFree[4] += 1;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#headstart-upg-3").click(function(){
        $("#headstart-upg-3").css("background-color", "green");
        gold_ore -= GoldUpgPrice[2];
        GoldUpg[2] += 1;
        coinBuffAmountFree[0] += 1;
        coinBuffAmountFree[1] += 1;
        coinUpg[0] = 1;
        $("#coin-upg-1").css("background-color", "green");
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#lategame-upg-1").click(function(){
        $("#lategame-upg-1").css("background-color", "green");
        gold_ore -= GoldUpgPrice[3];
        GoldUpg[3] += 1;
        epxoGrowth = 1.01;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#lategame-upg-2").click(function(){
        $("#lategame-upg-2").css("background-color", "green");
        gold_ore -= GoldUpgPrice[4];
        GoldUpg[4] += 1;
        coinGenSoft[0] *= 1.2;
        coinGenSoft[1] *= 1.2;
        coinGenSoft[2] *= 1.2;
        coinGenSoft[3] *= 1.2;
        coinGenSoft[4] *= 1.2;
        coinBuffSoft[0] *= 1.2;
        coinBuffSoft[1] *= 1.2;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#lategame-upg-3").click(function(){
        $("#lategame-upg-3").css("background-color", "green");
        gold_ore -= GoldUpgPrice[5];
        GoldUpg[5] += 1;
        epxoGrowth = 1.008;
        coinProduction = getProduction();
        changeStats();
    }) 
    $("#prestige-btn").click(function(){
        Prestige();
    })
    $("#furnace-active").click(function(){
        isFurnaceActive = FurnaceSwitch(isFurnaceActive);
    })
    function getProduction(){
        return ((coinGenAmount[0] + coinGenAmountFree[0]) * coinGenEff[0] + ((coinGenAmount[1] + coinGenAmountFree[1]) * coinGenEff[1]) + ((coinGenAmount[2] + coinGenAmountFree[2]) * coinGenEff[2]) + ((coinGenAmount[3] + coinGenAmountFree[3]) * coinGenEff[3]) + ((coinGenAmount[4] + coinGenAmountFree[4]) * coinGenEff[4])) * global_multi;
    }
    function changeStats(){
        $("#coins").html(round(coins) + "&nbsp&nbsp&nbsp&nbsp");
        $("#c-per-s").html(round(coinProduction) + " c/s");
        $("#gold-ore").html(round(gold_ore) + "&nbsp&nbsp&nbsp&nbsp");
        $("#ingot").html(round(ingot) + "&nbsp&nbsp&nbsp&nbsp");
        $("#coin-gen-1-num").html("Slaves: " + coinGenAmount[0] + " (+" + coinGenAmountFree[0] + ")");
        $("#coin-gen-2-num").html("Staff: " + coinGenAmount[1] + " (+" + coinGenAmountFree[1] + ")");
        $("#coin-gen-3-num").html("Watchers: " + coinGenAmount[2] + " (+" + coinGenAmountFree[2] + ")");
        $("#coin-gen-4-num").html("Managers: " + coinGenAmount[3] + " (+" + coinGenAmountFree[3] + ")");
        $("#coin-gen-5-num").html("Overseers: " + coinGenAmount[4] + " (+" + coinGenAmountFree[4] + ")");
        $("#coffee-num").html("Coffee Machines: " + coinBuffAmount[0] + " (+" + coinBuffAmountFree[0] + ")");
        $("#pickaxes-num").html("Pickaxes: " + coinBuffAmount[1] + " (+" + coinBuffAmountFree[1] + ")");
        $("#coin-gen-1-cost").html("Cost: " + round(coinGenPrice[0]) + " coins");
        $("#coin-gen-2-cost").html("Cost: " + round(coinGenPrice[1]) + " coins");
        $("#coin-gen-3-cost").html("Cost: " + round(coinGenPrice[2]) + " coins");
        $("#coin-gen-4-cost").html("Cost: " + round(coinGenPrice[3]) + " coins");
        $("#coin-gen-5-cost").html("Cost: " + round(coinGenPrice[4]) + " coins");
        $("#coffee-cost").html("Cost: " + round(coinBuffPrice[0]) + " coins");
        $("#pickaxes-cost").html("Cost: " + round(coinBuffPrice[1]) + " coins");
        $("#furnace-upg-1-cost").html("Cost: " + round(furnaceUpgPrice[0]) + " ingots");
        $("#furnace-upg-2-cost").html("Cost: " + round(furnaceUpgPrice[1]) + " ingots");
        $("#furnace-upg-3-cost").html("Cost: " + round(furnaceUpgPrice[2]) + " ingots");
        $("#furnace-upg-4-cost").html("Cost: " + round(furnaceUpgPrice[3]) + " ingots");
        $("#furnace-upg-1-amount").html("Efficient smelter: " + round(furnaceUpgAmount[0]));
        $("#furnace-upg-2-amount").html("Hotter fuel: " + round(furnaceUpgAmount[1]));
        $("#furnace-upg-3-amount").html("Faster furnace: " + round(furnaceUpgAmount[2]));
        $("#furnace-upg-4-amount").html("Polished coffee: " + round(furnaceUpgAmount[3]));
        $("#coin-gen-1-prod").html(" " + round((coinGenAmount[0] + coinGenAmountFree[0]) * coinGenEff[0] * global_multi) + " c/s (" + round(coinGenEff[0] * global_multi) + " c/s per slave)");
        $("#coin-gen-2-prod").html(" " + round((coinGenAmount[1] + coinGenAmountFree[1]) * coinGenEff[1] * global_multi) + " c/s (" + round(coinGenEff[1] * global_multi) + " c/s per staff)");
        $("#coin-gen-3-prod").html(" " + round((coinGenAmount[2] + coinGenAmountFree[2]) * coinGenEff[2] * global_multi) + " c/s (" + round(coinGenEff[2] * global_multi) + " c/s per watcher)");
        $("#coin-gen-4-prod").html(" " + round((coinGenAmount[3] + coinGenAmountFree[3]) * coinGenEff[3] * global_multi) + " c/s (" + round(coinGenEff[3] * global_multi) + " c/s per manager)");
        $("#coin-gen-5-prod").html(" " + round((coinGenAmount[4] + coinGenAmountFree[4]) * coinGenEff[4] * global_multi) + " c/s (" + round(coinGenEff[4] * global_multi) + " c/s per overseer)");
        $("#coffee-eff").html(" " + round(coffee_mult * 100) + "% Production, +" + round((coinBuffEff[0] - 1) * 100) + "% per coffee machine");
        $("#pickaxes-eff").html(" " + pick_mult + "x Production, Pickaxe Power: 2x");
        $("#coin-upg-1-desc").html(" Cost: 1e+7. Slaves produce more coins based on coins. Currently: " + round(coinUpgMult[0]) + "x");
        $("#coin-upg-2-desc").html(" Cost: 1e+8. Staff produces more coins based on Staff. Currently: " + round(coinUpgMult[1]) + "x");
        $("#coin-upg-3-desc").html(" Cost: 1e+9. Watchers produce more coins based on every producer. Currently: " + round(coinUpgMult[2]) + "x");
        $("#coin-upg-4-desc").html(" Cost: 1e+10. Managers produce 200x coins. 2x coins/s as well! Currently: " + round(coinUpgMult[3]) + "x");
        $("#coin-upg-5-desc").html(" Cost: 1e+11. Overseers boost coin gain. Currently: " + round(coinUpgMult[4]) + "x");
        $("#ingot-boost-eff").html(" Your ingots boost coin upgrades 1-5 by " + round((ingotUpgBoost - 1) * 100) + "%!");
        $("#furnace-num").html(" Your furnace is " + furnaceSpeed + "x effective");
        $("#furnace-eff").html(" Conversion efficiency is " + round(conv_eff * 100) + "%");
        $("#furnace-boost").html(" While furnace is working, you get " + furnaceBonusEff + "x coins");
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
        if(gold_ore < GoldUpgPrice[0] || GoldUpg[0] == 1)
            disableBtn("headstart-upg-1");
        else
            enableBtn("headstart-upg-1");
            
        if(gold_ore < GoldUpgPrice[1] || GoldUpg[1] == 1)
            disableBtn("headstart-upg-2");
        else
            enableBtn("headstart-upg-2");
        if(gold_ore < GoldUpgPrice[2] || GoldUpg[2] == 1)
            disableBtn("headstart-upg-3");
        else
            enableBtn("headstart-upg-3");
        if(gold_ore < GoldUpgPrice[3] || GoldUpg[3] == 1)
            disableBtn("lategame-upg-1");
        else
            enableBtn("lategame-upg-1");
            
        if(gold_ore < GoldUpgPrice[4] || GoldUpg[4] == 1)
            disableBtn("lategame-upg-2");
        else
            enableBtn("lategame-upg-2");
        if(gold_ore < GoldUpgPrice[5] || GoldUpg[5] == 1)
            disableBtn("lategame-upg-3");
        else
            enableBtn("lategame-upg-3");
        if(ingot < furnaceUpgPrice[0])
            disableBtn("furnace-upg-1");
        else
            enableBtn("furnace-upg-1");
        if(ingot < furnaceUpgPrice[1])
            disableBtn("furnace-upg-2");
        else
            enableBtn("furnace-upg-2");
        if(ingot < furnaceUpgPrice[2])
            disableBtn("furnace-upg-3");
        else
            enableBtn("furnace-upg-3");
        if(ingot < furnaceUpgPrice[3])
            disableBtn("furnace-upg-4");
        else
            enableBtn("furnace-upg-4");
        if(gold_ore <= 0){
            isFurnaceActive = 0;
            $("#furnace-active").css("border-color", "red");
            $("#furnace-active").html("OFF");
            disableBtn("furnace-active");
        }
        else{
            enableBtn("furnace-active");
        }
        if(coins >= 1e12){
            $("#prestige-off-text").css("display", "none");
            $("#prestige-on-text").css("display", "block");
            $("#worst-button").css("display", "block");
            $("#prestige-on-text").html("Prestige and get " + round(ore_gain) + " gold ore!");
        }
        else{
            $("#prestige-off-text").css("display", "block");
            $("#prestige-on-text").css("display", "none");
            $("#worst-button").css("display", "none");
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
        ingotUpgBoost = 1 + (logx(2, ingot + 1) / 100);
        furnaceBonus = (isFurnaceActive * (furnaceBonusEff - 1)) + 1
        coinUpgMult[0] = 1 + (logx(1.4, coins + 1) * ingotUpgBoost * coinUpg[0]);
        coinUpgMult[1] = 1 + (coinGenAmount[1] * ingotUpgBoost / 2.5 * coinUpg[1]);
        coinUpgMult[2] = 1 + ((coinGenAmount[0] + coinGenAmount[1] +  + coinGenAmount[2] + coinGenAmount[3] + coinGenAmount[4] + 1) * ingotUpgBoost / 3 * coinUpg[2]);
        coinUpgMult[3] = 1 + 199 * coinUpg[3] * ingotUpgBoost;
        coinUpgMult[4] = 1 + coinGenAmount[4] * ingotUpgBoost / 4 * coinUpg[4];
        upgGlobalMulti = 1 + coinUpg[4] * ingotUpgBoost;
        coinGenEff[0] = coinUpgMult[0];
        coinGenEff[1] = coinUpgMult[1] * 10;
        coinGenEff[2] = coinUpgMult[2] * 100;
        coinGenEff[3] = coinUpgMult[3] * 500;
        coffee_mult = Math.pow(coinBuffEff[0], coinBuffAmount[0] + coinBuffAmountFree[0]);
        pick_mult = Math.pow(coinBuffEff[1], coinBuffAmount[1] + coinBuffAmountFree[1]);
        global_multi = coffee_mult * pick_mult * coinUpgMult[4] * (1 + 1 * coinUpg[3]) * furnaceBonus;
    }
    function Prestige(){
        if(didPrestige == false){
            $("#ore").css("display", "inline-block");
            $("#ingots").css("display", "inline-block");
            $("#furnace-menu").css("display", "inline-block");
            $("#gold-upg").css("display", "inline-block");
            didPrestige = true;
        }
        gold_ore = gold_ore + ore_gain;
        if(coinUpg[0]){
            coins = 10000;
        }
        else{
            coins = 10;
        }
        coinProduction = 1;
        coffee_mult = 1;
        pick_mult = 1;
        global_multi = 1;
        coinGenPrice = [10, 100, 1500, 12500, 100000];
        coinGenEff = [1, 10, 100, 500, 3000];
        coinBuffPrice = [1000, 10000];
        coinGenAmount = [1, 0, 0, 0, 0];
        coinGenAmountFree = [0, 0, 0, 0, 0];
        coinBuffAmount = [0, 0];
        coinBuffAmountFree = [0, 0];
        coinGenAmountFree[3] = GoldUpg[1];
        coinBuffAmountFree[0] = GoldUpg[2] + furnaceUpgAmount[3];
        coinBuffAmountFree[1] = GoldUpg[2];
        coinUpgPrice = [1e7, 1e8, 1e9, 1e10, 1e11];
        coinUpg = [0, 0, 0, 0, 0];
        coinUpg[0] = GoldUpg[2];
        coinGenExpo = [1.2, 1.25, 1.3, 1.4, 1.5];
        coinBuffExpo = [2.5, 10];

        $("#coin-upg-1").css("background-color", "black");
        $("#coin-upg-2").css("background-color", "black");
        $("#coin-upg-3").css("background-color", "black");
        $("#coin-upg-4").css("background-color", "black");
        $("#coin-upg-5").css("background-color", "black");
    }
    function FurnaceSwitch(a){
        if(a == 0){
            $("#furnace-active").css("border-color", "green");
            $("#furnace-active").html("ON");
            return 1;
        }
        else{
            $("#furnace-active").css("border-color", "red");
            $("#furnace-active").html("OFF");
            return 0;
        }
    }
});