var randomEncounter = function() {
	var pkmnEncountered = Math.floor(Math.random() * 151 + 1);
	$.ajax({
		url: `http://pokeapi.co/api/v2/pokemon/${pkmnEncountered}`,
	})
	.done(function(result) {
		battleSetup(result);
	})
	.fail(function() {
		console.log("error");
	});
	
}

var battleSetup = function(result) {
	var wildPokemon = new wildPkmn(result);
	console.log("Wild Pokemon:", wildPokemon);
}

function wildPkmn(result){
	this.pokedexId = result.id;
	this.commonName = result.forms[0].name;
	this.frontSprite = `/assets/sprites/pokemon/${this.commonName}-front.png`;
	// this.ability = wildPkmnAbilityGetter(result);
	this.baseSpeed = result.stats[0].base_stat;
	this.baseSpecDef = result.stats[1].base_stat;
	this.baseSpecAtck = result.stats[2].base_stat;
	this.baseDef = result.stats[3].base_stat;
	this.baseAtck = result.stats[4].base_stat;
	this.baseHp = result.stats[5].base_stat;
};

// var wildPkmnAbilityGetter = function(result) {
// 	return "abilityTest"
// }