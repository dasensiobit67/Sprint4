const jwt = require('jsonwebtoken')
var x

const verifyToken =  (req, res, next) => {
    const token = req.headers['acces-token']
    if(!token){
        console.log("Falta token!");
        res.send({message: "Falta token!"})
    }
    else{
        console.log("\nToken: "+token)
        try{
            x = jwt.verify(token, "TokenSuperSeguro");
            console.log("\nToken Correcta!");
            next();
        }
        catch{
            console.log("\nToken invalida!");
            res.send({message: "Token invalida!"})
        }
    }
    
}

module.exports = verifyToken