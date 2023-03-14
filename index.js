const express = require('express');

const { engine } = require('express-handlebars');
const bodyparser = require('body-parser');

const equiposObj = require('./data/equipos.json');
const carrerasObj =  require('./data/carreras.json');

//const queries = require('./lib/queries');
const functions =  require('./lib/functions');


// queries.createDatabase();

const app = express();
const port = 3000;

// Parsea la información
let resultados= [];

// res.send(equiposObj.equipos);
const pilotosList = [];
equiposObj.equipos.forEach(equipo => {
  pilotosList.push({ piloto: equipo.piloto1, escuderia: equipo.escuderia });
  pilotosList.push({ piloto: equipo.piloto2, escuderia: equipo.escuderia });
});


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
  res.render('home', {
    carreras: carrerasObj.carreras, 
    puntajes: functions.resultadosPorPiloto(pilotosList, resultados, carrerasObj.carreras),
  });
})

app.get('/resultados-form', (req, res) => {
  // renderiza la informacion
  res.render('resultados-form', { 
    pilotos: pilotosList, 
    carreras: carrerasObj.carreras 
  });
})

app.get('/resultados-por-escuderia', (req, res) => {
  res.render('resultados-escuderia', {
    carreras: carrerasObj.carreras, 
    puntajes: functions.resultadosPorEscuderia(equiposObj.equipos, resultados, carrerasObj.carreras),
  });
})

app.get('/resultados-por-abandono', (req, res) => {
  res.render('resultados-por-abandono');
})

app.post('/registrar-resultado', (req, res) => {
  // En caso de que existan resultados para el circutos
  // se considera una que es una actualización 
  // asi que elimina resultados del circuito actual
  const resultadosAux = resultados.filter( 
    (resultado) => resultado.circuito_id !== req.body.circuito
  ); 

  // parse info
  for (let i=0; i < req.body.piloto.length; i++) {
    resultadosAux.push({
      circuito_id: req.body.circuito,
      piloto: req.body.piloto[i],
      escuderia: req.body.escuderia[i],
      minutos: req.body.minutos[i],
      lugar: req.body.lugar[i],
      abandono: req.body.abandono[i],
    });
  }

  resultados = resultadosAux;

  res.send('Resultados Registrado <br> <a href="/">Volver</a>');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})