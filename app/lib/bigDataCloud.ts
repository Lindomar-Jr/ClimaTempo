import { CityResult } from '../types/city';

interface BigDataCloudReverseGeocodingResponse {
  city?: string;
  localityName?: string;
  principalSubdivision?: string;
  countryName?: string;
}

export async function buscarCidadePorCoordenadas(
  latitude: number,
  longitude: number
): Promise<CityResult> {
  const parametros = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    localityLanguage: 'pt',
  });

  const resposta = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?${parametros}`
  );

  if (!resposta.ok) {
    throw new Error(
      'Não foi possível identificar a cidade da sua localização.'
    );
  }

  const dados: BigDataCloudReverseGeocodingResponse = await resposta.json();

  // city é mais específico que localityName; o fallback mantém o contrato mesmo
  // quando a coordenada não corresponde a uma cidade identificável.
  return {
    name: dados.city ?? dados.localityName ?? 'Minha localização',
    country: dados.countryName ?? '',
    admin1: dados.principalSubdivision ?? '',
    // As coordenadas originais são preservadas para o forecast usar a posição autorizada.
    latitude,
    longitude,
  };
}