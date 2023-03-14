const express = require('express');
const { engine } = require('express-handlebars');
const bodyparser = require('body-parser');

const equiposObj = require('./data/equipos.json');
const carrerasObj =  require('./data/carreras.json');
const resultadosExample =  require('./data/resultados');

const queries = require('./lib/queries');


queries.createDatabase();

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

// obtiene los resultados por piloto

const resultadosPorPiloto = (pilotos, resultados) => {
  
  // console.log('resultados', resultados)

  const resultadosPilotos = pilotos.map( (piloto) => {
    
    // Nombre del piloto
    const nombre = piloto.piloto;
    
    // puntajes del piloto para cada circuito
    const puntajes = [];
    puntajes.length = carrerasObj.carreras.length;
    
    // Puntaje acumulado del piloto
    let puntajeAcumulado = 0;
    
    // Completa el contenido de puntajes y puntajeAcumulado
    resultados.forEach((resultado) => {
      if (resultado.piloto == nombre){
        puntajes[resultado.circuito_id - 1] = puntajePorLugar(resultado.lugar);
        // console.log(`puntajes[] = `, puntajes);
        puntajeAcumulado += puntajePorLugar(resultado.lugar);
      }
    });

    return {
      nombre: nombre,
      puntajes: puntajes,
      puntajeAcumulado: puntajeAcumulado,
    }

  })

  // Ordena los resultados segun puntaje acumulado
  const sortedResults = resultadosPilotos.sort((a, b)=> b.puntajeAcumulado - a.puntajeAcumulado);

  // Añade el lugar en la clasificación general
  let counter = 0;
  sortedResults.forEach((result) => {
    result.lugar = ++ counter;
  })

  //console.log('sortedResults',sortedResults);
  return sortedResults;
}

const puntajePorLugar = (lugar) => {
  if(lugar == 1 ) return 25;
  if(lugar == 2 ) return 18;
  if(lugar == 3 ) return 15;
  if(lugar == 4 ) return 12;
  if(lugar == 5 ) return 10;
  if(lugar == 6 ) return 8;
  if(lugar == 7 ) return 6
  if(lugar == 8 ) return 4;
  if(lugar == 9 ) return 2;
  if(lugar == 10 ) return 1;
  return 0;
}


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
    puntajes: resultadosPorPiloto(pilotosList, resultados),
  });
})

app.get('/resultados-form', (req, res) => {
  // renderiza la informacion
  res.render('resultados-form', { pilotos: pilotosList, carreras: carrerasObj.carreras });

})

app.get('/resultados-por-escuderia', (req, res) => {
  res.render('resultados-por-escuderia');
})

app.get('/resultados-por-abandono', (req, res) => {
  res.render('resultados-por-abandono');
})

app.post('/registrar-resultado', (req, res) => {
  

  // elimina resultados del circuito actual en caso de actualizacion
  const resultadosAux = resultados.filter( (resultado) => resultado.circuito_id !== req.body.circuito); 

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