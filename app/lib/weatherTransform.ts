import { getWeatherCondition } from './weatherConditions';
import type { WeatherConditionCategory } from './weatherConditions';
import type { HourlyWeather, OpenMeteoHourlyData } from '../types/weather';

interface CodeStats {
  count: number;
  firstIndex: number;
}

interface CategoryStats extends CodeStats {
  codes: Map<number, CodeStats>;
}

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

export function calcularCondicoesPredominantes(
  previsao: HourlyWeather[],
  datas: string[],
  codigosFallback: number[]
): number[] {
  const categoriasPorDia = new Map<
    string,
    Map<WeatherConditionCategory, CategoryStats>
  >();

  previsao.forEach((horario, indice) => {
    if (!horario.time || typeof horario.weatherCode !== 'number') {
      return;
    }

    const data = horario.time.slice(0, 10);
    const categoria = getWeatherCondition(horario.weatherCode).category;
    const categorias = categoriasPorDia.get(data) ?? new Map();
    const categoriaAtual = categorias.get(categoria) ?? {
      count: 0,
      firstIndex: indice,
      codes: new Map(),
    };
    const codigoAtual = categoriaAtual.codes.get(horario.weatherCode) ?? {
      count: 0,
      firstIndex: indice,
    };

    categoriaAtual.count += 1;
    codigoAtual.count += 1;
    categoriaAtual.codes.set(horario.weatherCode, codigoAtual);
    categorias.set(categoria, categoriaAtual);
    categoriasPorDia.set(data, categorias);
  });

  return datas.map((data, indice) => {
    const categorias = categoriasPorDia.get(data);

    if (!categorias || categorias.size === 0) {
      return codigosFallback[indice] ?? 3;
    }

    // Empates usam a primeira categoria observada, mantendo o resultado determinístico.
    const categoriaPredominante = [...categorias.values()].reduce(
      (predominante, atual) =>
        atual.count > predominante.count ||
        (atual.count === predominante.count &&
          atual.firstIndex < predominante.firstIndex)
          ? atual
          : predominante
    );

    return [...categoriaPredominante.codes.entries()].reduce(
      (codigoPredominante, [codigo, atual]) =>
        atual.count > codigoPredominante.stats.count ||
        (atual.count === codigoPredominante.stats.count &&
          atual.firstIndex < codigoPredominante.stats.firstIndex)
          ? { codigo, stats: atual }
          : codigoPredominante,
      {
        codigo: codigosFallback[indice] ?? 3,
        stats: { count: 0, firstIndex: Number.MAX_SAFE_INTEGER },
      }
    ).codigo;
  });
}
