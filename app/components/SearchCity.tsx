'use client'
import { useState } from 'react';

interface SearchCityProps {
    aoBuscar: (cidade: string) => void;
}

export default function SearchCity({ aoBuscar }: SearchCityProps) {

    const [cidade, setCidade] = useState('');

    function buscarCidade() {
        const cidadeValida = cidade.trim();

        if (!cidadeValida) {
            return;
        }

        aoBuscar(cidadeValida);
    }

  return (
/* No componente SearchCity, quando o usuário digita no input,
   o onChange captura o valor e atualiza o estado cidade através de setCidade.*/

/* Quando o botão é clicado, o evento onClick executa a função buscarCidade.

   A função valida e remove espaços desnecessários da entrada.
   Se houver uma cidade válida, executa aoBuscar(cidadeValida).

   Como aoBuscar recebeu a referência da função buscarClima no componente Home,
   executar aoBuscar(cidadeValida) faz com que buscarClima seja executada,
   recebendo como parâmetro a cidade validada. */

    <form className="search-panel" 
      onSubmit={(event) => {
        event.preventDefault();
        buscarCidade();
      }}>

      <input type="text"
      aria-label="Nome da cidade"
      onChange={(e) => setCidade(e.target.value)}
      placeholder="Digite uma cidade" />

      <button type="submit">Buscar</button>
    </form>
  );
}
