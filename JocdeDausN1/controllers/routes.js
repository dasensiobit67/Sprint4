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
        const result = await services.setPlayer(request.body);
        console.log(result);
        response.status(201).send(`Jugador afegit amb ID: ${result.insertId}`);
        });
    
    // Realitza tirada d'un jugador
    app.post('/players/:id/games', async (request, response) => {
        const result = await services.setGame(request.params.id);
        console.log(result);
        response.status(201).send(`Tirada registrada amb ID: ${result.insertId}`);
    });

    // Modifica nom de jugador
    app.put('/players/:id', async (request, response) => {
        const result = await services.updatePlayerById(request.params.id, request.body.username);
        console.log(result);
        response.send('Nom de jugador actualitzat.');
    });

    // Elimina tirades de un jugador
    app.delete('/players/:id/games', async (request, response) => {
        const result = await services.deleteGamesById(request.params.id);
        console.log(result);
        response.send(`Tirades de jugador:${request.params.id} eliminades.`);
    });

    //Ranking de tots els jugadors
    app.get('/players/ranking', async (request, response) => {
        const result = await services.getRankings();
        console.log(result);
        response.send(`Ranking de jugadors:\n ${JSON.stringify(result)}`);
    });

    //Retorna el pitjor jugador
    app.get('/players/ranking/loser', async (request, response) => {
        const result = await services.getLoser();
        console.log(result);
        response.send(`Perdedor:\n ${JSON.stringify(result)}`);

    });

    //Retorna el millor jugador
    app.get('/players/ranking/winner', async (request, response) => {
        const result = await services.getWinner();
        console.log(result);
        response.send(`Ganador:\n ${JSON.stringify(result)}`);
    });
}

module.exports = router;