import React, { createContext, useEffect } from 'react';
import { ICity } from '../types/ICity';
const BASEURL = 'http://localhost:5000';
interface IContext {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  getCityById: (id: string) => Promise<void>;
  addCity: (city: ICity) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
}
interface IState {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity | null;
  error: string | null;
}

type Payload = { cities: ICity[] } | { city: ICity } | { id: string } | string;

interface Action {
  type: string;
  payload?: Payload;
}

export const CitiesContext = createContext({} as IContext);
const initialState: IState = {
  cities: [],
  isLoading: false,
  currentCity: {} as ICity,
  error: null,
};

function reducer(state: IState, action: Action): IState {
  switch (action.type) {
    case 'cities/loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return {
        ...state,
        cities: (action.payload as { cities: ICity[] }).cities,
        isLoading: false,
      };
    case 'city/loaded':
      return {
        ...state,
        currentCity: (action.payload as { city: ICity }).city,
        isLoading: false,
      };
    case 'city/created':
      return {
        ...state,
        cities: [...state.cities, (action.payload as { city: ICity }).city],
        isLoading: false,
      };
    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter(
          city => city.id !== (action.payload as { id: string }).id
        ),
        isLoading: false,
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload as string };
    default:
      throw new Error('Unhandled action type');
  }
}

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [{ cities, isLoading, currentCity }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  /**
   * Fetch all cities from the database and set the cities state
   */
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'cities/loading' });
      try {
        const response = await fetch(`${BASEURL}/cities`);
        const data: ICity[] = await response.json();
        dispatch({ type: 'cities/loaded', payload: { cities: data } });
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'Error fetching cities' });
      }
    }
    fetchCities();
  }, []);

  /**
   * Get data for a specific city
   * @param id
   */
  async function getCityById(id: string) {
    dispatch({ type: 'cities/loading' });
    try {
      const response = await fetch(`${BASEURL}/cities/${id}`);
      const data: ICity = await response.json();
      dispatch({ type: 'city/loaded', payload: { city: data } });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error getting city data' });
    }
  }

  /**
   * Add a city to the database
   * @param city
   */
  async function addCity(city: ICity) {
    dispatch({ type: 'cities/loading' });
    try {
      const response = await fetch(`${BASEURL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });
      const data: ICity = await response.json();
      dispatch({ type: 'city/created', payload: { city: data } });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error adding city' });
    }
  }

  /**
   * Remove a city from the database
   * @param id
   */
  async function deleteCity(id: string) {
    dispatch({ type: 'cities/loading' });
    try {
      await fetch(`${BASEURL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: { id } });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error deleting city' });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity: currentCity as ICity,
        getCityById,
        addCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
