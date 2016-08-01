"use strict";

$('#loginBtn').on('click', function() {
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

});

$('#logOutBtn').on('click', function() {
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
 });
