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


// obtiene los resultados por piloto

const resultadosPorPiloto = (pilotos, resultados, carreras) => {
  
  // console.log('resultados', resultados)

  const resultadosPilotos = pilotos.map( (piloto) => {
    
    // Nombre del piloto
    const nombre = piloto.piloto;
    
    // puntajes del piloto para cada circuito
    const puntajes = [];
    puntajes.length = carreras.length;
    
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

module.exports = {
  resultadosPorPiloto,
};