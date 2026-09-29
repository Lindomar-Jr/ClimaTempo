'use client'
import { CloudRain, Droplets, Gauge, Wind } from 'lucide-react';
import { getWeatherCondition } from '../lib/weatherConditions';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface WeatherCardProps {
  clima: WeatherData;
}

export default function WeatherCard({clima}: WeatherCardProps) {
  const condition = getWeatherCondition(clima.current.weather_code);

  return (
    <section className="weather-card" aria-labelledby="weather-card-title">
      <header className="weather-card-heading">
        <div className="weather-card-context">
          <span className="weather-card-label">Agora</span>
          <h2 id="weather-card-title">Clima atual</h2>
          <p>{clima.location.name}, {clima.location.admin1}</p>
        </div>
      </header>

      <div className="weather-primary">
        <div>
          <p className="weather-temperature">{clima.current.temperature_2m}°C</p>
        </div>
        <div className="weather-condition">
          <span className="weather-condition-icon">
            <WeatherIcon
              animatedSrc={condition.icon}
              staticSrc={condition.staticIcon}
              className="weather-current-icon"
              size={64}
            />
          </span>
          <span className="weather-condition-description">{condition.description}</span>
        </div>
      </div>

      <div className="weather-details">
        <p>
          <span className="weather-detail-label">
            <Droplets className="weather-detail-icon" size={16} aria-hidden="true" />
            Umidade
          </span>
          <strong>{clima.current.relative_humidity_2m}%</strong>
        </p>
        <p>
          <span className="weather-detail-label">
            <Wind className="weather-detail-icon" size={16} aria-hidden="true" />
            Vento
          </span>
          <strong>{clima.current.wind_speed_10m} m/s</strong>
        </p>
        <p>
          <span className="weather-detail-label">
            <Gauge className="weather-detail-icon" size={16} aria-hidden="true" />
            Pressão
          </span>
          <strong>{clima.current.pressure_msl} hPa</strong>
        </p>
        <p>
          <span className="weather-detail-label">
            <CloudRain className="weather-detail-icon" size={16} aria-hidden="true" />
            Chuva hoje
          </span>
          <strong>{clima.daily.precipitation_sum[0]} mm</strong>
        </p>
      </div>

    </section>
  );
}
