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
import type { LucideIcon } from 'lucide-react';

interface WeatherCondition {
  description: string;
  Icon: LucideIcon;
  color: string;
}

export function getWeatherCondition(code: number): WeatherCondition {
  switch (code) {
    case 0:
      return {
        description: 'Céu limpo',
        Icon: Sun,
        color: 'var(--weather-sunny)',
      };

    case 1:
    case 2:
      return {
        description: code === 1 ? 'Principalmente limpo' : 'Parcialmente nublado',
        Icon: CloudSun,
        color: 'var(--weather-partly-cloudy)',
      };

    case 3:
      return {
        description: 'Nublado',
        Icon: Cloud,
        color: 'var(--weather-cloudy)',
      };

    case 45:
    case 48:
      return {
        description: 'Neblina',
        Icon: CloudFog,
        color: 'var(--weather-fog)',
      };

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        description: 'Garoa',
        Icon: CloudDrizzle,
        color: 'var(--weather-drizzle)',
      };

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return {
        description: code >= 80 ? 'Pancadas de chuva' : 'Chuva',
        Icon: CloudRain,
        color: 'var(--weather-rain)',
      };

    case 71:
    case 73:
    case 75:
    case 77:
      return {
        description: 'Neve',
        Icon: Snowflake,
        color: 'var(--weather-snow)',
      };

    case 95:
    case 96:
    case 99:
      return {
        description: 'Tempestade',
        Icon: CloudLightning,
        color: 'var(--weather-storm)',
      };

    default:
      return {
        description: 'Condição desconhecida',
        Icon: Cloud,
        color: 'var(--weather-cloudy)',
      };
  }
}
