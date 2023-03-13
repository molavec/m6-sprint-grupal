const express = require('express');
const { engine } = require('express-handlebars');
const bodyparser = require("body-parser");

const equiposObj = require('./data/equipos.json');
const carrerasObj =  require('./data/carreras.json')


const app = express();
const port = 3000;

// configura el engine de template para que funcione con express.
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.set('partials', './partials');

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true,
}));

app.get('/', (req, res) => {
  res.render('home', {carreras: carrerasObj.carreras });
})

app.get('/resultados-form', (req, res) => {
  // res.send(equiposObj.equipos);
  const pilotosList = [];
  equiposObj.equipos.forEach(equipo => {
    pilotosList.push({ piloto: equipo.piloto1, escuderia: equipo.escuderia });
    pilotosList.push({ piloto: equipo.piloto2, escuderia: equipo.escuderia });

  });
  // res.send(pilotosList);
  console.log(pilotosList)
  res.render('resultados-form', {pilotos: pilotosList});

})

app.get('/resultados-por-escuderia', (req, res) => {
  res.render('resultados-por-escuderia');
})

app.get('/resultados-por-abandono', (req, res) => {
  res.render('resultados-por-abandono');
})

app.post('/registrar-resultado', (req, res) => {
  console.log(req.body)
  res.send('Formulario Enviado');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})