const player = require('../models/player');
const game = require('../models/game');

async function getPlayers(){
        const result = await player.find();
        return result;
    }
    


async function getGamesByPlayer(id){
    const rows = await game.find({'idplayer': id});
    return rows;
}

async function setPlayer(newplayer){
    if(newplayer.playername == ""){
        const date = new Date();
        newplayer.playername = "Anonimo" + Date.parse(date);
    }
    const result = await player.create({playername: newplayer.playername});
    return result;
}

async function setGame(id){
    let winorlose = false;
    const dau1 = Math.floor(Math.random()*6)+1;
    const dau2 = Math.floor(Math.random()*6)+1;

    if(dau1+dau2 == 7){
        winorlose = true;
    }
    const result = await game.create(
        {
            dice1: dau1, 
            dice2: dau2, 
            winorlose: winorlose, 
            idplayer: id            
        });
    return result;
}

async function updatePlayerById(id, newname){
    var update = {
        $set:{playername: newname}
        }
    const result = await player.findOneAndUpdate({_id: id}, update, {new:true});
    return result;
}

async function deleteGamesById(id){
    const result = await game.deleteMany({'idplayer': id});
    return result;
}

async function getRankings(){
    var wins = [];
    var rankings = {table:[]};
    var identifiers = await player.find({},{_id:1, playername:0, datareg:0,__v:0});
    
    for(i=0;i<identifiers.length;i++){
        const win = await game.find({winorlose:true, idplayer:identifiers[i]._id}).count();
        const total = await game.find({idplayer:identifiers[i]._id}).count();
        rankings.table.push({iduser: identifiers[i]._id, wins: win, totals: total});

        console.log(`${identifiers[i]._id} = ${win} / ${total}`);
    }
    return rankings;    
}

async function getLoser(){
    const result = await getRankings();
    result.table.sort(function (a, b) {
        if (a.wins > b.wins) {
          return 1;
        }
        if (a.wins < b.wins) {
          return -1;
        }
        // si a es igal a b
        return 0;
      });
    
    return result.table[0];

}

async function getWinner(){
    const result = await getRankings();
    result.table.sort(function (a, b) {
        if (a.wins < b.wins) {
          return 1;
        }
        if (a.wins > b.wins) {
          return -1;
        }
        // si a es igal a b
        return 0;
      });
    
    return result.table[0];
    
}

module.exports = {getPlayers, getGamesByPlayer, setPlayer, 
    setGame, updatePlayerById, deleteGamesById,
    getRankings, getLoser, getWinner};