import type { HourlyWeather, OpenMeteoHourlyData } from '../types/weather';

export function transformarPrevisaoHoraria(
  dados: OpenMeteoHourlyData
): HourlyWeather[] {
  return dados.time.map((time, indice) => ({
    time,
    temperature: dados.temperature_2m[indice],
    weatherCode: dados.weather_code[indice],
    precipitation: dados.precipitation[indice],
  }));
}

export function selecionarPrevisaoPorDia(
  previsao: HourlyWeather[],
  data: string
): HourlyWeather[] {
  return previsao.filter((horario) => horario.time.slice(0, 10) === data);
}
