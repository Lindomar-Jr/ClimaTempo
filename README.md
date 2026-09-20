# Clima Tempo

Aplicação web para consulta do clima atual e previsão para os próximos dias de uma cidade, desenvolvida com Next.js, React e TypeScript utilizando dados da Open-Meteo.

**Aplicação em produção:** https://clima-tempo-trbn.vercel.app/

## Sobre o projeto

O Clima Tempo é uma aplicação web de consulta meteorológica que utiliza a Open-Meteo para localizar cidades e obter dados climáticos. O projeto foi desenvolvido de forma incremental: começou como uma aplicação simples e evoluiu para uma aplicação publicada em produção.

Além da integração com API, o projeto serve como prática de arquitetura, separação de responsabilidades, tratamento de estados, responsividade, acessibilidade e deploy.

## Funcionalidades

- Busca de cidades por meio de formulário, incluindo envio pela tecla Enter.
- Consulta do clima atual de uma cidade.
- Exibição de temperatura, umidade, velocidade do vento e condição meteorológica.
- Previsão para 7 dias, com temperaturas máxima e mínima.
- Ícones Lucide e cores semânticas para as condições meteorológicas.
- Tratamento de cidade não encontrada e de erros das APIs.
- Indicador de carregamento durante a busca.
- Limpeza do resultado anterior ao iniciar uma nova busca.
- Exibição da localização encontrada.
- Interface responsiva para desktop e dispositivos móveis.
- Recursos de acessibilidade, como rótulos, regiões de status e alertas.
- Suporte à preferência de redução de movimento.
- Identidade visual própria, incluindo metadata e favicon personalizados.

## Tecnologias utilizadas

- [Next.js](https://nextjs.org/) 16, com App Router.
- [React](https://react.dev/) 19.
- [TypeScript](https://www.typescriptlang.org/).
- CSS.
- [Lucide React](https://lucide.dev/guide/packages/lucide-react), para os ícones.
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api).
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs).
- Geist, carregada com `next/font`.
- Git e GitHub, para versionamento e integração do projeto.
- Vercel, para publicação em produção.

## Arquitetura

A aplicação utiliza o App Router do Next.js e mantém as responsabilidades separadas entre orquestração, componentes de interface e serviços:

```text
app/
├── components/
│   ├── SearchCity.tsx
│   ├── WeatherCard.tsx
│   ├── ForecastCard.tsx
│   └── StatusMessage.tsx
├── lib/
│   ├── openMeteo.ts
│   └── weatherConditions.ts
├── types/
│   └── weather.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

- `page.tsx` coordena a interface, o estado e a renderização.
- `components/` contém os componentes de interface.
- `lib/` contém a comunicação com APIs externas e a lógica reutilizável.
- `weatherConditions.ts` centraliza o mapeamento das condições meteorológicas.
- `types/` contém os tipos TypeScript.
- `globals.css` define os estilos globais.
- `layout.tsx` define a estrutura global e os metadados.

As chamadas para APIs externas ficam isoladas em `app/lib/`.

## Fluxo da aplicação

```text
Usuário informa uma cidade
	-> Open-Meteo Geocoding API
	-> Latitude e longitude
	-> Open-Meteo Forecast API
	-> Dados meteorológicos
	-> Estado da aplicação
	-> Componentes React
	-> Clima atual + previsão
```

O serviço de geocoding localiza a cidade e fornece as coordenadas. Em seguida, o serviço de forecast consulta os dados meteorológicos. A página controla os estados de carregamento, erro e resultado e os componentes apresentam as informações.

## APIs utilizadas

### Open-Meteo Geocoding API

Utilizada para localizar a cidade informada e obter dados como nome, região, latitude e longitude.

Documentação: [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

### Open-Meteo Forecast API

Utilizada para obter os dados meteorológicos atuais e a previsão diária, incluindo códigos de condição e temperaturas máxima e mínima.

Documentação: [Forecast API](https://open-meteo.com/en/docs)

## Deploy

A aplicação está publicada na Vercel:

https://clima-tempo-trbn.vercel.app/

O projeto utiliza a integração entre GitHub e Vercel para publicar alterações na aplicação.

## CI/CD

O fluxo atual de integração e entrega é baseado no deploy automático da Vercel após alterações na branch `main`:

```text
Código
	-> Commit
	-> Push para GitHub
	-> Vercel detecta alteração na branch main
	-> Build
	-> Deploy
	-> Produção
```

## Evolução do projeto

### V1

Aplicação inicial de consulta meteorológica.


### V2

Evolução da aplicação com previsão para os próximos dias, melhorias na experiência de busca, tratamento de estados e organização da comunicação com a API.

### V2.2

Versão atual do projeto, com:

- tratamento de erros e estados de carregamento;
- previsão para 7 dias;
- responsividade;
- melhorias de acessibilidade;
- centralização do mapeamento das condições meteorológicas;
- identidade visual própria;
- metadata e favicon personalizados;
- publicação em produção com Vercel.

## Próximos passos

As opções abaixo são planejadas e ainda não estão implementadas:

- Testes automatizados.
- GitHub Actions.
- Melhorias de observabilidade.
- Novas informações meteorológicas.
- Favoritos ou persistência local.
- Melhorias na seleção de cidades.
- Uso da localização do navegador.

## Como executar o projeto

### Pré-requisitos

- Node.js.
- npm.

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Verificações e produção

```bash
npm run lint
npm run build
npm start
```

## Licença

Este projeto é destinado a fins de estudo e desenvolvimento.
