const mongoose = require("mongoose");

const Player = new mongoose.Schema({
        playername:{
            type: String,
            unique: true,
            trim: true,
            lowercase: true
          },
        datareg:{
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model("Player", Player);