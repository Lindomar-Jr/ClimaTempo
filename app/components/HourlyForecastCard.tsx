'use client';

import { useState, type Ref } from 'react';
import { getWeatherCondition } from '../lib/weatherConditions';
import {
  adicionarDiasNaData,
  obterDataAtualNoTimezone,
  selecionarPrevisaoPorDia,
} from '../lib/weatherTransform';
import type { HourlyWeather } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastCardProps {
  hourly: HourlyWeather[];
  sectionRef?: Ref<HTMLElement>;
  timezone: string;
  instanteAtual: Date;
}

function formatarNomeDoDia(
  data: string,
  timezone: string,
  instanteAtual: Date
) {
  const dataHoje = obterDataAtualNoTimezone(instanteAtual, timezone);
  const dataAmanha = adicionarDiasNaData(dataHoje, 1);

  if (data === dataHoje) {
    return 'Hoje';
  }

  if (data === dataAmanha) {
    return 'Amanhã';
  }

  const nomeDoDia = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
    weekday: 'long',
  }).format(new Date(`${data}T12:00:00Z`));

  return nomeDoDia.charAt(0).toUpperCase() + nomeDoDia.slice(1);
}

function formatarDataNumerica(data: string) {
  return `${data.slice(8, 10)}/${data.slice(5, 7)}`;
}

export default function HourlyForecastCard({
  hourly,
  sectionRef,
  timezone,
  instanteAtual,
}: HourlyForecastCardProps) {
  const [dataSelecionada, setDataSelecionada] = useState(
    hourly[0]?.time.slice(0, 10) ?? ''
  );

  const datasDisponiveis = Array.from(
    new Set(hourly.map((horario) => horario.time.slice(0, 10)))
  );
  const diaSelecionado = datasDisponiveis.includes(dataSelecionada)
    ? dataSelecionada
    : datasDisponiveis[0] ?? '';
  const previsaoDoDia = selecionarPrevisaoPorDia(hourly, diaSelecionado);

  if (hourly.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="hourly-forecast-card"
      aria-labelledby="hourly-forecast-card-title"
    >
      <header className="hourly-forecast-card-heading">
        <span className="forecast-card-label">Detalhes do dia</span>
        <h2 id="hourly-forecast-card-title">Previsão de hora em hora</h2>
      </header>

      <div className="hourly-date-selector" aria-label="Selecionar dia da previsão">
        {datasDisponiveis.map((data) => (
          <button
            className="hourly-date-button"
            type="button"
            key={data}
            aria-pressed={data === diaSelecionado}
            aria-label={`Selecionar ${formatarNomeDoDia(data, timezone, instanteAtual)}, ${formatarDataNumerica(data)}`}
            onClick={() => setDataSelecionada(data)}
          >
            <span className="hourly-date-label">
              {formatarNomeDoDia(data, timezone, instanteAtual)}
            </span>
            <span className="hourly-date-value">{formatarDataNumerica(data)}</span>
          </button>
        ))}
      </div>

      <ul className="hourly-forecast-list">
        {previsaoDoDia.map((horario, indice) => {
          const condition = getWeatherCondition(horario.weatherCode);

          return (
            <li
              className="hourly-forecast-item"
              key={`${horario.time}-${indice}`}
            >
              <time dateTime={horario.time} className="hourly-forecast-time">
                {horario.time.slice(11, 16)}
              </time>
              <WeatherIcon
                animatedSrc={condition.icon}
                staticSrc={condition.staticIcon}
                className="hourly-forecast-icon"
                size={44}
              />
              <span className="hourly-forecast-condition">{condition.description}</span>
              <strong className="hourly-forecast-temperature">
                {horario.temperature}°C
              </strong>
              <span className="hourly-forecast-precipitation">
                Chuva: {horario.precipitation} mm
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
