import {
  Button,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Rating from './Rating';

export default function ReviewsList(props) {
  // dynamic
  const [reviews, setReviews] = useState([]);

  // utils
  const getReviews = useRef(() => {});
  getReviews.current = async () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', props?.id);
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '0');

    const options = {
      method: 'POST',
      url: 'https://restaurants222.p.rapidapi.com/reviews',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '6892fa5b83mshd00612e97bc8d9ap10baaejsnc1319da14464',
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
      return error.response.status;
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getReviews.current();
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

  return reviews === 500 ? (
    <VStack mx={'auto'} h={'400px'} justify={'center'}>
      <Text fontSize={48} fontWeight={700} color={'red.400'} lineHeight={1}>
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
    <SimpleGrid
      w={'100%'}
      columns={[1, 2, 3, 4]}
      gap={6}
      rowGap={16}
      className="dp"
      mb={16}
    >
      {reviews?.length > 0
        ? reviews?.map((r, i) => {
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
          })
        : ''}
    </SimpleGrid>
  );
}
