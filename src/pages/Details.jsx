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
  IconButton,
} from '@chakra-ui/react';

import PlaceIcon from '@mui/icons-material/Place';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/get-details',
      params: {
        location_id: id,
        currency: 'USD',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Key': '4b98a873a5msh1293f6b8d7ccbd3p1f9614jsn46f0cf647c89',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      return response?.data;
    } catch (error) {
      //   console.error(error);
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
    <VStack id="details" mx={'auto'} gap={0} align={'flex-start'}>
      <VStack position={'relative'} w={'100%'} h={'400px'}>
        <VStack
          w={'100%'}
          position={'absolute'}
          top={4}
          align={'flex-start'}
          className="dp"
        >
          <IconButton
            onClick={() => {
              window.history.back();
            }}
            icon={<Icon as={ArrowBackIcon} />}
            variant={'ghost'}
          />
        </VStack>

        <Box
          position={'absolute'}
          w={'100%'}
          h={'400px'}
          bgImage={`url(${details?.photo?.images?.original?.url})`}
          bgPosition={'center'}
          bgSize={'cover'}
          filter={'brightness(30%)'}
          zIndex={-1}
        ></Box>

        <Box
          className="dp"
          color={'white'}
          mt={'280px'}
          position={'absolute'}
          bottom={0}
        >
          <Text fontSize={32} fontWeight={700} lineHeight={1} mt={8} mb={2}>
            {details?.name}
          </Text>

          <Rating
            rating={details?.rating}
            fontSize={24}
            mb={4}
            color={'white !important'}
          />
        </Box>
      </VStack>

      <Box
        w={'100%'}
        borderTop={'1px solid var(--divider)'}
        borderBottom={'1px solid var(--divider)'}
      >
        <SimpleGrid
          className="dp"
          columns={[1, null, 2]}
          w={'100%'}
          gap={4}
          py={4}
        >
          <Box pr={0} flexShrink={1}>
            <HStack opacity={0.5}>
              <Icon as={PlaceIcon} />

              <Text fontSize={18} fontWeight={600}>
                Location
              </Text>
            </HStack>

            <Box opacity={0.5} mb={1}>
              <Text px={8}>{details?.address}</Text>
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
      </Box>

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
