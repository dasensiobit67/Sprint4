const express = require('express')
const app = express()
const port = 3000

const user = {name:'Dani', age:53, url:''}

app.get('/user', (req, res) => {
  user.url = req.protocol + "://" + req.get('host') + req.url
  console.log(`${user.name} ${user.age} ${user.url}`)  
  res.status(200).send({user})
})

app.listen(port, () => {
  console.log(`Node Server REST listening at http://localhost:${port}`)
})