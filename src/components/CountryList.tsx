import { useCities } from '../context/useCities';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message='No countries to show' />;
  const uniqueCountries = Array.from(new Set(cities.map(city => city.country)));
  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map(city => (
        <CountryItem
          key={city}
          country={{
            country: city,
            emoji: cities.find(c => c.country === city)?.emoji,
          }}
        />
      ))}
    </ul>
  );
}
