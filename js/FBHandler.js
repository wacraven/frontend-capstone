var provider = new firebase.auth.GoogleAuthProvider();

var trainerFB = [];
var user;

var beginSignIn = function() {
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
	  // The signed-in user info.
		user = result.user;
	  // ...
		var pkmnLogo = $('#pkmnLogo');
		var pikaLogo = $('#pikaLogo');
		var gameDiv = $('#gameDiv');
		var loginBtn = $('#loginBtn');
		var logOutBtn = $('#logOutBtn');
		pkmnLogo.removeClass('pkmnHeader-big');
		pkmnLogo.addClass('pkmnHeader-small');
		pikaLogo.removeClass('hidden');
		loginBtn.addClass('hidden');
		gameDiv.removeClass('hidden');
		logOutBtn.removeClass('hidden');

		game.userId = user.uid;
		game.FirebaseURL = FBConfig.databaseURL

		$.ajax({
			url: `${FBConfig.databaseURL}/trainers/.json?orderBy="uid"&equalTo="${user.uid}"`
		})
		.done(function(result) {
			if (jQuery.isEmptyObject(result)) {
				var trainerObj = {
					playerPosX: 1530,
					playerPosY: 1110,
					uid: user.uid
				}
				$.ajax({
					url: `${FBConfig.databaseURL}/trainers/.json`,
					type: 'POST',
					data: JSON.stringify(trainerObj),
				})
				.done(function(result) {
					// console.log('new trainer create response', result);
					trainerKey = result.name;
				})
				.fail(function() {
					console.log("error");
				});
			} else {
				console.log(result)
				Object.keys(result).forEach(function(key){
            		console.log("done");
            		result[key].trainerFBKey = key;
           			trainerFB.push(result[key]);
           		})
           		trainerKey = trainerFB[0].trainerFBKey
           		newTrainerCheck(user.uid);
			}
		})
		.fail(function() {
			console.log("error");
		});
		
	}).catch(function(error) {
	  // Handle Errors here.
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  // The email of the user's account used.
	  	var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  	var credential = error.credential;
	  // ...
	});
}

var beginSignOut = function() {
	playerPos.x = player.body.x;
	playerPos.y = player.body.y;
	var trainerObj = {
		playerPosX: playerPos.x,
		playerPosY: playerPos.y,
		uid: user.uid
	}

	$.ajax({
		url: `${FBConfig.databaseURL}/trainers/${trainerKey}.json`,
		type: 'PUT',
		data: JSON.stringify(trainerObj),
	})
	.done(function() {
		console.log("success");
		trainerFB = [];
		trainerKey = '';
	})
	.fail(function() {
		console.log("error");
	});
	
	

	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
		var pkmnLogo = $('#pkmnLogo');
		var pikaLogo = $('#pikaLogo');
		var gameDiv = $('#gameDiv');
		var loginBtn = $('#loginBtn');
		var logOutBtn = $('#logOutBtn');
		pkmnLogo.addClass('pkmnHeader-big');
		pkmnLogo.removeClass('pkmnHeader-small');
		pikaLogo.addClass('hidden');
		loginBtn.removeClass('hidden');
		gameDiv.addClass('hidden');
		logOutBtn.addClass('hidden');

	}, function(error) {
	  // An error happened.
	});
}

var newTrainerCheck = function(user) {
	console.log("newTrainerCheck");
	$.ajax({
		url: `${FBConfig.databaseURL}/pokemon/.json?orderBy="trainerID"&equalTo="${user}"`
	})
	.done(function(result) {
		if (jQuery.isEmptyObject(result)) {
			var starters = [1,4,7];
			var starterPicker = Math.floor(Math.random() * starters.length);
			var newStarter = starters[starterPicker];
			console.log("newStarter", newStarter);
			getStarter(newStarter);	
		} else {
			console.log("existing player");
			playerPos.x = parseInt(trainerFB[0].playerPosX)
			playerPos.y = parseInt(trainerFB[0].playerPosY)
			game.state.start('preloadState');
		}
	})
	.fail(function() {
		console.log("error");
	})
}

var getStarter = function(newStarter) {
	$.ajax({
		url: `${FBConfig.databaseURL}/backupPokemon/.json?orderBy="id"&equalTo=${newStarter}`,
	})
	.done(function(result) {
		console.log("getStarter result", result);
		starterPokemon = new starterBuilder(result);
		console.log("starterPokemon", starterPokemon);
		postStarter(starterPokemon);
	})
	.fail(function() {
		console.log("error");
	})		
}

var starterBuilder = function(result) {
	game.newStarterArray = [];
	for(var pokemon in result){
	    game.newStarterArray.push(result[pokemon]);
	 }
	this.pokedexId = game.newStarterArray[0].id;
	this.commonName = game.newStarterArray[0].forms[0].name;
	this.frontSprite = `/assets/sprites/pokemon/${this.commonName}-front.png`;
	this.backSprite = `/assets/sprites/pokemon/${this.commonName}-back.png`;
	// this.ability = wildPkmnAbilityGetter(game.newStarterArray[0]);
	this.baseSpeed = game.newStarterArray[0].stats[0].base_stat;
	this.baseSpecDef = game.newStarterArray[0].stats[1].base_stat;
	this.baseSpecAtck = game.newStarterArray[0].stats[2].base_stat;
	this.baseDef = game.newStarterArray[0].stats[3].base_stat;
	this.baseAtck = game.newStarterArray[0].stats[4].base_stat;
	this.baseHp = game.newStarterArray[0].stats[5].base_stat;
	this.currentSpeed = game.newStarterArray[0].stats[0].base_stat;
	this.currentSpecDef = game.newStarterArray[0].stats[1].base_stat;
	this.currentSpecAtck = game.newStarterArray[0].stats[2].base_stat;
	this.currentDef = game.newStarterArray[0].stats[3].base_stat;
	this.currentAtck = game.newStarterArray[0].stats[4].base_stat;
	this.currentHp = game.newStarterArray[0].stats[5].base_stat;
	// this.move1 = game.newStarterArray[0].moves[0].move.name;
	// this.move2 = game.newStarterArray[0].moves[1].move.name;
	this.move1 = "tackle"
	this.move2 = "growl";
	this.trainerID = user.uid;
}

var postStarter = function(pokemon) {
	$.ajax({
		url: `${FBConfig.databaseURL}/pokemon/.json`,
		type: 'POST',
		data: JSON.stringify(pokemon)
	})
	.done(function() {
		console.log("success");
		game.state.start('preloadState');
	})
	.fail(function() {
		console.log("Error saving caught Pokemon");
	});
}
