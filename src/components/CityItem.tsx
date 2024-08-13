import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/formatDate';
import { ICity } from '../types/ICity';
import styles from './CityItem.module.css';
export default function CityItem({ city }: { city: ICity }) {
  const { cityName, emoji, date } = city;
  const { lat, lng } = city.position;
  return (
    <li>
      <Link to={`${city.id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
