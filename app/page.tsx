'use client'
import { useEffect, useRef, useState } from 'react';
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
import { buscarCidadePorCoordenadas } from './lib/bigDataCloud';
import {
  calcularCondicoesPredominantes,
  filtrarPrevisaoHorariaFutura,
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

    if (mensagem === 'Não foi possível identificar a cidade da sua localização.') {
      return mensagem;
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
  const [instanteAberturaPrevisao, setInstanteAberturaPrevisao] =
    useState<Date | null>(null);
  const previsaoHorariaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mostrarPrevisaoHoraria) {
      return;
    }

    const movimentoReduzido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    previsaoHorariaRef.current?.scrollIntoView({
      behavior: movimentoReduzido ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [mostrarPrevisaoHoraria]);

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


  async function carregarClimaDaCidade(cidade: CityResult) {
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
      timezone: dadosClima.timezone,
      utc_offset_seconds: dadosClima.utc_offset_seconds,
    };
    setClima(dadosCompletos);
  }

  function alternarPrevisaoHoraria() {
    if (!mostrarPrevisaoHoraria) {
      setInstanteAberturaPrevisao(new Date());
    }

    setMostrarPrevisaoHoraria((visivel) => !visivel);
  }

  // A página orquestra a seleção da localização e a busca da previsão,
  // mantendo a comunicação com as APIs isolada nos serviços.
  async function selecionarCidade(cidade: CityResult) {
    setCidades([]);
    setErro(null);
    setCarregando(true);

    try {
      await carregarClimaDaCidade(cidade);
    } catch (error) {
      setErro(formatarMensagemDeErro(error));
    } finally {
      setCarregando(false);
    }
  }

  async function usarLocalizacao() {
    setErro(null);
    setClima(null);
    setCidades([]);
    setCarregando(true);

    try {
      if (!navigator.geolocation) {
        throw new Error(
          'A localização não está disponível neste navegador. Tente novamente em outro navegador.'
        );
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const cidade = await buscarCidadePorCoordenadas(
        position.coords.latitude,
        position.coords.longitude
      );
      await carregarClimaDaCidade(cidade);
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const codigo = (error as GeolocationPositionError).code;

        if (codigo === 1) {
          setErro(
            'Permissão de localização negada. Habilite o acesso à localização nas configurações do navegador e tente novamente.'
          );
        } else if (codigo === 2) {
          setErro(
            'Não foi possível determinar sua localização no momento. Tente novamente.'
          );
        } else if (codigo === 3) {
          setErro('A localização demorou mais que o esperado. Tente novamente.');
        } else {
          setErro(formatarMensagemDeErro(error));
        }
      } else {
        setErro(formatarMensagemDeErro(error));
      }
    } finally {
      setCarregando(false);
    }
  }

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

        <SearchCity
          aoBuscar={pesquisarCidades}
          aoUsarLocalizacao={usarLocalizacao}
          carregando={carregando}
        />

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
              onClick={alternarPrevisaoHoraria}
            >
              {mostrarPrevisaoHoraria
                ? 'Ocultar previsão por hora'
                : 'Mostrar previsão por hora'}
            </button>
            {mostrarPrevisaoHoraria && instanteAberturaPrevisao && (
              <HourlyForecastCard
                hourly={filtrarPrevisaoHorariaFutura(
                  clima.hourly,
                  instanteAberturaPrevisao,
                  clima.timezone
                )}
                sectionRef={previsaoHorariaRef}
                timezone={clima.timezone}
                instanteAtual={instanteAberturaPrevisao}
              />
            )}
          </>
        )}
      </div>
      
      </main>
    </>
  );
}
