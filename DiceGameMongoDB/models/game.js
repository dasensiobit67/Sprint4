const mongoose = require("mongoose");
var Player = mongoose.model('Player');
var Schema = mongoose.Schema;

const Game = new mongoose.Schema({
    dice1: Number,
    dice2: Number,
    winorlose: Boolean,
    idplayer: {type: Schema.ObjectId, ref: "Player"}
});

module.exports = mongoose.model("Game", Game);