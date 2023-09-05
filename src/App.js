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
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', '297704');
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', offset);

    const options = {
      method: 'POST',
      url: 'https://restaurants222.p.rapidapi.com/search',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '6892fa5b83mshd00612e97bc8d9ap10baaejsnc1319da14464',
        'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setOffset(ps => ps + parseInt(response.data?.results?.paging?.results));
      return response.data?.results?.data;
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
