import { ICity } from '../types/ICity';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';
interface ICityList {
  cities: ICity[];
  isLoading: boolean;
}
export default function CityList({ cities, isLoading }: ICityList) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message='Click a city on the map to start!' />;
  return (
    <ul className={styles.cityList}>
      {cities.map(city => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
