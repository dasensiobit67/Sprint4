//Importo Services
const services = require('../services/services');

// Route the app
const router = app => {

    // Missatge de Benvinguda
    app.get('/', (request, response) => {
        response.status(200).send({message: 'Benvingut a Joc de Daus REST API!'});
    });

    // Retorna jugadors
        app.get('/players', async (request, response) => {
        let rows = await services.getPlayers();
        console.log(rows);
        response.status(200).send(rows);
        
    })
    
    // Retorna jugades per jugador
    app.get('/players/:id/games', async (request, response) => {
        const result = await services.getGamesByPlayer(request.params.id);
        console.log(result);
        response.status(200).send(result);
        });
    
    // Crea un jugador
    app.post('/players', async (request, response) => {
        try{
            const result = await services.setPlayer(request.body);
            console.log(result);
            response.status(201).send({message:`Jugador afegit amb ID: ${result.insertId}`});
        }
        catch{
            console.log("Error");
            response.status(500).send({message:`Error de Servidor`});
        }
        
        });
    
    // Realitza tirada d'un jugador
    app.post('/players/:id/games', async (request, response) => {
        try{
            const result = await services.setGame(request.params.id);
            console.log(result);
            response.status(201).send({message:`Tirada registrada amb ID: ${result.insertId}`});
        }
        catch{
            console.log("Error");
            response.status(500).send({message:`Error de Servidor`});
        }
        
    });

    // Modifica nom de jugador
    app.put('/players/:id', async (request, response) => {
        try{
            const result = await services.updatePlayerById(request.params.id, request.body.username);
            console.log(result);
            response.status(202).send({message:'Nom de jugador actualitzat.'});
        }
        catch{
            console.log("Error");
            response.status(500).send({message:`Error de Servidor`});
        }
        
    });

    // Elimina tirades de un jugador
    app.delete('/players/:id/games', async (request, response) => {
        try{
            const result = await services.deleteGamesById(request.params.id);
            console.log(result);
            response.status(202).send({message:`Tirades de jugador:${request.params.id} eliminades.`});
        }
        catch{
            console.log("Error");
            response.status(500).send({message:`Error de Servidor`});
        }
    });

    //Ranking de tots els jugadors
    app.get('/players/ranking', async (request, response) => {
        try{
            const result = await services.getRankings();
            console.log(result);
            response.status(200).send(JSON.stringify(result));
        }
        catch{
            console.log("Error");
            response.status(500).send({message:`Error de Servidor`});
        }
        
    });

    //Retorna el pitjor jugador
    app.get('/players/ranking/loser', async (request, response) => {
        try{
            const result = await services.getLoser();
            console.log(result);
            response.status(200).send(JSON.stringify(result));
        }
        catch{
            console.log("Error");
            response.status(500).send({message:`Error de Servidor`});
        } 

    });

    //Retorna el millor jugador
    app.get('/players/ranking/winner', async (request, response) => {
        try{
            const result = await services.getWinner();
            console.log(result);
            response.status(200).send(JSON.stringify(result));
        }
        catch{
            console.log("Error");
            response.status(500).send({message:`Error de Servidor`});
        } 
    });
}

module.exports = router;