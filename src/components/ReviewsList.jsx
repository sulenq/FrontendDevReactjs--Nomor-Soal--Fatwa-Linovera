import { HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Rating from './Rating';

export default function ReviewsList() {
  // dynamic
  const [reviews, setReviews] = useState([]);

  // utils
  const getReviews = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', '23023329');
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '0');

    const options = {
      method: 'POST',
      url: 'https://restaurants222.p.rapidapi.com/reviews',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'b04d851b8dmsha944d4cba031189p17f3e2jsnfe6a1423fe40',
        'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.results.data);
      return response.data.results.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getReviews();
      const status = res?.response?.data?.status;
      if (status) {
        if (status === 500) {
          setReviews([status]);
        }
      } else {
        setReviews(res);
      }
    })();
  }, []);

  // console.log(dummy[0]);

  return (
    <SimpleGrid
      w={'100%'}
      columns={[1, 2, 3, 4]}
      gap={6}
      rowGap={16}
      className="dp"
      mb={16}
    >
      {reviews?.map((r, i) => {
        return (
          <VStack key={i} align={'flex-start'}>
            <HStack>
              <Image
                src={r?.user?.avatar?.small?.url}
                borderRadius={'full'}
                boxSize={'30px'}
              />

              <Text fontSize={20} fontWeight={600}>
                {r?.user?.username}
              </Text>
            </HStack>

            <Rating rating={r?.rating} />

            <Text>{r?.text}</Text>
          </VStack>
        );
      })}
    </SimpleGrid>
  );
}
