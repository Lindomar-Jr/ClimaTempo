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

/*Quando o botão é clicado, o evento onClick executa a função buscarCidade.
  Essa função executa aoBuscar(cidade).

  Como aoBuscar recebeu a referência da função buscarClima no componente Home,
  executar aoBuscar(cidade) faz com que buscarClima seja executada,
  recebendo como parâmetro o valor atual armazenado no estado cidade.*/

    <div className="search-panel">
      <input type="text"
      aria-label="Nome da cidade"
      onChange={(e) => setCidade(e.target.value)}
      placeholder="Digite uma cidade" />

      <button type="button" onClick={buscarCidade}>Buscar</button>
    </div>
  );
}
