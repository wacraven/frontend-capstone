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


	//load player
	game.load.spritesheet('hero', 'assets/sprites/hero/gold.png', 17, 25);

}

var overworld;
var layer;
var collisonLayer;
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

	layer = overworld.createLayer(0);
	layer.scale.setTo(scale,scale);

	layer = overworld.createLayer(1);
	layer.scale.setTo(scale,scale);

	layer = overworld.createLayer(2);
	layer.scale.setTo(scale,scale);

	layer = overworld.createLayer(3);
	layer.scale.setTo(scale,scale);

	layer = overworld.createLayer(4);
	layer.scale.setTo(scale,scale);

	layer = overworld.createLayer(5);
	layer.scale.setTo(scale,scale);

	player = game.add.sprite(1632*scale, 1168*scale, 'hero', 1);
    game.physics.arcade.enable(player);

	layer = overworld.createLayer(6);
	layer.scale.setTo(scale,scale);

	collisonLayer = overworld.createLayer("Meta");
	collisonLayer.scale.setTo(scale,scale);	

	// collisonLayer.enableBody = true;
	// game.physics.arcade.enable(collisonLayer);
	overworld.setCollision(1, true, collisonLayer);


	layer.resizeWorld();

    player.scale.setTo(scale-scale*0.25, scale-scale*0.25);

    game.camera.follow(player);

    player.body.collideWorldBounds = true;
    
    cursors = game.input.keyboard.createCursorKeys();
}


// function movePlayer(x, y) {  game.player.x += x * 16;  game.player.y += y * 16;}// usage movePlayer(1, 0); // move player 1 tile rightmovePlayer(0, 1); // move player 1 tile downmovePlayer(-1, 0); // move player 1 tile leftmovePlayer(0, -2); // move player 2 tiles up

function update() {

	game.physics.arcade.collide(player, collisonLayer);

    player.body.velocity.y = 0;
    player.body.velocity.x = 0;
 
    if(cursors.up.isDown) {
      player.body.velocity.y -= 150;
    }
    else if(cursors.down.isDown) {
      player.body.velocity.y += 150;
    }
    if(cursors.left.isDown) {
      player.body.velocity.x -= 150;
    }
    else if(cursors.right.isDown) {
      player.body.velocity.x += 150;
    }
}
