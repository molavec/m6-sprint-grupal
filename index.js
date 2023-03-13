const express = require('express');
const { engine } = require('express-handlebars');

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

app.get('/', (req, res) => {
  res.render('home', {carreras: carrerasObj.carreras });
})

app.get('/resultados-form', (req, res) => {
  // res.send(equiposObj.equipos);
  const equiposList = [];
  equiposObj.equipos.forEach(equipo => {
    equiposList.push({ piloto: equipo.piloto1, escuderia: equipo.escuderia });
    equiposList.push({ piloto: equipo.piloto2, escuderia: equipo.escuderia });

  });
  res.send(equiposList);

  // res.render('resultados-form');
})

app.get('/resultados-por-escuderia', (req, res) => {
  res.render('resultados-por-escuderia');
})

app.get('/resultados-por-abandono', (req, res) => {
  res.render('resultados-por-abandono');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})