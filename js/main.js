"use strict";

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

function preload() {
	//load map
	game.load.tilemap('overworld', 'assets/maps/overworld.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tileset-1', '/assets/maps/tilesets/f29765.png');
	game.load.image('tileset-2', '/assets/maps/tilesets/tileset-shinygold.png');
	game.load.image('tileset-3', '/assets/maps/tilesets/tileset-alistair.png');
	game.load.image('tileset-4', '/assets/maps/tilesets/m53_67ae6k1j1.png');
	game.load.image('tileset-5', '/assets/maps/tilesets/tileset-biome.png');
	game.load.image('Meta', '/assets/maps/tilesets/meta-grid.png');

	// load tall grass sprite
	game.load.image("grass1", "/assets/maps/tilesets/grass/tallGrass-patch-1.png")
	game.load.image("grass2", "/assets/maps/tilesets/grass/tallGrass-patch-2.png")
	game.load.image("grass3", "/assets/maps/tilesets/grass/tallGrass-patch-3.png")
	game.load.image("grass4", "/assets/maps/tilesets/grass/tallGrass-patch-4.png")
	game.load.image("grass5", "/assets/maps/tilesets/grass/tallGrass-patch-5.png")
	game.load.image("grass6", "/assets/maps/tilesets/grass/tallGrass-patch-6.png")

	//load player
	game.load.spritesheet('hero', 'assets/sprites/hero/gold.png', 17, 25);

}

var overworld;
var layer;
var collisonLayer;
var grassLayer;
var tallGrass1;
var tallGrass2;
var tallGrass3;
var tallGrass4;
var tallGrass5;
var tallGrass6;
var player;
var cursors;
var scale = 3;
var moveSpeed = 5;

function create() {
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

	player = game.add.sprite(1632, 1168, 'hero', 1); // create player
    game.physics.arcade.enable(player); // enable physics

	layer = overworld.createLayer("Overhead 1");

	collisonLayer = overworld.createLayer("Meta"); // create layer containing the meta data
	overworld.setCollision(1, true, collisonLayer); //set tile with gid 1 to collide w/ player
	collisonLayer.visible = false;

	// var grass = new Tile("Grass Layer", 15471, 1070, 1470, 16, 16)

	layer.resizeWorld();

    player.scale.setTo(0.75, 0.75);

    game.camera.follow(player);

    player.body.collideWorldBounds = true;
    
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	//collision detection
	game.physics.arcade.overlap(player, tallGrass1, function() {
		console.log("Don't go into the tall grass 1!");
	}); //check if player overlaps with a tall grass sprite
	game.physics.arcade.overlap(player, tallGrass2, function() {
		console.log("Don't go into the tall grass 2!");
	}); //check if player overlaps with a tall grass sprite
	game.physics.arcade.overlap(player, tallGrass3, function() {
		console.log("Don't go into the tall grass 3!");
	}); //check if player overlaps with a tall grass sprite
	game.physics.arcade.overlap(player, tallGrass4, function() {
		console.log("Don't go into the tall grass 4!");
	}); //check if player overlaps with a tall grass sprite
	game.physics.arcade.overlap(player, tallGrass5, function() {
		console.log("Don't go into the tall grass 5!");
	}); //check if player overlaps with a tall grass sprite
	game.physics.arcade.overlap(player, tallGrass6, function() {
		console.log("Don't go into the tall grass 6!");
	}); //check if player overlaps with a tall grass sprite
	game.physics.arcade.collide(player, collisonLayer);


	//movement
    player.body.velocity.y = 0;
    player.body.velocity.x = 0;
 
    if(cursors.up.isDown) {
      player.body.velocity.y -= 100;
    }
    else if(cursors.down.isDown) {
      player.body.velocity.y += 100;
    }
    if(cursors.left.isDown) {
      player.body.velocity.x -= 100;
    }
    else if(cursors.right.isDown) {
      player.body.velocity.x += 100;
    }
}