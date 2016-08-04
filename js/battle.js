"use strict";

var wildPkmnBattle = {
	create: function() {
		game.currentPokemon = game.partyPokemon[wildPkmnBattle.availablePokemon()];
		game.turnCounter = 1;
		//create visuals
		var background = game.add.tileSprite(0, 0, 400, 240, "battleBG");
		game.wildPokemonSprite = game.add.sprite(285, 100, `${game.wildPokemon.commonName}-front`)
		game.trainerPokemonSprite = game.add.sprite(40, 175, `${game.currentPokemon.commonName}-back`)
		game.trainerPokemonSprite.scale.setTo(1.5, 1.5)
		game.trainerInfoBox = game.add.sprite(175, 165, 'trainerInfoBox');
		game.trainerPokemonHealthBarConfig = {
		    width: 92,
		    height: 4,
		    x: 314,
		    y: 191,
		    bg: {
		      color: '#496b4a'
		    },
		    bar: {
		      color: '#FEFF03'
		    },
		    animationDuration: 200,
		    flipped: false
		};
		game.trainerPokemonHealthBar = new HealthBar(this.game, game.trainerPokemonHealthBarConfig);
		var trainerPokemonInfoName = game.add.text(210, 170, `${game.currentPokemon.commonName.capitalize()}`, { font: 'bold 11px Arial', fill: 'black' }) 
		game.enemyInfoBox = game.add.sprite(25, 60, 'enemyInfoBox');
		game.wildPokemonHealthBarConfig = {
		    width: 94,
		    height: 4,
		    x: 151,
		    y: 88,
		    bg: {
		      color: '#496b4a'
		    },
		    bar: {
		      color: '#FEFF03'
		    },
		    animationDuration: 200,
		    flipped: false
		};
		game.wildPokemonHealthBar = new HealthBar(this.game, game.wildPokemonHealthBarConfig);
		var wildPokemonInfoName = game.add.text(40, 65, `${game.wildPokemon.commonName.capitalize()}`, { font: 'bold 11px Arial', fill: 'black' }) 

		//alert box created on topmost layer
		var alertBox = game.add.tileSprite(0, 220, 400, 80, "alertBox");

		// Update text box
		var wildPokemonDisplayName = game.wildPokemon.commonName;
		wildPokemonDisplayName = wildPokemonDisplayName.capitalize()
		game.textStyle = { font: 'bold 14px Arial', fill: 'black', align: 'left', wordWrap: true, wordWrapWidth: 200 };
		game.battleTextDefault = game.add.text(20, 240, `A wild ${wildPokemonDisplayName} appeared!`, game.textStyle);
		setTimeout(function() {wildPkmnBattle.battleOptions();}, 3000)
		game.selector = {};
		game.moveSelector = game.add.sprite(40, 241, 'selector');
		game.moveSelector.visible = false;
		game.selectTimer = Date.now() + 500
	},

	availablePokemon: function() {
		for (var i = 0; i < game.partyPokemon.length; i++) {
			if (game.partyPokemon[i].currentHp > 0) {
				return i;
			};
		};
	},

	battleOptions: function() {
		// Display options
		game.battleTextDefault.visible = true;
		var trainerPokemonDisplayName = game.currentPokemon.commonName;
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
		if (game.move1) {
			game.move1.visible = false;
			game.move2.visible = false;
			game.back.visible = false;
			game.moveSelector.visible = false;
		}
		game.battleTextDefault.visible = false;
		game.battleTextAction = game.add.text(20,240, `You threw a Pokeball!`, game.textStyle);
		game.wildPokemonSprite.visible = false;
		game.pokeballSprite = game.add.sprite(295, 120, 'pokeball', 1)
		game.pokeballSprite.animations.add('pokeballWobble',[1,2,3,4,3,2], 12);
		setTimeout(function() {
			game.pokeballSprite.animations.play('pokeballWobble')
		}, 1000)
		setTimeout(function() {
			game.pokeballSprite.animations.play('pokeballWobble')
		}, 2000)
		setTimeout(function() {
			game.pokeballSprite.animations.play('pokeballWobble')
			var pokeballRoll = Math.floor(Math.random() * 100 + 1)
			var wildPokemonHealth = ((game.wildPokemon.baseHp - game.wildPokemon.currentHp)/((game.wildPokemon.baseHp + game.wildPokemon.currentHp)/2)) * 100
			if (wildPokemonHealth >= pokeballRoll) {
				game.battleTextAction.setText(`Gotcha! ${game.wildPokemon.commonName.capitalize()} was caught!`);
				game.wildPokemon.trainerID = game.userId;
				game.selectTimer = Date.now() + 3000;
				wildPkmnBattle.caughtPokemon();
			} else {
				game.battleTextAction.setText(`Shoot! It was so close!`);
				game.pokeballSprite.visible = false;
				game.wildPokemonSprite.visible = true;
				setTimeout(function() {
					game.battleTextAction.visible = false;
					wildPkmnBattle.battleOptions();
					// game.battleTextDefault.visible = true;
				}, 2000);
			}
		}, 3000)

	},

	caughtPokemon: function() {
		$.ajax({
			url: `${game.FirebaseURL}/pokemon/.json`,
			type: 'POST',
			data: JSON.stringify(game.wildPokemon)
		})
		.done(function() {
			console.log("success");
			if (Date.now() > game.selectTimer) {
				game.state.start('main');
			}
		})
		.fail(function() {
			console.log("Error saving caught Pokemon");
		});
		
	},

	trainerPokemonAtck: function(move) {
		game.currentPokemon
	},

	wildPokemonAtck: function() {
		
	},

	update: function() {

		//updat health bars
		game.trainerPokemonHealthBar.setPercent(100 - (((game.currentPokemon.baseHp - game.currentPokemon.currentHp)/((game.currentPokemon.baseHp + game.currentPokemon.currentHp)/2)) * 100))
		game.wildPokemonHealthBar.setPercent(100 - (((game.wildPokemon.baseHp - game.wildPokemon.currentHp)/((game.wildPokemon.baseHp + game.wildPokemon.currentHp)/2)) * 100))

		// check to see where the selector is when spacebar is pressed
		if (game.actionKey.isDown && game.selector.visible === true && Date.now() > game.selectTimer) {
			if (game.selector.x <= 212 && game.selector.y <= 245) {
				wildPkmnBattle.fightMovesOptions()
				console.log("fight!");
				game.selectTimer = Date.now() + 1000;
			} else if (game.selector.x <= 212 && game.selector.y >= 265) {
				game.selectTimer = Date.now() + 1000;
				game.battleTextDefault.setText('This feature is not yet available');
				setTimeout(function() {
					var trainerPokemonDisplayName = game.currentPokemon.commonName;
					trainerPokemonDisplayName = trainerPokemonDisplayName.capitalize();
					game.battleTextDefault.setText(`What will ${trainerPokemonDisplayName} do?`);
				}, 3000)
			} else if (game.selector.x >= 290 && game.selector.y <= 245) {
				wildPkmnBattle.throwPokeball();
				game.selectTimer = Date.now() + 1000;
				console.log("pokeball");
			} else if (game.selector.x >= 290 && game.selector.y >= 265) {
				if (game.currentPokemon.speed > game.wildPokemon.speed) { //if current pokemon is faster than wild pokemon, escape
					game.selectTimer = Date.now() + 1000;
					game.battleTextDefault.setText('Got away safely!');
					setTimeout(function() {
						game.state.start('main')}, 2000);
				} else if (game.wildPokemon.speed < game.currentPokemon.speed * 2 && Math.floor(Math.random() * 50 + 1) <= 75) { // if wild pokemon speed is less than double speed of current pokemon, roll for escape, 75% chance
					game.selectTimer = Date.now() + 1000;
					game.battleTextDefault.setText('Got away safely!');
					setTimeout(function() {
						game.state.start('main')}, 2000);
				} else if (Math.floor(Math.random() * 50 + 1) <= 40) {  // if wild pokemon speed is more than double speed of current pokemon, roll for escape, 40% chance
					game.selectTimer = Date.now() + 1000;
					game.battleTextDefault.setText('Got away safely!');
					setTimeout(function() {
						game.state.start('main')}, 2000);
				} else {
					game.selectTimer = Date.now() + 1000;
					game.battleTextDefault.setText("Couldn't escape!");
					setTimeout(function() {
						var trainerPokemonDisplayName = game.currentPokemon.commonName;
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
				game.selectTimer = Date.now() + 1000;
			} else if (game.moveSelector.x >= 130 && game.moveSelector.y <= 245) {
				console.log(game.currentPokemon.move2);
				game.selectTimer = Date.now() + 1000;
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