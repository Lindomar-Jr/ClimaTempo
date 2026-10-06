'use client'
import { useState } from 'react';

interface SearchCityProps {
    aoBuscar: (cidade: string) => void;
  aoUsarLocalizacao: () => void;
  carregando: boolean;
}

export default function SearchCity({
  aoBuscar,
  aoUsarLocalizacao,
  carregando,
}: SearchCityProps) {

    const [cidade, setCidade] = useState('');

    function buscarCidade() {
        const cidadeValida = cidade.trim();

        if (!cidadeValida) {
            return;
        }

        aoBuscar(cidadeValida);
    }

  return (
    <>
    <form className="search-panel" 
      onSubmit={(event) => {
        event.preventDefault();
        buscarCidade();
      }}>

      <input
      id="city-search"
      name="city"
      type="search"
      aria-label="Nome da cidade"
      autoComplete="off"
      onChange={(e) => setCidade(e.target.value)}
      placeholder="Digite uma cidade…" />

      <button
      className="location-button"
      type="button"
      onClick={aoUsarLocalizacao}
      disabled={carregando}
      aria-label="Usar minha localização"
      title="Usar minha localização"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </button>

      <button type="submit">Buscar</button>
    </form>

    </>
  );
}
