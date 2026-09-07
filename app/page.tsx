'use client'
import { useState } from 'react';
import SearchCity from './components/SearchCity';
import { WeatherData } from './types/weather';
import WeatherCard from './components/WeatherCard';

interface WeatherCardProps {
  clima: WeatherData;
}

export default function Home() {

  const [clima, setClima] = useState<WeatherData | null>(null);

  async function buscarClima(cidade: string) {
    //transfroma a cidade em latitude e longitude através da API de geocoding
    const resposta = await fetch(
       `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt`
    );

    const dados = await resposta.json();

    const latitude = dados.results[0].latitude;
    const longitude = dados.results[0].longitude;

   /* Usa latitude e longitude convertida a cima,
      para buscar o clima atual da cidade através da API open-meteo */

    const respostaClima = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
    );

    const dadosClima = await respostaClima.json();

    setClima(dadosClima);
  };

  return (

/* No componente Home, ao renderizar SearchCity,
   passamos a função buscarClima através da prop aoBuscar.
   Dessa forma, entregamos a referência da função criada no componente pai para o componente filho.*/

    <main className="weather-page">
      <div className="weather-shell">
        <header className="weather-header">
          <span className="weather-kicker">Previsão local</span>
          <h1>Clima Tempo</h1>
          <p>Consulte o clima da sua cidade:</p>
        </header>

        <SearchCity aoBuscar={buscarClima} />
        {clima && <WeatherCard clima={clima} />}
      </div>
      
    </main>
  );
}