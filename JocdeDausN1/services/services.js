const query = require('../repository/repository');

async function getPlayers(){
    const rows = await query('SELECT * FROM user');
    return rows;
}

async function getGamesByPlayer(id){
    const rows = await query('SELECT * FROM tirada WHERE iduser = ?', id);
    return rows;
}

async function setPlayer(player){
    const date = new Date();

    if(player.username == ""){
        player.username = "Anonimo" + Date.parse(date);
    }
    player.datareg = date.getDate() + "-"+ parseInt(date.getMonth()+1) + "-" + date.getFullYear();
    
    try{
        const rows = await query('INSERT INTO user SET ?', player);
        return rows;
    }
    catch{
        throw new Error()
    }
}

async function setGame(id){
    let winorlose = false;
    const dau1 = Math.floor(Math.random()*6)+1;
    const dau2 = Math.floor(Math.random()*6)+1;

    if(dau1+dau2 == 7){
        winorlose = true;
    }
    try{
        const rows = await query(`insert into tirada (dau1, dau2, winorlose, iduser) values (${dau1}, ${dau2}, ${winorlose}, ${id})`);
        return rows
    }
    catch{
        throw new Error()
    }
    
}

async function updatePlayerById(id, newname){
    try{
        const rows = query(`UPDATE user SET username = "${newname}" WHERE iduser = ${id}`);
        return rows;
    }
    catch{
        throw new Error()
    }
    
}

async function deleteGamesById(id){
    try{
        const rows = query(`DELETE FROM tirada WHERE iduser = ${id}`);
        return rows;
    }
    catch{
        throw new Error()
    }
    
}

async function getRankings(){
    var wins = [];
    var totals = [];
    var rankings = {table:[]};

    try{
        const countusers = await query(`select count(iduser) as totusers from user`);
    
        for(i=1;i<countusers[0].totusers;i++){
            const countwins = await query(`select count(winorlose) as win from tirada where winorlose=1 and iduser=${i}`);
            wins[i] = countwins[0].win;
        }

        for(i=1;i<countusers[0].totusers;i++){
            const counttotals = await query(`select count(*) as total from tirada where iduser=${i}`);
            totals[i] = counttotals[0].total;
        }

        for(i=1;i<countusers[0].totusers;i++){
            rankings.table.push({iduser: i, wins: wins[i], totals: totals[i]});
        }
            
        return rankings;
    }
    catch{
        throw new Error()
    }

    
}

async function getLoser(){
    try{
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
    catch{
        throw new Error()   
    }

}

async function getWinner(){
    try{
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
    catch{
        throw new Error()   
    }
    
    
}

module.exports = {getPlayers, getGamesByPlayer, setPlayer, 
    setGame, updatePlayerById, deleteGamesById,
    getRankings, getLoser, getWinner};