'use client'
import { useState } from 'react';
import SearchCity from './components/SearchCity';
import { WeatherData } from './types/weather';
import { CityResult } from './types/city';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import HourlyForecastCard from './components/HourlyForecastCard';
import StatusMessage from './components/StatusMessage';
import {
  buscarCidades,
  buscarClima as buscarClimaOpenMeteo,
} from './lib/openMeteo';
import {
  calcularCondicoesPredominantes,
  transformarPrevisaoHoraria,
} from './lib/weatherTransform';
import CityResults from './components/CityResults';

export default function Home() {

  function formatarMensagemDeErro(error: unknown) {
    const mensagem = error instanceof Error
      ? error.message
      : 'Não foi possível concluir a busca';

    if (/tente novamente|verifique|confira/i.test(mensagem)) {
      return mensagem;
    }

    if (mensagem === 'Cidade não encontrada') {
      return `${mensagem}. Verifique o nome e tente novamente.`;
    }

    return `${mensagem}. Tente novamente em instantes.`;
  }

   // Estados da interface: clima selecionado, resultados da busca,
   // mensagem de erro e indicação de carregamento.
  const [clima, setClima] = useState<WeatherData | null>(null);
  const [cidades, setCidades] = useState<CityResult[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [mostrarPrevisaoHoraria, setMostrarPrevisaoHoraria] = useState(false);

  // Esta etapa apenas busca opções; a previsão só é solicitada após a escolha do usuário.
  async function pesquisarCidades(cidade: string) {
    setErro(null);
    setClima(null);
    setCidades([]);
    setCarregando(true);

    try {
      const resultados = await buscarCidades(cidade);
      setCidades(resultados);
    } catch (error) {
      setErro(formatarMensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }


// A página orquestra a seleção da localização e a busca da previsão,
// mantendo a comunicação com a API isolada no serviço.
  async function selecionarCidade(cidade: CityResult) {
    setCidades([]);
    setErro(null);
    setCarregando(true);

    try {
      const dadosClima = await buscarClimaOpenMeteo(
        cidade.latitude,
        cidade.longitude
      );
      const previsaoHoraria = transformarPrevisaoHoraria(dadosClima.hourly);
      const codigosPredominantes = calcularCondicoesPredominantes(
        previsaoHoraria,
        dadosClima.daily.time,
        dadosClima.daily.weather_code
      );
      const dadosCompletos: WeatherData = {
        location: cidade,
        current: dadosClima.current,
        daily: {
          ...dadosClima.daily,
          predominant_weather_code: codigosPredominantes,
        },
        hourly: previsaoHoraria,
      };
      setClima(dadosCompletos);
    } catch (error) {
      setErro(formatarMensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>

      <main id="main-content" className="weather-page" tabIndex={-1}>
      <div className="weather-shell">
        <header className="weather-header">
          <span className="weather-kicker">Previsão local</span>
          <h1>Clima Tempo</h1>
          <p>Consulte o clima da sua cidade:</p>
        </header>

        <SearchCity aoBuscar={pesquisarCidades} />

        {cidades.length > 0 && (
          <CityResults
            cidades={cidades}
            onSelecionarCidade={selecionarCidade}
          />
)}


        {carregando && <StatusMessage tipo="loading" mensagem="Buscando informações…" />}
        {erro && <StatusMessage tipo="error" mensagem={erro} />}
        {clima && <WeatherCard clima={clima} />}
        {clima && <ForecastCard daily={clima.daily} />}
        {clima && (
          <>
            <button
              className="hourly-toggle-button"
              type="button"
              onClick={() => setMostrarPrevisaoHoraria((visivel) => !visivel)}
            >
              {mostrarPrevisaoHoraria
                ? 'Ocultar previsão por hora'
                : 'Mostrar previsão por hora'}
            </button>
            {mostrarPrevisaoHoraria && (
              <HourlyForecastCard hourly={clima.hourly} />
            )}
          </>
        )}
      </div>
      
      </main>
    </>
  );
}
