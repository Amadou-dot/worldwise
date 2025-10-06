export interface ICity {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string | null;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
}
