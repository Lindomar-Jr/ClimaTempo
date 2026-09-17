export interface WeatherData {
  location: {
    name: string;
    country: string;
    admin1: string;
    latitude: number;
    longitude: number;
  };
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
}
