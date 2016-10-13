"use strict";

var overworld;
var player;
var layer;
var collisonLayer;
var cursors;
var playerPos ={
	x: 1530,
	y: 1110
};
var grassLayer;
var tallGrass1;
var tallGrass2;
var tallGrass3;
var tallGrass4;
var tallGrass5;
var tallGrass6;
var pokemonInGrass1 = [16, 19, 43]
var pokemonInGrass2 = [16, 19, 69]
var pokemonInGrass3 = [10, 19, 56]
var pokemonInGrass4 = [16, 13, 39]
var pokemonInGrass5 = [56, 19, 35]
var pokemonInGrass6 = [16, 19, 25]
let playerFacing

var main = {
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		overworld = game.add.tilemap('overworld');
		overworld.addTilesetImage('tileset-1');
		overworld.addTilesetImage('tileset-2');
		overworld.addTilesetImage('tileset-3');
		overworld.addTilesetImage('tileset-4');
		overworld.addTilesetImage('tileset-5');
		overworld.addTilesetImage('Meta');

		layer = overworld.createLayer("Layer 1");
		layer = overworld.createLayer("Layer 2");
		layer = overworld.createLayer("Layer 3");
		layer = overworld.createLayer("Layer 4");

		grassLayer = overworld.createLayer("Grass Layer"); //create layer containing only tall grass
		tallGrass1 = game.add.sprite(930, 1335 , 'grass1', 1)
		game.physics.arcade.enable(tallGrass1)
		tallGrass2 = game.add.sprite(855, 1260 , 'grass2', 1)
		game.physics.arcade.enable(tallGrass2)
		tallGrass3 = game.add.sprite(765, 1080 , 'grass3', 1)
		game.physics.arcade.enable(tallGrass3)
		tallGrass4 = game.add.sprite(750, 1230 , 'grass4', 1)
		game.physics.arcade.enable(tallGrass4)
		tallGrass5 = game.add.sprite(600, 1275 , 'grass5', 1)
		game.physics.arcade.enable(tallGrass5)
		tallGrass6 = game.add.sprite(660, 1395 , 'grass6', 1)
		game.physics.arcade.enable(tallGrass6)

		layer = overworld.createLayer("Layer 5");
		layer = overworld.createLayer("Sprite Layer");

		player = game.add.sprite(playerPos.x, playerPos.y, 'hero', 1); // create player
	  game.physics.arcade.enable(player); // enable physics
		player.animations.add('down', [0, 1, 2, 1], 10, true);
		player.animations.add('left', [3, 4, 5, 4], 10, true);
		player.animations.add('up', [6, 7, 8, 7], 10, true);
		player.animations.add('right', [9, 10, 11, 10], 10, true);

		layer = overworld.createLayer("Overhead 1");

		collisonLayer = overworld.createLayer("Meta"); // create layer containing the meta data
		overworld.setCollision(1, true, collisonLayer); //set tile with gid 1 to collide w/ player
		collisonLayer.visible = false;

		layer.resizeWorld();

	    player.scale.setTo(0.75, 0.75);

	    game.camera.follow(player);

	    player.body.collideWorldBounds = true;

	    cursors = game.input.keyboard.createCursorKeys();

	    game.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    // game.FirebaseURL = 'https://pokemon-golden-silver.firebaseio.com'
		// game.userId = "1A";
	},

	update: function() {
		//collision detection
		game.physics.arcade.overlap(player, tallGrass1, function() {
			wildBattleStart.randomEncounter(pokemonInGrass1);
		}); //check if player overlaps with a tall grass sprite
		game.physics.arcade.overlap(player, tallGrass2, function() {
			wildBattleStart.randomEncounter(pokemonInGrass2);
		}); //check if player overlaps with a tall grass sprite
		game.physics.arcade.overlap(player, tallGrass3, function() {
			wildBattleStart.randomEncounter(pokemonInGrass3);
		}); //check if player overlaps with a tall grass sprite
		game.physics.arcade.overlap(player, tallGrass4, function() {
			wildBattleStart.randomEncounter(pokemonInGrass4);
		}); //check if player overlaps with a tall grass sprite
		game.physics.arcade.overlap(player, tallGrass5, function() {
			wildBattleStart.randomEncounter(pokemonInGrass5);
		}); //check if player overlaps with a tall grass sprite
		game.physics.arcade.overlap(player, tallGrass6, function() {
			wildBattleStart.randomEncounter(pokemonInGrass6);
		}); //check if player overlaps with a tall grass sprite
		game.physics.arcade.collide(player, collisonLayer);


		//movement
	    player.body.velocity.y = 0;
	    player.body.velocity.x = 0;

	    if(cursors.up.isDown) {
	      player.body.velocity.y -= 100;
				player.animations.play('up');
				playerFacing = 'up'
	    }
	    else if(cursors.down.isDown) {
	      player.body.velocity.y += 100;
				player.animations.play('down');
				playerFacing = 'down'
	    }
	    else if(cursors.left.isDown) {
	      player.body.velocity.x -= 100;
				player.animations.play('left');
				playerFacing = 'left'
	    }
	    else if(cursors.right.isDown) {
	      player.body.velocity.x += 100;
				player.animations.play('right');
				playerFacing = 'right'
	    }
			else {
        player.animations.stop();
				if (playerFacing === 'up') {
					player.frame = 7;
				}
				else if (playerFacing === 'down') {
					player.frame = 1;
				}
				else if (playerFacing === 'left') {
					player.frame = 4;
				}
				else if (playerFacing === 'right') {
					player.frame = 10;
				}
			}
	}
}
