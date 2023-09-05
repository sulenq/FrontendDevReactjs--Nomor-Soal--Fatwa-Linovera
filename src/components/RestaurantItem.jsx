import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import Rating from './Rating';
import isRestaurantOpen from '../utils/isRestaurantOpen';
import { Link } from 'react-router-dom';

export default function RestaurantItem({ r }) {
  // console.log(r);

  if (r?.name) {
    return (
      <VStack justify={'space-between'}>
        <Box w={'100%'}>
          {/* Img */}
          <Box
            mb={'10px'}
            h={'200px'}
            w={'100%'}
            overflow={'hidden'}
            bgImage={`url(${r?.photo?.images?.medium?.url})`}
            bgSize={'cover'}
            bgPosition={'center'}
          ></Box>

          <Text
            mb={'10px'}
            fontWeight={500}
            fontSize={18}
            noOfLines={2}
            lineHeight={1}
          >
            {r?.name}
          </Text>
          <Rating rating={r?.rating} mb={'10px'} />
          <HStack justify={'space-between'} fontSize={12} mb={'10px'}>
            <HStack gap={1} opacity={0.6}>
              <Text>{r?.cuisine?.[0]?.name?.toUpperCase()}</Text>

              <Text>•</Text>

              <Text>{r?.price_level || 'Unsure'}</Text>
            </HStack>

            <HStack gap={1}>
              <Box
                w={'8px'}
                h={'8px'}
                bg={
                  isRestaurantOpen(r?.open_now_text) ? 'green.300' : 'red.400'
                }
                borderRadius={'full'}
                mb={'1px'}
              ></Box>

              <Text>{r?.open_now_text ? r?.open_now_text : 'Unsure'}</Text>
            </HStack>
          </HStack>
        </Box>

        <Button
          as={Link}
          to={`/${r?.location_id}`}
          colorScheme="p"
          w={'100%'}
          size={'sm'}
        >
          LEARN MORE
        </Button>
      </VStack>
    );
  }
}
