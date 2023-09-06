import {
  Box,
  Button,
  HStack,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Rating from './Rating';

export default function ReviewsList(props) {
  // dynamic
  const [reviews, setReviews] = useState([]);

  const [offset, setOffset] = useState(0);

  // utils
  const getReviews = useCallback(
    async p => {
      const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/reviews/list',
        params: {
          location_id: props?.id,
          limit: '8',
          currency: 'USD',
          lang: 'en_US',
          offset: p?.offset,
        },
        headers: {
          'X-RapidAPI-Key':
            'b04d851b8dmsha944d4cba031189p17f3e2jsnfe6a1423fe40',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      };
      try {
        const response = await axios.request(options);
        console.log(parseInt(response.data.paging?.results));
        if (response) {
          setOffset(ps => {
            // console.log('ps', ps);
            return ps + parseInt(response.data.paging?.results);
          });
          // console.log(response.data.data);
          return response.data.data;
        }
      } catch (error) {
        // console.error(error);
        return error?.response?.status;
      }
    },
    [props?.id]
  );

  useEffect(() => {
    (async () => {
      const res = await getReviews({ offset: 0 });
      const status = res?.response?.data?.status;
      if (status) {
        if (status === 500) {
          setReviews(status);
        }
      } else {
        setReviews(res);
      }
    })();
  }, [getReviews]);

  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  const handleLoadMore = () => {
    (async () => {
      setLoadMoreLoading(true);
      console.log(offset);
      const res = await getReviews({ offset: offset });

      setLoadMoreLoading(false);

      const status = res?.response?.data?.status;
      if (status) {
        if (status === 500) {
          setReviews(status);
        }
      } else {
        setReviews(ps => {
          return [...ps, ...res];
        });
      }
    })();
  };

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
    <>
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
  ) : (
    <VStack w={'100%'} h={'400px'} justify={'center'}>
      <Spinner size={'lg'} />
    </VStack>
  );
}
