# Clima Tempo

Aplicação web para consulta do clima atual e previsão para os próximos dias de uma cidade, desenvolvida com Next.js, React e TypeScript utilizando dados da Open-Meteo.

**Aplicação em produção:** https://clima-tempo-trbn.vercel.app/

## Sobre o projeto

O Clima Tempo é uma aplicação web de consulta meteorológica que utiliza a Open-Meteo para localizar cidades e obter dados climáticos. O projeto foi desenvolvido de forma incremental: começou como uma aplicação simples e evoluiu para uma aplicação publicada em produção.

Além da integração com API, o projeto serve como prática de arquitetura, separação de responsabilidades, tratamento de estados, responsividade, acessibilidade e deploy.

## Funcionalidades

- Busca de cidades por meio de formulário, incluindo envio pela tecla Enter.
- Consulta do clima atual de uma cidade ou da localização atual do usuário.
- Exibição de temperatura, umidade, velocidade do vento e condição meteorológica.
- Exibição da pressão atmosférica atual em hPa.
- Exibição da precipitação diária prevista para hoje em mm.
- Previsão para 7 dias, com temperaturas máxima e mínima.
- Previsão horária iniciando no começo da hora atual, considerando o timezone da cidade consultada.
- Seleção de dias na previsão horária e exibição dos horários futuros disponíveis.
- Localização atual iniciada pelo usuário, com geocodificação reversa para identificar a cidade.
- Ícones Lucide e cores semânticas para as condições meteorológicas.
- Tratamento de cidade não encontrada e de erros das APIs.
- Indicador de carregamento durante a busca.
- Limpeza do resultado anterior ao iniciar uma nova busca.
- Exibição da localização encontrada.
- Interface responsiva para desktop e dispositivos móveis.
- Recursos de acessibilidade, como rótulos, regiões de status e alertas.
- Suporte à preferência de redução de movimento.
- Scroll suave até a previsão horária ao abrir seus detalhes.
- Scrollbars horizontais finas e customizadas para as previsões.
- Identidade visual própria, incluindo metadata e favicon personalizados.

## Tecnologias utilizadas

- [Next.js](https://nextjs.org/) 16, com App Router.
- [React](https://react.dev/) 19.
- [TypeScript](https://www.typescriptlang.org/).
- CSS.
- [Lucide React](https://lucide.dev/guide/packages/lucide-react), para os ícones.
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api).
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs).
- Browser Geolocation API, para obter a localização atual após a ação e permissão do usuário.
- BigDataCloud Free Client-Side Reverse Geocoding, para identificar a cidade a partir das coordenadas.
- Geist, carregada com `next/font`.
- Git e GitHub, para versionamento e integração do projeto.
- Vercel, para publicação em produção.

## Arquitetura

A aplicação utiliza o App Router do Next.js e mantém as responsabilidades separadas entre orquestração, componentes de interface, serviços externos, transformação de dados e tipos:

```text
app/
├── components/
│   ├── CityResults.tsx
│   ├── ForecastCard.tsx
│   ├── HourlyForecastCard.tsx
│   ├── SearchCity.tsx
│   ├── StatusMessage.tsx
│   ├── WeatherCard.tsx
│   └── WeatherIcon.tsx
├── lib/
│   ├── bigDataCloud.ts
│   ├── openMeteo.ts
│   ├── weatherConditions.ts
│   └── weatherTransform.ts
├── types/
│   ├── city.ts
│   └── weather.ts
├── favicon.ico
├── globals.css
├── layout.tsx
└── page.tsx
```

- `page.tsx` coordena a interface, o estado, a busca manual, a localização atual e a abertura da previsão horária.
- `components/` contém os componentes de interface e apresentação dos resultados.
- `openMeteo.ts` concentra a busca de cidades e a consulta do forecast da Open-Meteo.
- `bigDataCloud.ts` concentra a geocodificação reversa da localização atual.
- `weatherTransform.ts` contém transformações da previsão, seleção por dia, filtro de horários e cálculo de condições predominantes.
- `types/` contém os contratos TypeScript de cidades, previsão, horários e timezone.
- `globals.css` define a identidade visual, responsividade, acessibilidade visual e scrollbars horizontais.
- `layout.tsx` define a estrutura global, fontes e metadados.

As chamadas para APIs externas ficam isoladas em `app/lib/`, enquanto os componentes permanecem responsáveis pela apresentação.

## Fluxo da aplicação

### Busca manual

```text
Usuário informa uma cidade
	-> Open-Meteo Geocoding API
	-> Latitude e longitude
	-> Open-Meteo Forecast API
	-> Dados meteorológicos e timezone
	-> Transformações da aplicação
	-> Estado da aplicação
	-> Componentes React
```

### Localização atual

```text
Usuário clica em "Usar minha localização"
	-> Browser Geolocation API
	-> Latitude e longitude
	-> BigDataCloud Reverse Geocoding
	-> CityResult normalizado
	-> Open-Meteo Forecast API
	-> Dados meteorológicos e timezone
	-> Componentes React
```

Na previsão horária, o modelo mantém todos os horários retornados pela API. Quando o usuário abre os detalhes, a aplicação captura o momento atual, converte-o para o timezone da cidade e exibe o horário correspondente ao início da hora atual e os horários seguintes disponíveis.

## Localização atual

A localização atual não é solicitada automaticamente ao abrir a aplicação. O fluxo começa somente quando o usuário clica no botão correspondente e concede permissão ao navegador.

O navegador fornece latitude e longitude por meio da Browser Geolocation API. Essas coordenadas são enviadas ao BigDataCloud para geocodificação reversa, que identifica a cidade, região e país. O resultado é normalizado para `CityResult` e reutiliza o mesmo fluxo de consulta meteorológica usado pela busca manual.

## APIs utilizadas

### Open-Meteo Geocoding API

Utilizada para localizar a cidade informada e obter dados como nome, região, latitude e longitude.

Documentação: [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

### Open-Meteo Forecast API

Utilizada para obter os dados meteorológicos atuais e as previsões horária e diária, incluindo temperatura, umidade, vento, pressão atmosférica, códigos de condição, temperaturas máxima e mínima, precipitação e timezone da cidade consultada.

Documentação: [Forecast API](https://open-meteo.com/en/docs)

### Browser Geolocation API

Utilizada no navegador somente após a ação e a permissão do usuário para obter latitude e longitude. A aplicação não solicita localização automaticamente ao abrir.

### BigDataCloud Free Client-Side Reverse Geocoding

Utilizada para identificar a cidade correspondente às coordenadas fornecidas pela Browser Geolocation API.

Endpoint utilizado: `https://api.bigdatacloud.net/data/reverse-geocode-client`

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

### Versão atual (MVP)

O MVP atual inclui:

- tratamento de erros e estados de carregamento;
- previsão para 7 dias;
- previsão horária com seleção de dias e timezone da cidade;
- início da previsão horária no começo da hora atual;
- localização atual com permissão do usuário e geocodificação reversa;
- pressão atmosférica e precipitação diária;
- responsividade;
- melhorias de acessibilidade;
- scroll suave até os detalhes da previsão horária;
- scrollbars horizontais customizados;
- centralização do mapeamento das condições meteorológicas;
- identidade visual própria;
- metadata e favicon personalizados;
- publicação em produção com Vercel.

## Próximos passos

As opções abaixo são planejadas e ainda não estão implementadas:

- Testes automatizados.
- GitHub Actions.
- Melhorias de observabilidade.
- Favoritos ou persistência local.
- Melhorias na seleção de cidades.

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
