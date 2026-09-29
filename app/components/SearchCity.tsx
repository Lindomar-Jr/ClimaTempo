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

      <button type="submit">Buscar</button>
    </form>

    <button
      className="location-button"
      type="button"
      onClick={aoUsarLocalizacao}
      disabled={carregando}
    >
      Usar minha localização
    </button>
    </>
  );
}
