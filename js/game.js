"use strict";

var game = new Phaser.Game(400,300, Phaser.AUTO, 'gameDiv');
game.state.add('preloadState', preloadState);
game.state.add('main', main);
game.state.add('wildBattleStart', wildBattleStart);
game.state.add('wildPkmnBattle', wildPkmnBattle);

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

game.state.start('preloadState');