const mongoose = require("mongoose");

// Parametros de conexion
const USER = "user";
const PASSWORD = "zTF9dIFnSmUKSCcL";
const DATA_BASE = "DiceGame";

const cnx = mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.ydsm3.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true 
    }, function (err) {
 
        if (err) throw err;
 
        console.log(`Conectado a MongoDB Atlas - ${DATA_BASE}`);
 
    });

// Export the connection
module.exports =  cnx;