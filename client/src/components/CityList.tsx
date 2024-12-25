import { useCities } from '../context/useCities';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function CityList() {
  const { cities, isLoading } = useCities();
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