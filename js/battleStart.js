"use strict";

var wildBattleStart = {
	create: function() {
		var loading = game.add.sprite(0, 0, 'loading');
		loading.animations.add('loadLoop');
		loading.animations.play('loadLoop', 4, true);
	},

	randomEncounter: function(location) {
		var encounterChance = 0.01;
		var encounterRoll = Math.random();
		var moving;
		if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
			moving = false;
		} else {
			moving = true;
		}
		if (encounterChance >= encounterRoll && moving) {
			game.state.start('wildBattleStart');
			console.log("A wild Pokemon Appeared!");
			wildBattleStart.pokemonEncounter(location);
			wildBattleStart.trainerPokemonGet();
			playerPos.x = player.body.x;
			playerPos.y = player.body.y;
			console.log(playerPos);
		} else {
			console.log("no encounter");
		}
	},

	pokemonEncounter: function(location) {
		var encountered = location[Math.floor(Math.random() * location.length)]
		$.ajax({
			// url: `http://pokeapi.co/api/v2/pokemon/${encountered}`
			url: `https://pokemon-golden-silver.firebaseio.com/backupPokemon/.json?orderBy="id"&equalTo=${encountered}`
		})
		.done(function(result) {
			wildBattleStart.battleSetup(result);
			game.state.start('wildPkmnBattle');
		})
		.fail(function() {
			console.log("error");
			game.state.start('main');
		});
	},

	battleSetup: function(result) {
		game.wildPokemon = new wildBattleStart.wildPkmnBuilder(result);
		console.log("Wild Pokemon:", game.wildPokemon);
	},

	wildPkmnBuilder: function(result){
		game.wildPokemonArray = [];
		for(var pokemon in result){
		    game.wildPokemonArray.push(result[pokemon]);
		 }
		this.pokedexId = game.wildPokemonArray[0].id;
		this.commonName = game.wildPokemonArray[0].forms[0].name;
		this.frontSprite = `/assets/sprites/pokemon/${this.commonName}-front.png`;
		this.backSprite = `/assets/sprites/pokemon/${this.commonName}-back.png`;
		// this.ability = wildPkmnAbilityGetter(game.wildPokemonArray[0]);
		this.baseSpeed = game.wildPokemonArray[0].stats[0].base_stat;
		this.baseSpecDef = game.wildPokemonArray[0].stats[1].base_stat;
		this.baseSpecAtck = game.wildPokemonArray[0].stats[2].base_stat;
		this.baseDef = game.wildPokemonArray[0].stats[3].base_stat;
		this.baseAtck = game.wildPokemonArray[0].stats[4].base_stat;
		this.baseHp = game.wildPokemonArray[0].stats[5].base_stat;
		// this.move1 = game.wildPokemonArray[0].moves[0].move.name;
		// this.move2 = game.wildPokemonArray[0].moves[1].move.name;
		this.move1 = "tackle"
		this.move2 = "growl";
		// this.primaryType = game.wildPokemonArray[0].types[]
	},
	
	// wildPkmnAbilityGetter: function(game.wildPokemonArray[0]) {
	// 	return "abilityTest"
	// },

	trainerPokemonGet: function() {
		var FirebaseURL = 'https://pokemon-golden-silver.firebaseio.com'
		var userId = "1A";
		$.ajax({
			url: `${FirebaseURL}/pokemon/.json?orderBy="trainerID"&equalTo="${userId}"`
		})
		.done(function(result) {
			console.log("Trainer Loaded!", result);
			wildBattleStart.trainerPokemonSort(result);
		})
		.fail(function() {
			console.log("error");
		})
	},

	trainerPokemonSort: function(result) {
		game.partyPokemon = [];
		for(var pokemon in result){
		    game.partyPokemon.push(result[pokemon]);
		 }

	}
}









