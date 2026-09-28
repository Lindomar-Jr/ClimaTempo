// Contrato comum para geocoding manual e reverse geocoding da localização atual.
export interface CityResult {
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
}