'use client';

import { useState } from 'react';
import { getWeatherCondition } from '../lib/weatherConditions';
import { selecionarPrevisaoPorDia } from '../lib/weatherTransform';
import type { HourlyWeather } from '../types/weather';

interface HourlyForecastCardProps {
  hourly: HourlyWeather[];
}

function formatarDataISO(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function formatarNomeDoDia(data: string) {
  const agora = new Date();
  const dataHoje = formatarDataISO(agora);
  const amanha = new Date(agora);
  amanha.setDate(amanha.getDate() + 1);
  const dataAmanha = formatarDataISO(amanha);

  if (data === dataHoje) {
    return 'Hoje';
  }

  if (data === dataAmanha) {
    return 'Amanhã';
  }

  const nomeDoDia = new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'long',
  });

  return nomeDoDia.charAt(0).toUpperCase() + nomeDoDia.slice(1);
}

function formatarDataNumerica(data: string) {
  return `${data.slice(8, 10)}/${data.slice(5, 7)}`;
}

export default function HourlyForecastCard({ hourly }: HourlyForecastCardProps) {
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
    <section className="hourly-forecast-card" aria-labelledby="hourly-forecast-card-title">
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
            aria-label={`Selecionar ${formatarNomeDoDia(data)}, ${formatarDataNumerica(data)}`}
            onClick={() => setDataSelecionada(data)}
          >
            <span className="hourly-date-label">{formatarNomeDoDia(data)}</span>
            <span className="hourly-date-value">{formatarDataNumerica(data)}</span>
          </button>
        ))}
      </div>

      <ul className="hourly-forecast-list">
        {previsaoDoDia.map((horario, indice) => {
          const { description, Icon, color } = getWeatherCondition(horario.weatherCode);

          return (
            <li
              className="hourly-forecast-item"
              key={`${horario.time}-${indice}`}
            >
              <time dateTime={horario.time} className="hourly-forecast-time">
                {horario.time.slice(11, 16)}
              </time>
              <Icon
                className="hourly-forecast-icon"
                size={28}
                style={{ color }}
                aria-hidden="true"
              />
              <span className="hourly-forecast-condition">{description}</span>
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
