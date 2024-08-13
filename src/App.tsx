import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import { useEffect, useState } from 'react';
import { ICity } from './types/ICity';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

export default function App() {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/cities');
        const data: ICity[] = await response.json();
        setCities(data);
      } catch (error) {
        alert('Error fetching cities');
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<AppLayout />}>
          <Route index element={<Navigate to={'cities'} replace/>} />
          <Route path='cities' element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path='cities/:id' element={<City  cities={cities}/>} />
          <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading}/>} />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}