## Arquitetura

- `app/page.tsx` é responsável pela orquestração da interface, estado e renderização.
- A comunicação com APIs externas deve ficar isolada em serviços dentro de `app/lib/`.
- Componentes de UI não devem realizar chamadas diretamente a APIs externas.
- Antes de implementar uma nova funcionalidade, analise a estrutura existente e preserve as responsabilidades de cada camada.
- Evite refatorações ou alterações fora do escopo solicitado.
- Priorize código simples e proporcional ao tamanho da aplicação.
- Antes de alterar arquivos, explique brevemente o plano e quais arquivos serão modificados.

## Uso de IA

- Não implemente mudanças apenas por conveniência sem verificar se elas são necessárias.
- Ao sugerir uma refatoração, explique o problema que ela resolve e os trade-offs envolvidos.
- Preserve o comportamento existente quando a tarefa for exclusivamente de refatoração.
- Após implementar, informe quais arquivos foram alterados e quais validações foram realizadas.