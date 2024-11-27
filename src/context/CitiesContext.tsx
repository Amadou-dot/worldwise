import React, { createContext, useEffect, useState } from 'react';
import { ICity } from '../types/ICity';
const BASEURL = 'http://localhost:5000';

export const CitiesContext = createContext(
  {} as { cities: ICity[]; isLoading: boolean, currentCity: ICity, getCityById: (id: string) => Promise<void>, addCity: (city: ICity) => Promise<void> }
);

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState({} as ICity);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASEURL}/cities`);
        const data: ICity[] = await response.json();
        setCities(data);
      } catch (error) {
        alert('Error fetching cities');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCityById(id: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASEURL}/cities/${id}`);
      const data: ICity = await response.json();
      setCurrentCity(data);
    } catch (error) {
      alert('Error fetching city');
    } finally {
      setIsLoading(false);
    }
  }

  async function addCity(city: ICity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASEURL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });
      const data: ICity = await response.json();
      setCities([...cities, data]); // update the cities state with the new city
    } catch (error) {
      alert('Error adding city');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCityById, addCity }}>
      {children}
    </CitiesContext.Provider>
  );

  
}

export { CitiesProvider };
