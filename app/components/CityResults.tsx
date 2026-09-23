import { CityResult } from '../types/city';

export interface CityResultsProps {
  cidades: CityResult[];
  onSelecionarCidade: (cidade: CityResult) => void;
}

export default function CityResults({
  cidades,
  onSelecionarCidade,
}: CityResultsProps) {
  return (
    // O componente só apresenta dados e comunica a escolha; a busca fica no componente pai.
    <section className="city-results" aria-label="Resultados de cidades">
      <ul className="city-results-list">
        {/* Todos os resultados são renderizados; ao contrário de slice, o CSS rola sem descartar itens. */}
        {cidades.map((cidade) => {
          // ?? fornece uma string vazia apenas quando admin1 é nullish (null ou undefined).
          // A key identifica cada resultado de forma estável para o React,
          // combinando dados que diferenciam uma cidade de outra.
          const chave = [
            cidade.name,
            cidade.admin1 ?? '',
            cidade.country,
            cidade.latitude,
            cidade.longitude,
          ].join('-');

          return (
            <li className="city-results-item" key={chave}>
              <button
                className="city-results-button"
                type="button"
                onClick={() => onSelecionarCidade(cidade)}
              >
                {/* O botão apenas comunica a cidade selecionada ao componente pai;
                 a lógica de busca do clima permanece fora deste componente. */}
                <span className="city-results-name">{cidade.name}</span>
                <span className="city-results-location">
                  {cidade.admin1 ? `${cidade.admin1}, ` : ''}
                  {cidade.country}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
