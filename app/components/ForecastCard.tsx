import { getWeatherCondition } from '../lib/weatherConditions';
import { WeatherData } from '../types/weather';

interface ForecastCardProps {
  daily: WeatherData['daily'];
}

function formatarData(data: string) {
  return new Date(`${data}T00:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
  });
}

export default function ForecastCard({ daily }: ForecastCardProps) {
  return (
    <section className="forecast-card" aria-labelledby="forecast-card-title">
      <div className="forecast-card-heading">
        <span className="forecast-card-label">Próximos dias</span>
        <h2 id="forecast-card-title">Previsão para 7 dias</h2>
      </div>

      <ul className="forecast-list">
        {daily.time.map((data, indice) => {
          const { Icon, color } = getWeatherCondition(daily.weather_code[indice]);

          return (
            <li className="forecast-day" key={data}>
              <span className="forecast-date">{formatarData(data)}</span>
              <Icon className="forecast-icon" size={28} style={{ color }} aria-hidden="true" />
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
