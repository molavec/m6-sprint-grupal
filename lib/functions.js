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

const esAbandono = (valor) => {
  if(valor == "problemas-tecnicos") return 1;
  if(valor == "problemas-personales") return 1;
  if(valor == "NO") return 0;
  return 0;
}

// obtiene los resultados por piloto
const resultadosPorPiloto = (pilotos, resultados, carreras) => {
  
  // console.log('resultados', resultados)

  const resultadosPilotos = pilotos.map( (piloto) => {
    
    // Nombre del piloto
    const nombre = piloto.piloto;
    
    // puntajes del piloto para cada circuito
    const puntajes = [];
    puntajes.length = carreras.length;
    puntajes.fill(null)
    
    // Puntaje acumulado del piloto
    let puntajeAcumulado = 0;
    
    // Completa el contenido de puntajes y puntajeAcumulado
    resultados.forEach((resultado) => {
      if (resultado.piloto == nombre){
        puntajes[resultado.circuito_id - 1] = puntajePorLugar(resultado.lugar);
        console.log(`puntajes[] = `, puntajes);
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

// obtiene los resultados por escuderia
const resultadosPorEscuderia = (equipos, resultados, carreras) => {
  
  // console.log('resultados', resultados)

  const resultadosEscuderias = equipos.map( (equipo) => {
    
    // Nombre del escuderia
    const escuderia = equipo.escuderia;
    
    // puntajes del piloto para cada circuito
    const puntajes = [];
    puntajes.length = carreras.length;
    puntajes.fill(null)
    
    // Puntaje acumulado del piloto
    let puntajeAcumulado = 0;

    // Completa el contenido de puntajes y puntajeAcumulado
    resultados.forEach((resultado) => {
      if (resultado.escuderia == escuderia){
        puntajes[resultado.circuito_id - 1] += puntajePorLugar(resultado.lugar);
        // console.log(`puntajes[] = `, puntajes);
        puntajeAcumulado += puntajePorLugar(resultado.lugar);
      }
    });

    return {
      escuderia: escuderia,
      puntajes: puntajes,
      puntajeAcumulado: puntajeAcumulado,
    }

  })

  // Ordena los resultados segun puntaje acumulado
  const sortedResults = resultadosEscuderias.sort((a, b)=> b.puntajeAcumulado - a.puntajeAcumulado);

  // Añade el lugar en la clasificación general
  let counter = 0;
  sortedResults.forEach((result) => {
    result.lugar = ++ counter;
  })

  //console.log('sortedResults',sortedResults);
  return sortedResults;
}

// obtiene los resultados por piloto
const abandonosPorPiloto = (pilotos, resultados, carreras) => {
  
  
  console.log('pilotos', pilotos);
  // console.log('resultados', resultados);

  const abandonosPilotos = pilotos.map( (piloto) => {
    
    // Nombre del piloto
    const nombre = piloto.piloto;
    
    // abandonos del piloto para cada circuito
    const abandonos = [];
    abandonos.length = carreras.length;
    abandonos.fill(null)
    
    // Puntaje acumulado del piloto
    let abandonosAcumulado = 0;
    
    // Completa el contenido de abandonos y abandonosAcumulado
    resultados.forEach((resultado) => {
      if (resultado.piloto == nombre){
        abandonos[resultado.circuito_id - 1] = esAbandono(resultado.abandono);
        console.log(`abandonos = `, abandonos);
        abandonosAcumulado += esAbandono(resultado.abandono);
      }
    });

    return {
      nombre: nombre,
      abandonos: abandonos,
      abandonosAcumulado: abandonosAcumulado,
    }

  })

  // Ordena los abandonos segun abandonos acumulados
  const sortedResults = abandonosPilotos.sort(
      (a, b) => b.puntajeAcumulado - a.puntajeAcumulado
    );

  // Añade el lugar en la clasificación general
  let counter = 0;
  sortedResults.forEach((result) => {
    result.lugar = ++ counter;
  })

  //console.log('sortedResults',sortedResults);
  return sortedResults;
}


module.exports = {
  resultadosPorPiloto,
  resultadosPorEscuderia,
  abandonosPorPiloto,
};