import { CityResult } from '../types/city';
import type { OpenMeteoForecastResponse } from '../types/weather';

interface GeocodingResult {
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
}

function normalizarTexto(texto: string): string {
// NFD separa a letra de seus sinais; assim, "ã" vira "a" + til.
// A regex remove esses sinais diacríticos, permitindo comparar "São" e "Sao".
// A flag u habilita o tratamento correto de caracteres Unicode.
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

// A relevância pertence ao tratamento dos dados, não ao componente que apenas os apresenta.
export function ordenarCidadesPorRelevancia(
  textoPesquisado: string,
  cidades: CityResult[]
): CityResult[] {
  const textoNormalizado = normalizarTexto(textoPesquisado);

  // map cria metadados temporários sem alterar os CityResult recebidos.
  return cidades
    .map((cidade, indice) => {
      const nomeNormalizado = normalizarTexto(cidade.name);
      let prioridade = 3;

      if (nomeNormalizado === textoNormalizado) {
        prioridade = 0;
      } else if (nomeNormalizado.startsWith(textoNormalizado)) {
        prioridade = 1;
      } else if (nomeNormalizado.includes(textoNormalizado)) {
        prioridade = 2;
      }

      return { cidade, indice, prioridade };
    })
    // O comparador define a ordem: prioridade menor vem primeiro; o índice
    // preserva a ordem da API quando dois resultados têm a mesma prioridade.
    .sort((primeiro, segundo) =>
      primeiro.prioridade - segundo.prioridade || primeiro.indice - segundo.indice
    )
    // Recupera somente as cidades depois da ordenação dos metadados temporários.
    .map(({ cidade }) => cidade);
}

export async function buscarCidades(cidade: string): Promise<CityResult[]> {
  const resposta = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=10&language=pt`
  );

  if (!resposta.ok) {
    throw new Error('Erro ao buscar localização da cidade');
  }

  const dados = await resposta.json();

  if (!dados.results || dados.results.length === 0) {
    throw new Error('Cidade não encontrada');
  }

  // A anotação separa o formato externo da API do modelo usado pela aplicação.
  const cidades = dados.results.map((resultado: GeocodingResult): CityResult => ({
      name: resultado.name,
      country: resultado.country,
      admin1: resultado.admin1,
      latitude: resultado.latitude,
      longitude: resultado.longitude,
    }));

  return ordenarCidadesPorRelevancia(cidade, cidades);
}

  export async function buscarClima(
    latitude: number,
    longitude: number
  ): Promise<OpenMeteoForecastResponse> {
    const parametros = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current:
        'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,weather_code,precipitation',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone: 'auto',
      forecast_days: '7',
    });

    const respostaClima = await fetch(
      `https://api.open-meteo.com/v1/forecast?${parametros}`
    );

    if (!respostaClima.ok) {
      throw new Error('Erro ao buscar clima');
    }

    const dadosClima = await respostaClima.json();

    return {
      current: dadosClima.current,
      daily: dadosClima.daily,
      hourly: dadosClima.hourly,
  };
}
