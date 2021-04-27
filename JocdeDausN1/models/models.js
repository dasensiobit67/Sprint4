//En la version Mysql no utilizo models, 
//pero los utilizare para la version de MongoDB

class User{
    constructor(iduser, username, datareg){
        this.iduser = iduser,
        this.username = username,
        this.datareg = datareg
    }
}

class Tirada{
    constructor(idtirada, dau1, dau2, winorlose, iduser){
        this.idtirada = idtirada,
        this.dau1 = dau1,
        this.dau2 = dau2,
        this.winorlose = winorlose,
        this.iduser = iduser
    }

}

class Rankings{
    constructor(iduser, wins, totals){
        this.iduser = iduser,
        this.wins = wins,
        this.totals = totals
    }

}

module.exports = {User, Tirada, Rankings};