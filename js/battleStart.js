"use strict";

let trainerLoaded;
let battleStarted

var wildBattleStart = {
	create: function() {
		trainerLoaded = false
		battleStarted = false
		var loading = game.add.sprite(0, 0, 'loading');
		loading.animations.add('loadLoop');
		loading.animations.play('loadLoop', 4, true);
	},

	battleReady: function() {
		if (battleStarted === false) {
			if (trainerLoaded) {
				battleStarted = true
				game.state.start('wildPkmnBattle');
			} else {
				console.log('Not yet ready. Trying agin in 50ms');
			}
		}
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
			console.log('playerPos',playerPos);
		} else {
			console.log("no encounter");
		}
	},

	pokemonEncounter: function(location) {
		var encountered = location[Math.floor(Math.random() * location.length)]
		$.ajax({
			// url: `http://pokeapi.co/api/v2/pokemon/${encountered}`
			url: `${game.FirebaseURL}/backupPokemon/.json?orderBy="id"&equalTo=${encountered}`
		})
		.done(function(result) {
			wildBattleStart.battleSetup(result);
			setInterval(wildBattleStart.battleReady, 50)
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
		this.currentSpeed = game.wildPokemonArray[0].stats[0].base_stat;
		this.currentSpecDef = game.wildPokemonArray[0].stats[1].base_stat;
		this.currentSpecAtck = game.wildPokemonArray[0].stats[2].base_stat;
		this.currentDef = game.wildPokemonArray[0].stats[3].base_stat;
		this.currentAtck = game.wildPokemonArray[0].stats[4].base_stat;
		this.currentHp = game.wildPokemonArray[0].stats[5].base_stat;
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
		$.ajax({
			url: `${game.FirebaseURL}/pokemon/.json?orderBy="trainerID"&equalTo="${game.userId}"`
		})
		.done(function(result) {
			wildBattleStart.trainerPokemonSort(result);
		})
		.fail(function() {
			console.log("error");
		})
	},

	trainerPokemonSort: function(result) {
		game.partyPokemon = [];
		var i = 0
		for(var pokemon in result){
		    game.partyPokemon.push(result[pokemon]);
		 }
		console.log("Trainer Loaded!", game.partyPokemon);
		trainerLoaded = true
		Object.keys(result).forEach(function(key){
    		console.log("done");
    		result[key].pokemonKey = key;
   			// game.partyPokemon[i].FBKey = result[key].pokemonKey;
			i++;
		});
	}
}
