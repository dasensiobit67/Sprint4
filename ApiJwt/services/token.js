const jwt = require('jsonwebtoken')

function createToken(){
    const payload ={check: true}
    const token = jwt.sign(payload,'TokenSuperSeguro',{expiresIn: 300})
    console.log(token)
    return token
}

module.exports = {createToken}