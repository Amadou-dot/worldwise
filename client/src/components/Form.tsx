// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from 'react';
import styles from './Form.module.css';
import ButtonBack from './Buttons/ButtonBack';
import ButtonAdd from './Buttons/ButtonAdd';
import { useURLPosition } from '../hooks/useURLPosition';
import { convertToEmoji } from '../helpers/convertToEmoji';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CitiesContext } from '../context/CitiesContext';
import { useNavigate } from 'react-router-dom';
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
function Form() {
  const navigate = useNavigate();
  // get the latitude and longitude from the URL
  const { latitude: lat, longitude: lng } = useURLPosition();
  const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState('');
  const {addCity, isLoading} = useContext(CitiesContext);
  function genId() {
    return Math.random().toString(10).slice(2,10);
  }
  // use reverse geocoding to get the city name and country based on where the user clicked on the map
  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchCityData() {
      try {
        setError('');
        setIsLoadingGeoData(true);
        setDate(new Date()); // reset date to today
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "There's no city there! Click somewhere closer to a city."
          );
        setCityName(data.city.length ? data.city : data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoadingGeoData(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  // handle form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trip = { cityName, country, date, notes };
    if (!trip.cityName) return setError('Please enter a city name');
    const newCity = { ...trip, date: date?.toISOString() || null, emoji, position: { lat, lng }, id: genId() };
    await addCity(newCity);
    navigate('/worldwise/app/cities');
  }

  if (!lat || !lng)
    return (
      <Message message='No location data found. Start by clicking on the map' />
    );
  if (isLoadingGeoData) return <Spinner />;
  if (error) return <Message message={error} />;
  return (
    <form className={`${styles.form} ${isLoading? 'loading':''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={`${styles.flag}`}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker id='date' selected={date} onChange={date => setDate(date)} dateFormat='MM/dd/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <ButtonAdd />
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
