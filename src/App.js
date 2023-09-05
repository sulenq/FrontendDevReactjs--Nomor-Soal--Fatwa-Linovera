import { useState, useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { ChakraProvider } from '@chakra-ui/react';

import { myTheme } from './myTheme';
import './global.css';

import Main from './pages/Main';
import Details from './pages/Details';

import filterReducer from './reducers/filterReducer';

function App() {
  // constant
  const filterInitialValues = {
    openNow: false,
    price: '',
    categories: '',
  };

  // dynamic
  const [filter, filterDispatch] = useReducer(
    filterReducer,
    filterInitialValues
  );

  const [offset, setOffset] = useState(0);

  const [restaurants, setRestaurants] = useState({});

  // utils
  const getRestaurants = async offset => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list',
      params: {
        location_id: '297704',
        restaurant_tagcategory: '10591',
        restaurant_tagcategory_standalone: '10591',
        currency: 'USD',
        lunit: 'km',
        limit: '8',
        open_now: 'false',
        lang: 'en_US',
        offset: offset,
      },
      headers: {
        'X-RapidAPI-Key': '0f7c8278f5msh3f2c6a3011243d7p14a4aajsn8ecfb7246109',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setOffset(ps => ps + parseInt(response.data?.paging?.results));
      // console.log(response.data);
      return response.data?.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getRestaurants(0);
      const status = res?.response?.data?.status;
      if (status) {
        if (status === 500) {
          setRestaurants([status]);
        }
      } else {
        setRestaurants(res);
      }
    })();
    // setRestaurants([500]);
  }, []);

  return (
    <ChakraProvider theme={myTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                filter={filter}
                filterDispatch={filterDispatch}
                restaurants={restaurants}
                setRestaurants={setRestaurants}
                getRestaurants={getRestaurants}
                offset={offset}
                setOffset={setOffset}
              />
            }
          />

          <Route path="/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
