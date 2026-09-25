import type { ImageProps } from 'next/image';
import clearDay from '@meteocons/svg/fill/clear-day.svg';
import clearDayStatic from '@meteocons/svg-static/fill/clear-day.svg';
import cloudy from '@meteocons/svg/fill/cloudy.svg';
import cloudyStatic from '@meteocons/svg-static/fill/cloudy.svg';
import drizzle from '@meteocons/svg/fill/drizzle.svg';
import drizzleStatic from '@meteocons/svg-static/fill/drizzle.svg';
import fog from '@meteocons/svg/fill/fog.svg';
import fogStatic from '@meteocons/svg-static/fill/fog.svg';
import partlyCloudyDay from '@meteocons/svg/fill/partly-cloudy-day.svg';
import partlyCloudyDayStatic from '@meteocons/svg-static/fill/partly-cloudy-day.svg';
import partlyCloudyDayRain from '@meteocons/svg/fill/partly-cloudy-day-rain.svg';
import partlyCloudyDayRainStatic from '@meteocons/svg-static/fill/partly-cloudy-day-rain.svg';
import rain from '@meteocons/svg/fill/rain.svg';
import rainStatic from '@meteocons/svg-static/fill/rain.svg';
import snow from '@meteocons/svg/fill/snow.svg';
import snowStatic from '@meteocons/svg-static/fill/snow.svg';
import thunderstorms from '@meteocons/svg/fill/thunderstorms.svg';
import thunderstormsStatic from '@meteocons/svg-static/fill/thunderstorms.svg';

export type WeatherIconSource = ImageProps['src'];

export type WeatherConditionCategory =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'showers'
  | 'storm'
  | 'unknown';

export interface WeatherCondition {
  category: WeatherConditionCategory;
  description: string;
  icon: WeatherIconSource;
  staticIcon: WeatherIconSource;
  color: string;
}

const iconsByCategory: Record<
  WeatherConditionCategory,
  { icon: WeatherIconSource; staticIcon: WeatherIconSource }
> = {
  clear: { icon: clearDay, staticIcon: clearDayStatic },
  'partly-cloudy': { icon: partlyCloudyDay, staticIcon: partlyCloudyDayStatic },
  cloudy: { icon: cloudy, staticIcon: cloudyStatic },
  fog: { icon: fog, staticIcon: fogStatic },
  drizzle: { icon: drizzle, staticIcon: drizzleStatic },
  rain: { icon: rain, staticIcon: rainStatic },
  snow: { icon: snow, staticIcon: snowStatic },
  showers: { icon: partlyCloudyDayRain, staticIcon: partlyCloudyDayRainStatic },
  storm: { icon: thunderstorms, staticIcon: thunderstormsStatic },
  unknown: { icon: cloudy, staticIcon: cloudyStatic },
};

function createWeatherCondition(
  category: WeatherConditionCategory,
  description: string,
  color: string
): WeatherCondition {
  return {
    category,
    description,
    ...iconsByCategory[category],
    color,
  };
}

export function getWeatherCondition(code: number): WeatherCondition {
  switch (code) {
    case 0:
      return createWeatherCondition('clear', 'Céu limpo', 'var(--weather-sunny)');

    case 1:
    case 2:
      return createWeatherCondition(
        'partly-cloudy',
        code === 1 ? 'Principalmente limpo' : 'Parcialmente nublado',
        'var(--weather-partly-cloudy)'
      );

    case 3:
      return createWeatherCondition('cloudy', 'Nublado', 'var(--weather-cloudy)');

    case 45:
    case 48:
      return createWeatherCondition('fog', 'Neblina', 'var(--weather-fog)');

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return createWeatherCondition('drizzle', 'Garoa', 'var(--weather-drizzle)');

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
      return createWeatherCondition(
        code >= 80 ? 'showers' : 'rain',
        code >= 80 ? 'Pancadas de chuva' : 'Chuva',
        'var(--weather-rain)'
      );

    case 71:
    case 73:
    case 75:
    case 77:
      return createWeatherCondition('snow', 'Neve', 'var(--weather-snow)');

    case 95:
    case 96:
    case 99:
      return createWeatherCondition('storm', 'Tempestade', 'var(--weather-storm)');

    default:
      return createWeatherCondition(
        'unknown',
        'Condição desconhecida',
        'var(--weather-cloudy)'
      );
  }
}
