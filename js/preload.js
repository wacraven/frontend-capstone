"use strict";

var preloadState = {
	preload: function() {
		// load overworld map
		game.load.tilemap('overworld', 'assets/maps/overworld.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tileset-1', '/assets/maps/tilesets/f29765.png');
		game.load.image('tileset-2', '/assets/maps/tilesets/tileset-shinygold.png');
		game.load.image('tileset-3', '/assets/maps/tilesets/tileset-alistair.png');
		game.load.image('tileset-4', '/assets/maps/tilesets/m53_67ae6k1j1.png');
		game.load.image('tileset-5', '/assets/maps/tilesets/tileset-biome.png');
		game.load.image('Meta', '/assets/maps/tilesets/meta-grid.png');

		// load tall grass sprites
		game.load.image("grass1", "/assets/maps/tilesets/grass/tallGrass-patch-1.png")
		game.load.image("grass2", "/assets/maps/tilesets/grass/tallGrass-patch-2.png")
		game.load.image("grass3", "/assets/maps/tilesets/grass/tallGrass-patch-3.png")
		game.load.image("grass4", "/assets/maps/tilesets/grass/tallGrass-patch-4.png")
		game.load.image("grass5", "/assets/maps/tilesets/grass/tallGrass-patch-5.png")
		game.load.image("grass6", "/assets/maps/tilesets/grass/tallGrass-patch-6.png")

		// load player
		game.load.spritesheet('hero', '/assets/sprites/hero/gold.png', 17, 25);

		// load battle images
		game.load.image('battleBG', '/assets/maps/battleBackgrounds/field.png');
		game.load.image('alertBox', '/assets/maps/battleBackgrounds/alertBox.png');
		game.load.image('optionBox', '/assets/maps/battleBackgrounds/optionBox.png');
		game.load.image('selector', '/assets/maps/battleBackgrounds/selector.png');

		//load front sprites
		game.load.image('pidgey-front', '/assets/sprites/pokemon/pidgey-front.png');
		game.load.image('rattata-front', '/assets/sprites/pokemon/rattata-front.png');
		game.load.image('caterpie-front', '/assets/sprites/pokemon/caterpie-front.png');
		game.load.image('weedle-front', '/assets/sprites/pokemon/weedle-front.png');
		game.load.image('bellsprout-front', '/assets/sprites/pokemon/bellsprout-front.png');
		game.load.image('pikachu-front', '/assets/sprites/pokemon/pikachu-front.png');
		game.load.image('oddish-front', '/assets/sprites/pokemon/oddish-front.png');
		game.load.image('mankey-front', '/assets/sprites/pokemon/mankey-front.png');
		game.load.image('jigglypuff-front', '/assets/sprites/pokemon/jigglypuff-front.png');
		game.load.image('clefairy-front', '/assets/sprites/pokemon/clefairy-front.png');

		//load back sprites
		game.load.image('bulbasaur-back', '/assets/sprites/pokemon/bulbasaur-back.png');
		game.load.image('charmander-back', '/assets/sprites/pokemon/charmander-back.png');
		game.load.image('squirtle-back', '/assets/sprites/pokemon/squirtle-back.png');
		game.load.image('pidgey-back', '/assets/sprites/pokemon/pidgey-back.png');
		game.load.image('rattata-back', '/assets/sprites/pokemon/rattata-back.png');
		game.load.image('caterpie-back', '/assets/sprites/pokemon/caterpie-back.png');
		game.load.image('weedle-back', '/assets/sprites/pokemon/weedle-back.png');
		game.load.image('bellsprout-back', '/assets/sprites/pokemon/bellsprout-back.png');
		game.load.image('pikachu-back', '/assets/sprites/pokemon/pikachu-back.png');
		game.load.image('oddish-back', '/assets/sprites/pokemon/oddish-back.png');
		game.load.image('mankey-back', '/assets/sprites/pokemon/mankey-back.png');
		game.load.image('jigglypuff-back', '/assets/sprites/pokemon/jigglypuff-back.png');
		game.load.image('clefairy-back', '/assets/sprites/pokemon/clefairy-back.png');

		// load other assets
		game.load.spritesheet('loading', '/assets/loading.jpg', 400, 300)

	},
	create: function() {
		game.state.start('main');
	}
}