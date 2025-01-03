import styles from './City.module.css';
import { formatDate } from '../helpers/formatDate';
import ButtonBack from './Buttons/ButtonBack';
import { useParams } from 'react-router-dom';
import { useCities } from '../context/useCities';
import { useEffect } from 'react';
import Spinner from './Spinner';

function City() {
  const { id } = useParams();
  const { getCityById, currentCity, isLoading } = useCities();
  useEffect(() => {
    getCityById(id as string);
  }, [id, getCityById]);
  if (!currentCity) return null;
  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span className='emoji'>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{date && formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target='_blank'
          rel='noreferrer'>
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
