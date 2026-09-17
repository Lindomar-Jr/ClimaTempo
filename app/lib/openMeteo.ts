import { WeatherData } from '../types/weather';

export async function buscarClima(cidade: string): Promise<WeatherData> {
  //transfroma a cidade em latitude e longitude através da API de geocoding
  const resposta = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt`
  );

  const dados = await resposta.json();

  if (!dados.results || dados.results.length === 0) {
    throw new Error('Cidade não encontrada');
  }

  const localizacao = dados.results[0];
  const latitude = localizacao.latitude;
  const longitude = localizacao.longitude;

  /* Usa latitude e longitude convertida a cima,
     para buscar o clima atual da cidade através da API open-meteo */
  const respostaClima = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
  );

  const dadosClima = await respostaClima.json();

  return {
    location: {
      name: localizacao.name,
      country: localizacao.country,
      admin1: localizacao.admin1,
      latitude,
      longitude,
    },
    current: dadosClima.current,
  };
}
