$(document).ready(function() {

//Global variables declared here
var charSelect = false;
var oppSelect = false;
var gameOver = false;
var opponentsDefeated = 0;
var player;
var opponent;
var characters = [];
var idLight = ["#luke", "#han", "#leia", "#chewy"];
var idDark = ["#stormtrooper", "#boba", "#vader", "#emperor"];

//Sounds declared and sourced here

//Global functions declared here
function endGame() {
  gameOver = true;
  //prompt for reset
  // $("#alert").html("Please refresh the page to play again.");
}

function NoEnemiesLeft() {
  var noneRemaining = true;
  var allEnemies = $("#enemiesBox > span");
  console.log({allEnemies});
  for (var i=0; i<allEnemies.length; i++) {
    if ($(allEnemies[i]).hasClass("dead")){
      
    }
    else {
      noneRemaining = false;
    }
  }
  console.log({noneRemaining});
  return noneRemaining;
}

function gameReset() {
  charSelect = false;
  oppSelect = false;
  gameOver = false;
  //make all character buttons active again and remove previous character avatars from arena
  console.log("Game reset");
  console.log({charSelect}, {oppSelect}, {gameOver});
}

//Character object constructor declared here
function Character(name, htmlID, alive, life, base, side, imgHTML) {
  this.name = name;
  this.htmlID = htmlID
  this.alive = alive;
  this.life = life;
  this.basePower = base;
  this.power = base;
  this.ctrPower = base*1.5;
  this.side = side; //light or dark
  this.imgHTML = imgHTML;
  var that = this;
  // this.playerAvatar = playerAvatar;
  // this.oppAvatar = oppAvatar;
  // this.attackSound = attackSound;
  // this.deathSound = deathSound;

  this.attack = function () {
    //this.attackSound.play();
    $("#alert").html("You have attacked " + opponent.name + " for " + that.power + " damage!");
    // this.power += this.basePower;
    //update enemy life html;
    // console.log(enemy.life, this.power);
  };

  this.increasePower = function () {
    that.power += Math.floor(that.basePower * .75);
    console.log("my new power is " + that.power);
  };

  // setTimeout(function() {that.ctrAttack();}, 3000);

  this.ctrAttack = function () {
    //this.attackSound.play();
    // enemy.life -= that.basePower;
    $("#alert").append("<br>" + opponent.name + " has attacked you for " + that.ctrPower + " damage!");

    //update enemy life html;
    console.log("basePower: " + that.basePower);
    // console.log("enemy.life: " + enemy.life);
  };

  this.takeDmg = function (damage) {
    that.life -= damage;
    console.log("my life is: " + that.life);
    // update avatar's health display
  }

  this.death = function () {
    //this.deathSound.play();
    this.alive = false;
    console.log(this.alive);
    // $("#alert").html("You have defeated " + this.name + "! Please select another opponent");

  };
}

function createChar(name) {
  switch (name) {
    case "luke" :
      var luke = new Character("Luke", "luke", true, 100, 9, "light", '<img src="assets/images/luke.jpg" height="100%" width="100%">');
      console.log(luke);
      charSelect = true;
      return luke;
      break;
    case "han" :
      var han = new Character("Han Solo", "han", true, 120, 7, "light", '<img src="assets/images/han-solo.png" height="100%" width="100%">');
      console.log(han);
      charSelect = true;
      return han;
      break;
    case "leia" :
      var leia = new Character("Leia", "leia", true, 100, 6, "light", '<img src="assets/images/leia-organa.jpeg" height="100%" width="100%">');
      console.log(leia);
      charSelect = true;
      return leia;
      break;
    case "chewy" :
      var chewy = new Character("Chewbacca", "chewy", true, 150, 8, "light", '<img src="assets/images/chewbacca.jpeg" height="100%" width="100%">');
      console.log(chewy);
      charSelect = true;
      return chewy;
      break;
    case "stormtrooper" :
      var stormy = new Character("Stormtrooper", "stormtrooper", true, 90, 6, "dark", '<img src="assets/images/stormtrooper.jpeg" height="100%" width="100%">');
      console.log(stormy);
      charSelect = true;
      return stormy;
      break;
    case "boba" :
      var boba = new Character("Boba Fett", "boba", true, 110, 8, "dark", '<img src="assets/images/boba-fett.jpeg" height="100%" width="100%">');
      console.log(boba);
      charSelect = true;
      return boba;
      break;
    case "vader" :
      var vader = new Character("Darth Vader", "vader", true, 120, 8, "dark", '<img src="assets/images/vader.jpeg" height="100%" width="100%">');
      console.log(vader);
      charSelect = true;
      return vader;
      break;
    case "emperor" :
      var palps = new Character("Emperor Palpatine", "emperor", true, 80, 10, "dark", '<img src="assets/images/palpatine.jpeg" height="100%" width="100%">');
      console.log(palps);
      charSelect = true;
      return palps;
      break;

  }
}


function game() {
  console.log("game started");
  //alert player to pick a character
  $("#alert").html("Please select a character.");
  
  //listen for button click on a character
  $(".select").on("click", function() {
    var key = $(this).attr("value");
    console.log({key});
    console.log({gameOver});
    console.log({charSelect});
    console.log({oppSelect});
    //process character pick
    if (gameOver) {
      $("#alert").html("The game is over. Please click the reset button to restart the game.");
      return;
    } 

    if (charSelect && oppSelect) {
      $("#alert").html("You cannot select a character at this time.");
      return;
    }

    //build character object and assign oppoenent to the created object
    if (charSelect && !oppSelect) {//if the player has chosen a character but no opponent
      console.log(key, player.name);
      if(key === player.htmlID) {
        $("#alert").html("You cannot fight yourself.");
      }
      else {
        //process opponent pick
          //build character object
          //assign opponent to created object
        opponent = createChar(key);
        $("#opponent").html(opponent.name);
        //generate opponent character image in arena;
        $("#opp-avatar").parent().removeClass("invisible");
        $("#opp-avatar").html(opponent.imgHTML);
        $("#opp-health").html(opponent.life);
        console.log(opponent);
        oppSelect = true;
        console.log({oppSelect});

        //make the chosen opponent's button invisible;
        $(this).parent().addClass("invisible");

        //make the attack button visible;
        $("#attack").removeClass("invisible");
        $("#alert").html("Press the attack button to attack your opponent!");
      }
    }

    //build character object
    //assign player to created object
    else if (charSelect === false) { //set the player's character
      player = createChar(key);
      $("#player").html(player.name);
      //generate player character avatar in arena;
      $("#player-avatar").parent().removeClass("invisible");
      $("#player-avatar").html(player.imgHTML);
      $("#player-health").html(player.life);
      console.log(player);
      charSelect = true;
      //console.log($(this).attr("id"));
      $("#enemiesRow").removeClass("invisible");
      //make the buttons for the rest of the players on the same side inactive... can't choose a character from the same side as an opponent;
      if (player.side === "light") {
        console.log(player.side);
        for (var i=0; i<idLight.length; i++) {
          /*// console.log(idLight[i]);
          // console.log($(this).attr("id"));
          if (("#" + $(this).attr("id")) !== idLight[i]) {
            $(idLight[i]).parent().addClass("invisible");
          }
          else if (("#" + $(this).attr("id")) === idLight[i]) {
            $(idLight[i]).addClass("disabled");
            $(idLight[i]).click(false);//doesn't work
          }*/
          //also move the buttons for the enemies from the charselect row to the enemies row
          (($(idDark[i])).parent()).detach().appendTo("#enemiesBox");
          $(idDark[i]).addClass("enemyRow");
        }
        $("#attack").removeClass("btn-default").addClass("btn-info");
      }
      else if (player.side === "dark") {
        for (var i=0; i<idDark.length; i++) {
          //console.log(idDark[i]);
          if ((("#" + $(this).attr("id"))) !== idDark[i]) {
            $(idDark[i]).parent().addClass("invisible");
          }
          else if ((("#" + $(this).attr("id"))) === idDark[i]) {
            $(idDark[i]).addClass("disabled");
            $(idDark[i]).click(false);//doesn't work
          }
          (($(idLight[i])).parent()).detach().appendTo("#enemiesBox");
          $(idLight[i]).addClass("enemyRow");
        }
        $("#attack").removeClass("btn-default").addClass("btn-danger");
      }
      
      //the player has chosen a character, so now they must choose an opponent... alert player to pick an opponent
      $("#alert").html("Please select an opponent.");
      //hide the original charselect row
      $("#charSelectRow").addClass("hidden");
    }

    
  });

  $("#attack").on("click", function() {
    if (gameOver) {//if the game is over, this button should be hidden & inactive, but just in case...
      $("#alert").html("The game is over. Please click the reset button to restart the game.");
    }
    else if (!charSelect) { //If the player has not chosen a character or...
      $("#alert").html("You must select a character first!");
    }
    else if (!oppSelect) { //If the player has not chosen and opponent, this button should be hidden or inactive, but just in case...
      $("#alert").html("You must select an opponent first!");
    }
    else {
      console.log("player attacks!");
      //player attacks opponent
      player.attack(opponent);
      opponent.takeDmg(player.power);
      console.log(opponent.name + "\'s life is now " + opponent.life);
      //update health meter for opponent
      $("#opp-health").html(opponent.life);
      player.increasePower();
      //if opponent dies
      if (opponent.life <= 0) {
        $("#attack").addClass("invisible");
        opponent.death();
        oppSelect = false;
        //remove opponent avatar from arena;
        $("#opp-avatar").html("");
        $("#opp-avatar").parent().addClass("invisible");
        //update opponents defeated
        opponentsDefeated++;
        $("#defeated").html(opponentsDefeated);
        // opponent.alive = false;
        console.log(opponent.alive);
        $("#" + opponent.htmlID).parent().addClass("dead");
        //check to see if all enemies are dead
        //if they are, game over, if not play continues
        if(NoEnemiesLeft()) {
          endGame();
          $("#alert").html("You have defeated your opponents! <br>You Win! <br> Refresh the page to play again!");
        }
        else {
          $("#alert").html("You have defeated " + opponent.name + "! <br>Choose your next opponent!");
          console.log("You have defeated " + opponent.name + "!");
        }
        
      }
      else if(opponent.alive) {
        //opponent counterattacks player
        console.log("opponent counters!");
        console.log(opponent.ctrAttack);
        console.log(opponent.basePower);
        // setTimeout(opponent.ctrAttack, 3000, player);
        opponent.ctrAttack(player);
        player.takeDmg(opponent.ctrPower);
        console.log(player.name + "\'s life is now " + player.life);
        // update health meter for player
        $("#player-health").html(player.life);
        //if player dies
        if (player.life <= 0) {
          player.death();
          charSelect = false;
          //remove player avatar from arena;
          $("#player-avatar").html("");
          // player.alive = false;
          console.log(player.alive);
          endGame();
          $("#alert").html("You have been defeated! <br> Game Over!");
          console.log("You have been defeated! <br> Game Over!");
        }
      }
    }
  });

}

game();

}); //End of the entire script, beginning with the document.ready
