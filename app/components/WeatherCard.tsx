'use client'
import { getWeatherCondition } from '../lib/weatherConditions';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  clima: WeatherData;
}

export default function WeatherCard({clima}: WeatherCardProps) {
  const { description, Icon, color } = getWeatherCondition(clima.current.weather_code);

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
        <p className="weather-condition">
          <Icon size={48} style={{ color }} aria-hidden="true" />
          <span>{description}</span>
        </p>
      </div>

      <div className="weather-details">
        <p><span>Umidade💧 </span><strong>{clima.current.relative_humidity_2m}%</strong></p>
        <p><span>Vento💨</span><strong>{clima.current.wind_speed_10m} m/s</strong></p>
      </div>

    </section>
  );
}
