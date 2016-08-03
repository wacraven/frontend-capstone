"use strict";

var wildPkmnBattle = {
	create: function() {
		game.currentPokemon = game.partyPokemon[wildPkmnBattle.availablePokemon()];
		//create visuals
		var background = game.add.tileSprite(0, 0, 400, 240, "battleBG");
		var wildPokemonSprite = game.add.sprite(285, 100, `${game.wildPokemon.commonName}-front`)
		var trainerPokemonSprite = game.add.sprite(40, 175, `${game.currentPokemon.commonName}-back`)
		// wildPokemonSprite.scale.setTo(1.25, 1.25)
		trainerPokemonSprite.scale.setTo(1.5, 1.5)

		//alert box created on topmost layer
		var alertBox = game.add.tileSprite(0, 220, 400, 80, "alertBox");

		// Update text box
		var wildPokemonDisplayName = game.wildPokemon.commonName;
		wildPokemonDisplayName = wildPokemonDisplayName.capitalize()
		var textStyle = { font: 'bold 14px Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 200 };
		game.battleTextDefault = game.add.text(20, 240, `A wild ${wildPokemonDisplayName} appeared!`, textStyle);
		setTimeout(function() {wildPkmnBattle.battleOptions();}, 3000)
		game.selector = {};
		game.moveSelector = game.add.sprite(40, 241, 'selector');
		game.moveSelector.visible = false;
		game.selectTimer = Date.now() + 500
	},

	battleOptions: function() {
		// Display options
		game.battleTextDefault.visible = true;
		var trainerPokemonDisplayName = game.partyPokemon[0].commonName;
		trainerPokemonDisplayName = trainerPokemonDisplayName.capitalize();
		game.battleTextDefault.setText(`What will ${trainerPokemonDisplayName} do?`)
		game.optionBox = game.add.tileSprite(200, 220, 200, 80, "optionBox");
		game.selector = game.add.sprite(212, 241, 'selector');
		game.physics.arcade.enable(game.selector);
		// game.selector.animations.add('selectorLoop');
		// game.selector.animations.play('selectorLoop', 3, true);

	    game.fightOption = game.add.text(220,240, 'FIGHT', 
	      {
	        font: 'bold 14px Arial',
	        fill: 'black'
	    });
	    game.pokemonPartyOption = game.add.text(220,270, 'POKEMON', 
	      {
	        font: 'bold 14px Arial',
	        fill: 'black'
	    });
	    game.bagOption = game.add.text(310,240, 'POKEBALL', 
	      {
	        font: 'bold 14px Arial',
	        fill: 'black'
	    });
	    game.runOption = game.add.text(310,270, 'RUN', 
	      {
	        font: 'bold 14px Arial',
	        fill: 'black'
	    });
	},

	availablePokemon: function() {
		return 0;
	},

	fightMovesOptions: function() {
		game.optionBox.visible = false;
		game.fightOption.visible = false;
		game.pokemonPartyOption.visible = false;
		game.bagOption.visible = false;
		game.runOption.visible = false;
		game.selector.visible = false;
		game.battleTextDefault.visible = false;
		game.moveSelector = game.add.sprite(40, 241, 'selector');
		game.physics.arcade.enable(game.moveSelector);

		game.move1 = game.add.text(50,240, `${game.currentPokemon.move1.capitalize()}`, 
	      {
	        font: 'bold 14px Arial',
	        fill: 'black'
	    });
	    game.move2 = game.add.text(150,240, `${game.currentPokemon.move2.capitalize()}`, 
	      {
	        font: 'bold 14px Arial',
	        fill: 'black'
	    });
	    game.back = game.add.text(150,270, 'BACK', 
	      {
	        font: 'bold 14px Arial',
	        fill: 'black'
	    });
	},

	throwPokeball: function() {
		
	},

	update: function() {

		// check to see where the selector is when spacebar is pressed
		if (game.actionKey.isDown && game.selector.visible === true && Date.now() > game.selectTimer) {
			if (game.selector.x <= 212 && game.selector.y <= 245) {
				wildPkmnBattle.fightMovesOptions()
				console.log("fight!");
				game.selectTimer = Date.now() + 1000;
			} else if (game.selector.x <= 212 && game.selector.y >= 265) {
				game.battleTextDefault.setText('This feature is not yet available');
				setTimeout(function() {
					var trainerPokemonDisplayName = game.partyPokemon[0].commonName;
					trainerPokemonDisplayName = trainerPokemonDisplayName.capitalize();
					game.battleTextDefault.setText(`What will ${trainerPokemonDisplayName} do?`);
				}, 3000)
			} else if (game.selector.x >= 290 && game.selector.y <= 245) {
				wildPkmnBattle.throwPokeball();
				console.log("pokeball");
			} else if (game.selector.x >= 290 && game.selector.y >= 265) {
				if (game.currentPokemon.speed > game.wildPokemon.speed) {
					game.state.start('main')
				} else if (Math.floor(Math.random() * 50 + 1) <= 75) {
					game.state.start('main')
				} else {
					game.battleTextDefault.setText("Couldn't escape!");
					setTimeout(function() {
						var trainerPokemonDisplayName = game.partyPokemon[0].commonName;
						trainerPokemonDisplayName = trainerPokemonDisplayName.capitalize();
						game.battleTextDefault.setText(`What will ${trainerPokemonDisplayName} do?`);
					}, 3000)				}
			};
		};

		// move selector around options menu
		if (game.selector.visible === true) {
			if (game.selector.x >= 295 || game.selector.x <= 212) {
		      game.selector.body.velocity.x = 0;
		    }
		    if (game.selector.y >= 268 || game.selector.y <= 245) {
		      game.selector.body.velocity.y = 0;
		    }
		    if (cursors.left.isDown && game.selector.x >= 212) {
		      game.selector.body.velocity.x = -150;
		    } else if (cursors.right.isDown && game.selector.x <= 295) {
		      game.selector.body.velocity.x = 150;
		    } else if (cursors.up.isDown && game.selector.y >= 245) {
		      game.selector.body.velocity.y = -150;
		    } else if (cursors.down.isDown && game.selector.y <= 268) {
		      game.selector.body.velocity.y = 150;
		    }
		}

		// check to see where the move selector is when spacebar is pressed
		if (game.actionKey.isDown && game.moveSelector.visible === true && Date.now() > game.selectTimer) {
			if (game.moveSelector.x <= 50 && game.moveSelector.y <= 245) {
				console.log(game.currentPokemon.move1);
			} else if (game.moveSelector.x >= 130 && game.moveSelector.y <= 245) {
				console.log(game.currentPokemon.move2);
			} else if (game.moveSelector.x >= 130 && game.moveSelector.y >= 265) {
				game.moveSelector.visible = false;
				game.move1.visible = false;
				game.move2.visible = false;
				game.back.visible = false;
				game.selectTimer = Date.now() + 1000;
				wildPkmnBattle.battleOptions();
			};
		};

	    //move selector around moves menu
	    if (game.moveSelector.visible === true) {
			if (game.moveSelector.x >= 140 || game.moveSelector.x <= 40) {
		      game.moveSelector.body.velocity.x = 0;
		    }
		    if (game.moveSelector.y >= 268 || game.moveSelector.y <= 245) {
		      game.moveSelector.body.velocity.y = 0;
		    }
		    if (cursors.left.isDown && game.moveSelector.x >= 40) {
		      game.moveSelector.body.velocity.x = -150;
		    } else if (cursors.right.isDown && game.moveSelector.x <= 140) {
		      game.moveSelector.body.velocity.x = 150;
		    } else if (cursors.up.isDown && game.moveSelector.y >= 245) {
		      game.moveSelector.body.velocity.y = -150;
		    } else if (cursors.down.isDown && game.moveSelector.y <= 268) {
		      game.moveSelector.body.velocity.y = 150;
		    }
		}
	}
}