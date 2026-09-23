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
  };
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
