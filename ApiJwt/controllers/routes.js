const services = require('../services/services')
const verifyToken = require('../middlewares/verifytoken')

const router = app => {
    app.post('/login', (req,res) => {
        const result = services.login(req.body.user, req.body.password)
        if(!result) res.json({message: 'Usuario o password incorrecto!'})
        else res.json({message: 'Bienvenido de nuevo!', token: result})
    })

    app.get('/data', verifyToken,  (req,res) => {
        const result = services.getData()
        res.send(result)

    })
}

module.exports = router