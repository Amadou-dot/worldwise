export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string | null;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
}
