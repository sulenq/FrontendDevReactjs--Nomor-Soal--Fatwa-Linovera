import {
  Button,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
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
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/reviews/list',
      params: {
        location_id: props?.id,
        limit: '20',
        currency: 'USD',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Key': 'd4108be16emsh49e6646cdbd2708p125a95jsnd8975de09285',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };
    try {
      const response = await axios.request(options);
      // console.log(response);
      return response.data.data;
    } catch (error) {
      // console.error(error);
      return error?.response?.status;
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getReviews.current();
      const status = res?.response?.data?.status;
      if (status) {
        if (status === 500) {
          setReviews(status);
        }
      } else {
        setReviews(res);
      }
    })();
  }, []);

  // console.log(dummy[0]);

  return typeof reviews === 'number' ? (
    <VStack mx={'auto'} h={'400px'} justify={'center'}>
      <Text
        fontSize={32}
        textAlign={'center'}
        fontWeight={700}
        color={'red.400'}
        lineHeight={1}
      >
        SOMETHING WRONG
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
  ) : reviews?.length > 0 ? (
    <SimpleGrid
      w={'100%'}
      columns={[1, null, 2]}
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

                <Text noOfLines={5}>{r?.text}</Text>
              </VStack>
            );
          })
        : ''}
    </SimpleGrid>
  ) : (
    <VStack w={'100%'} h={'400px'} justify={'center'}>
      <Spinner size={'lg'} />
    </VStack>
  );
}
