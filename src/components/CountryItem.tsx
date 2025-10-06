import { cleanCountryName } from '../helpers/cleanCountryName';
import styles from './CountryItem.module.css';

interface ICountry {
  emoji: string | undefined;
  country: string;
}
function CountryItem({ country }: { country: ICountry }) {
  return (
    <li className={styles.countryItem}>
      <span className='emoji'>{country.emoji}</span>
      <span>{cleanCountryName(country.country)}</span>
    </li>
  );
}

export default CountryItem;
