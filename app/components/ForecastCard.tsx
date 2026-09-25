import { getWeatherCondition } from '../lib/weatherConditions';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  daily: WeatherData['daily'];
}

function formatarDataISO(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

function formatarData(data: string) {
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

export default function ForecastCard({ daily }: ForecastCardProps) {
  return (
    <section className="forecast-card" aria-labelledby="forecast-card-title">
      <header className="forecast-card-heading">
        <span className="forecast-card-label">Próximos dias</span>
        <h2 id="forecast-card-title">Previsão para 7 dias</h2>
      </header>

      <ul className="forecast-list">
        {daily.time.map((data, indice) => {
          const condition = getWeatherCondition(
            daily.predominant_weather_code[indice] ?? daily.weather_code[indice]
          );

          return (
            <li className="forecast-day" key={data}>
              <span className="forecast-date">
                {formatarData(data)}
              </span>
              <WeatherIcon
                animatedSrc={condition.icon}
                staticSrc={condition.staticIcon}
                className="forecast-icon"
                size={54}
              />
              <span className="forecast-temperature">
                <strong>{daily.temperature_2m_max[indice]}°</strong>
                <span>{daily.temperature_2m_min[indice]}°</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
