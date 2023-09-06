import { useState, useEffect, useReducer, useCallback } from 'react';
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
    categories: { label: 'Categories', value: 'all' },
  };

  // dynamic
  const [filter, filterDispatch] = useReducer(
    filterReducer,
    filterInitialValues
  );

  const [categories, setCategories] = useState([]);

  const [offset, setOffset] = useState(0);

  const [restaurants, setRestaurants] = useState([]);

  // utils
  const getRestaurants = useCallback(async p => {
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
        offset: p?.offset,
        combined_food: filter?.categories?.value,
      },
      headers: {
        'X-RapidAPI-Key': 'd4108be16emsh49e6646cdbd2708p125a95jsnd8975de09285',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setOffset(ps => ps + parseInt(response.data?.paging?.results));
      setCategories(
        response?.data?.filters_v2?.filter_sections[1]?.filter_groups[0]
          ?.options
      );
      // console.log(response.data);
      return response.data?.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }, [filter.categories.value]);

  useEffect(() => {
    (async () => {
      setRestaurants([]);
      const res = await getRestaurants({ offset: 0 });
      const status = res?.response?.data?.status;
      if (status) {
        if (status === 500) {
          setRestaurants(status);
        }
      } else {
        setRestaurants(res);
      }
    })();
    // setRestaurants(500);
  }, [filter?.categories, getRestaurants]);

  return (
    <ChakraProvider theme={myTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                categories={categories}
                filterInitialValues={filterInitialValues}
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
