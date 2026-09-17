'use client'
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  clima: WeatherData;
}

function descricaoClima(codigo: number) {
  switch (codigo) {
    case 0:
      return 'Céu limpo ☀️';

    case 1:
      return 'Principalmente limpo 🌤️';

    case 2:
      return 'Parcialmente nublado ⛅';

    case 3:
      return 'Nublado ☁️';

    default:
      return 'Condição desconhecida';
  }
}

export default function WeatherCard({clima}: WeatherCardProps) {

  return (
    <section className="weather-card" aria-labelledby="weather-card-title">
      <div className="weather-card-heading">
        <div>
          <span className="weather-card-label">Agora</span>
          <h2 id="weather-card-title">Clima atual</h2>
          <p>{clima.location.name}, {clima.location.admin1}</p>
        </div>
        <span className="weather-status" aria-hidden="true">●</span>
      </div>

      <div className="weather-primary">
        <p className="weather-temperature">{clima.current.temperature_2m}°C</p>
        <p className="weather-condition">{descricaoClima(clima.current.weather_code)}</p>
      </div>

      <div className="weather-details">
        <p><span>Umidade💧 </span><strong>{clima.current.relative_humidity_2m}%</strong></p>
        <p><span>Vento💨</span><strong>{clima.current.wind_speed_10m} m/s</strong></p>
      </div>

    </section>
  );
}
