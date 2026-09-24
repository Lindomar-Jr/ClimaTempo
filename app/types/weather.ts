// Contrato compartilhado pelos dados atuais e pela previsão diária da Forecast API.
export interface WeatherForecast {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
  // Previsões individuais por hora, adaptadas ao modelo da aplicação.
    hourly: HourlyWeather[];
}

// extends compõe a previsão e acrescenta a localização escolhida pelo usuário.
export interface WeatherData extends WeatherForecast {
  location: {
    name: string;
    country: string;
    admin1: string;
    latitude: number;
    longitude: number;
  };
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitation: number;
}

export interface OpenMeteoHourlyData {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation: number[];
}

export interface OpenMeteoForecastResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
  hourly: OpenMeteoHourlyData;
}