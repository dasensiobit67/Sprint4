const fs = require('fs')
const token = require('./token')

function login(usr, pass){
    var ok = false
    const data = JSON.parse(fs.readFileSync('./config/users.json'))
    
    data.forEach(el => {
        if(usr == el.user && pass == el.password){
           ok = token.createToken()
        }
    })
    return ok
}

function getData(){
    const data = fs.readFileSync('./config/data.json')
    return JSON.parse(data);
}

module.exports = {getData, login}