import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
  Link,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';

import PlaceIcon from '@mui/icons-material/Place';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import { useEffect, useRef, useState } from 'react';
import Rating from '../components/Rating';
import ReviewsList from '../components/ReviewsList';

export default function Details() {
  // constant
  const { id } = useParams();

  // dynamic
  const [details, setDetails] = useState({});

  // utils
  const getDetails = useRef(() => {});
  getDetails.current = async () => {
    const encodedParams = new URLSearchParams();
    // p
    encodedParams.set('location_id', id);
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');

    const options = {
      method: 'POST',
      url: 'https://restaurants222.p.rapidapi.com/detail',
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
      return response?.data?.results;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getDetails.current();
      const status = res?.response?.status;
      if (status) {
        if (status === 500) {
          setDetails(status);
        }
      } else {
        setDetails(res);
      }
    })();
    // setDetails(500);
  }, []);

  return details === 500 ? (
    <VStack mx={'auto'} h={'100vh'} justify={'center'}>
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
  ) : Object.keys(details).length > 0 ? (
    <VStack
      id="details"
      maxW={'1280px'}
      mx={'auto'}
      gap={0}
      align={'flex-start'}
    >
      <Text
        fontSize={42}
        fontWeight={700}
        lineHeight={1}
        mt={8}
        mb={2}
        className="dp"
        color={'p.500'}
      >
        {details?.name}
      </Text>

      <Rating rating={details?.rating} fontSize={30} className="dp" mb={4} />

      <SimpleGrid
        className="dp"
        columns={[1, null, 2]}
        w={'100%'}
        gap={4}
        py={4}
        borderTop={'1px solid var(--divider)'}
        borderBottom={'1px solid var(--divider)'}
      >
        <Box pr={0} flexShrink={1}>
          <HStack opacity={0.5}>
            <Icon as={PlaceIcon} color={'p.400'} />

            <Text fontSize={24} fontWeight={600} color={'p.400'}>
              Location
            </Text>
          </HStack>

          <Box opacity={0.5} mb={1}>
            <Text color={'p.400'} fontSize={18} px={8}>
              {details?.address}
            </Text>
          </Box>
        </Box>

        <Button
          w={'140px'}
          justifySelf={[null, null, 'flex-end']}
          ml={[8, null, 0]}
          alignSelf={'center'}
          as={Link}
          href={`https://www.google.com/maps/place/${details?.latitude} ${details?.longitude}`}
          textDecor={'none !important'}
          isExternal
          flexShrink={0}
          //   variant={'outline'}
          colorScheme="p"
          rightIcon={<Icon as={ArrowOutwardIcon} fontSize={16} mb={'2px'} />}
        >
          Maps
        </Button>
      </SimpleGrid>

      <Text className="dp" fontSize={28} mb={6} mt={10}>
        Reviews
      </Text>

      <ReviewsList id={details?.location_id} />
    </VStack>
  ) : (
    <VStack h={'100vh'} justify={'center'}>
      <Spinner size={'xl'} />
    </VStack>
  );
}
