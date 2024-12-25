import { createContext, useCallback, useEffect, useReducer } from 'react';
import { ICity } from '../types/ICity';

export interface IContext {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity | null;
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
  currentCity: null,
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
        currentCity: (action.payload as { city: ICity }).city,
      };
    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter(
          city => city.id !== (action.payload as { id: string }).id
        ),
        isLoading: false,
        currentCity: null,
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload as string };
    default:
      throw new Error('Unhandled action type');
  }
}

function CitiesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'cities/loading' });
      try {
        const cities = JSON.parse(localStorage.getItem('cities') || '[]');
        dispatch({ type: 'cities/loaded', payload: { cities } });
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'Error fetching cities' });
      }
    }
    fetchCities();
  }, []);

  const getCityById = useCallback(
    async (id: string) => {
      if (state.currentCity && id === state.currentCity.id) return;
      dispatch({ type: 'cities/loading' });
      try {
        const city = state.cities.find(city => city.id === id);
        if (city) {
          dispatch({ type: 'city/loaded', payload: { city } });
        } else {
          throw new Error('City not found');
        }
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'Error getting city data' });
      }
    },
    [state.cities, state.currentCity]
  );

  const addCity = async (city: ICity) => {
    dispatch({ type: 'cities/loading' });
    try {
      const updatedCities = [...state.cities, city];
      localStorage.setItem('cities', JSON.stringify(updatedCities));
      dispatch({ type: 'city/created', payload: { city } });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error adding city' });
    }
  };

  const deleteCity = async (id: string) => {
    dispatch({ type: 'cities/loading' });
    try {
      const updatedCities = state.cities.filter(city => city.id !== id);
      localStorage.setItem('cities', JSON.stringify(updatedCities));
      dispatch({ type: 'city/deleted', payload: { id } });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'Error deleting city' });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities: state.cities,
        isLoading: state.isLoading,
        currentCity: state.currentCity,
        getCityById,
        addCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
