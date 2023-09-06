import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';

import Filter from '../components/Filter';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import RestaurantItem from '../components/RestaurantItem';

import isRestaurantOpen from '../utils/isRestaurantOpen';
import { useState } from 'react';

export default function Main(props) {
  // constant
  const filterOpenNow = d => {
    if (filter.openNow) {
      return isRestaurantOpen(d?.open_now_text);
    }
    return d;
  };
  const filterPrice = d => {
    const priceRange = d?.price_level?.split(' - ');
    const maxPrice = priceRange?.[priceRange?.length - 1]?.length;
    const minPrice = priceRange?.[0]?.length;
    // console.log(filter?.price?.length, minPrice, maxPrice);
    return (
      filter?.price === '' ||
      (filter?.price?.length <= maxPrice && filter?.price?.length >= minPrice)
    );
  };

  const filterInitialValues = props?.filterInitialValues;

  const filter = props?.filter;

  const filterDispatch = props?.filterDispatch;

  const restaurants = props?.restaurants;

  // utils
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const handleLoadMore = async () => {
    (async () => {
      setLoadMoreLoading(true);
      const res = await props?.getRestaurants(props?.offset);
      setLoadMoreLoading(false);
      const status = res?.response?.data?.status;
      if (status) {
        if (status === 500) {
          props?.setRestaurants([status]);
        }
      } else {
        props?.setRestaurants(ps => {
          return [...ps, ...res];
        });
      }
    })();
  };

  return (
    <VStack id="main" mx={'auto'} gap={0} align={'flex-start'}>
      <HStack justify={'space-between'} w={'100%'} mt={8} mb={4} className="dp">
        <Text fontSize={32} lineHeight={1} fontWeight={700}>
          Restaurants
        </Text>

        <ColorModeSwitcher />
      </HStack>

      <Box className="dp">
        <Text w={['100%', '80%', '47%']} mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Text>
      </Box>

      <Filter
        filterInitialValues={filterInitialValues}
        filter={filter}
        filterDispatch={filterDispatch}
      />

      <Text className="dp" fontSize={24} mb={6} mt={10}>
        All Restaurants
      </Text>

      {restaurants?.length > 0 ? (
        restaurants[0] === 500 ? (
          <VStack mx={'auto'} h={'500px'} justify={'center'}>
            <Text
              fontSize={48}
              fontWeight={700}
              color={'red.400'}
              lineHeight={1}
            >
              ERROR 500
            </Text>

            <Text>Try to refresh the page</Text>
            <Button
              px={8}
              mt={4}
              variant={'outline'}
              onClick={() => {
                window.location.reload();
              }}
            >
              REFRESH
            </Button>
          </VStack>
        ) : (
          <>
            <SimpleGrid
              w={'100%'}
              columns={[1, 2, 3, 4]}
              gap={6}
              rowGap={16}
              className="dp"
              mb={16}
            >
              {restaurants
                ?.filter(filterOpenNow)
                .filter(filterPrice)
                ?.map((r, i) => {
                  return <RestaurantItem key={i} r={r} />;
                })}
            </SimpleGrid>

            <Box maxW={'320px'} w={'100%'} mx={'auto'} px={6}>
              <Button
                alignSelf={'center'}
                w={'100%'}
                mb={16}
                variant={'outline'}
                colorScheme="p"
                onClick={handleLoadMore}
                isLoading={loadMoreLoading}
              >
                LOAD MORE
              </Button>
            </Box>
          </>
        )
      ) : (
        <VStack mx={'auto'} h={'400px'} justify={'center'}>
          <Spinner my={16} size={'xl'} />
        </VStack>
      )}
    </VStack>
  );
}
