'use client'
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSun,
  Snowflake,
  Sun,
} from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  clima: WeatherData;
}

function descricaoClima(codigo: number) {
  switch (codigo) {
    case 0:
      return { descricao: 'Céu limpo', Icone: Sun };

    case 1:
      return { descricao: 'Principalmente limpo', Icone: CloudSun };

    case 2:
      return { descricao: 'Parcialmente nublado', Icone: CloudSun };

    case 3:
      return { descricao: 'Nublado', Icone: Cloud };

    case 45:
    case 48:
      return { descricao: 'Neblina', Icone: CloudFog };

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { descricao: 'Garoa', Icone: CloudDrizzle };

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return { descricao: 'Chuva', Icone: CloudRain };

    case 71:
    case 73:
    case 75:
    case 77:
      return { descricao: 'Neve', Icone: Snowflake };

    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return { descricao: 'Pancadas de chuva', Icone: CloudRain };

    case 95:
    case 96:
    case 99:
      return { descricao: 'Tempestade', Icone: CloudLightning };

    default:
      return { descricao: 'Condição desconhecida', Icone: Cloud };
  }
}

export default function WeatherCard({clima}: WeatherCardProps) {
  const { descricao, Icone } = descricaoClima(clima.current.weather_code);

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
          <Icone size={48} aria-hidden="true" />
          <span>{descricao}</span>
        </p>
      </div>

      <div className="weather-details">
        <p><span>Umidade💧 </span><strong>{clima.current.relative_humidity_2m}%</strong></p>
        <p><span>Vento💨</span><strong>{clima.current.wind_speed_10m} m/s</strong></p>
      </div>

    </section>
  );
}
