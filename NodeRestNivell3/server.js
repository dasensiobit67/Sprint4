const express = require('express')
const unlink = require('fs').unlink

const app = express()
const port = 3000

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'})

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('index.html')
});
app.get('/about', function(req, res) {
    res.render('about.html')
})

app.post('/upload',upload.single('photo'), (req, res) => {
  if(req.file) {
      if(req.file.mimetype != 'image/png' && req.file.mimetype != 'image/jpg'){
        unlink(req.file.path, (err) => {
          res.send("<h1>"+req.file.mimetype+ " no se puede subir! (Solo jpg o png)</h1>")
        })
      }
      else{
        //res.send("<script>window.alert('Fichero subido!');</script>")
        res.send("<h1>"+req.file.originalname+" Subido!</h1>")
      }
  }
  else{
    res.send('<h1>Falta fichero!</h1>')
  }
});

app.listen(port, () => {
  console.log(`Node Server Upload REST listening at http://localhost:${port}`)
})