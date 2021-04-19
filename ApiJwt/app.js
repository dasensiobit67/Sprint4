const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const routes = require('./controllers/routes')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

routes(app)

app.listen(3000,(error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log('Server listen on port 3000')
})
