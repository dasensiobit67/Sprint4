// Require packages and set the port
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const routes = require('./controllers/routes')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});