'use client'
import { useState } from 'react';
import SearchCity from './components/SearchCity';
import { WeatherData } from './types/weather';
import WeatherCard from './components/WeatherCard';
import { buscarClima as buscarClimaOpenMeteo } from './lib/openMeteo';

export default function Home() {

  const [clima, setClima] = useState<WeatherData | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function buscarClima(cidade: string) {
    setErro(null);

    try {
      const dadosClima = await buscarClimaOpenMeteo(cidade);
      setClima(dadosClima);
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      }
    }
  };

  /* No componente Home, ao renderizar SearchCity,
   passamos a função buscarClima através da prop aoBuscar.
   Dessa forma, entregamos a referência da função criada no componente pai para o componente filho.*/

  return (

    <main className="weather-page">
      <div className="weather-shell">
        <header className="weather-header">
          <span className="weather-kicker">Previsão local</span>
          <h1>Clima Tempo</h1>
          <p>Consulte o clima da sua cidade:</p>
        </header>

        <SearchCity aoBuscar={buscarClima} />
        {erro && <p>{erro}</p>}
        {clima && <WeatherCard clima={clima} />}
      </div>
      
    </main>
  );
}
