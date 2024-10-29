import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/formatDate';
import { ICity } from '../types/ICity';
import styles from './CityItem.module.css';
import { useCities } from '../context/useCities';
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
polyfillCountryFlagEmojis();
export default function CityItem({ city }: { city: ICity }) {
  const { cityName, emoji, date,id } = city;
  const { lat, lng } = city.position;
  const { currentCity } = useCities();
  return (
    <li>
      <Link
        to={`${city.id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? `${styles['cityItem--active']}` : ''
        }`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
