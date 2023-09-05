import {
  Box,
  Button,
  HStack,
  Icon,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Text,
} from '@chakra-ui/react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Filter(props) {
  // constant
  const filter = props?.filter;

  const filterDispatch = props?.filterDispatch;

  const prices = ['$', '$$', '$$$', '$$$$', '$$$$$'];

  const categories = [
    'Albanian',
    'American',
    'Arabic',
    'Argentinean',
    'Armenian',
    'Asian',
    'Australian',
    'Bar',
    'Barbecue',
    'Beer restaurants',
    'Beijing cuisine',
    'Belgian',
    'Brew Pub',
    'British',
    'Cafe',
    'Campania',
    'Canadian',
    'Cantonese',
    'Caucasian',
    'Central American',
    'Central Asian',
    'Central European',
    'Chilean',
    'Chinese',
    'Contemporary',
    'Danish',
    'Deli',
    'Diner',
    'Dining bars',
    'Eastern European',
    'Egyptian',
    'European',
    'Fast Food',
    'French',
    'Fruit parlours',
    'Fusion',
    'Gastropub',
    'German',
    'Greek',
    'Grill',
    'Healthy',
    'Hong Kong',
    'Hungarian',
    'Indian',
    'Indigenous',
    'Indonesian',
    'International',
    'Israeli',
    'Italian',
    'Japanese',
    'Japanese Fusion',
    'Korean',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Native American',
    'Neapolitan',
    'Northern-Italian',
    'Pizza',
    'Pub',
    'Russian',
    'Salvadoran',
    'Scandinavian',
    'Scottish',
    'Seafood',
    'Singaporean',
    'Soups',
    'South American',
    'Southern-Italian',
    'Southwestern',
    'Spanish',
    'Steakhouse',
    'Street Food',
    'Sushi',
    'Swedish',
    'Swiss',
    'Taiwanese',
    'Thai',
    'Turkish',
    'Uzbek',
    'Vietnamese',
    'Wine Bar',
  ];

  const filterInitialValues = { openNow: false, price: '', categories: '' };

  // utils
  const isClearFilterDisabled = () => {
    let isDisabled = true;
    Object.keys(filter).forEach(key => {
      if (filter[key] !== filterInitialValues[key]) {
        isDisabled = false;
      }
    });

    return isDisabled;
  };

  const handleResetFilter = () => {
    filterDispatch({ type: 'reset' });
    // setFilter(filterInitialValues);
  };

  const handleToggleOpenNow = () => {
    filterDispatch({ type: 'toggleOpenNow' });
  };

  const handleSelectPrice = p => {
    filterDispatch({ type: 'selectPrice', price: p });
    // setFilter(ps => ({ ...ps, price: p }));
  };

  const handleSelectCategories = c => {
    filterDispatch({ type: 'selectCategories', categories: c });
  };

  return (
    <Box
      w={'100%'}
      borderTop={'1px solid var(--divider)'}
      borderBottom={'1px solid var(--divider)'}
    >
      <HStack
        w={'100%'}
        gap={5}
        justify={'space-between'}
        className="dp"
        py={4}
      >
        <HStack gap={5}>
          <Text flexShrink={0}>Filter By:</Text>

          {/* Open Now */}
          <HStack
            flexShrink={0}
            cursor={'pointer'}
            borderBottom={'1px solid var(--divider)'}
            h={'30px'}
            onClick={handleToggleOpenNow}
          >
            <Box
              w={'16px'}
              h={'16px'}
              border={
                filter?.openNow
                  ? '4px solid var(--p500)'
                  : '2px solid var(--divider)'
              }
              borderRadius={'full'}
            ></Box>

            <Text>Open Now</Text>
          </HStack>

          {/* Price */}
          <Menu>
            <MenuButton
              as={Button}
              h={'30px'}
              px={0}
              variant={'ghost'}
              rightIcon={<Icon as={KeyboardArrowDownIcon} fontSize={20} />}
              fontWeight={400}
              borderBottom={'1px solid var(--divider)'}
              textAlign={'left'}
            >
              <Text mr={4}>{filter?.price || 'Price'}</Text>
            </MenuButton>

            <MenuList minW={'100px'} p={0}>
              <Text p={3} fontSize={14} opacity={0.5} lineHeight={1}>
                Select price level
              </Text>

              {prices.map((p, i) => {
                return (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      handleSelectPrice(p);
                    }}
                  >
                    <HStack>
                      <Text>{p}</Text>
                      <Text opacity={0.5}>{`(${i + 1})`}</Text>
                    </HStack>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>

          {/* Categories */}
          <Menu>
            <MenuButton
              as={Button}
              h={'30px'}
              px={0}
              variant={'ghost'}
              rightIcon={<Icon as={KeyboardArrowDownIcon} fontSize={20} />}
              fontWeight={400}
              borderBottom={'1px solid var(--divider)'}
              textAlign={'left'}
            >
              <Text mr={4}>{filter?.categories || 'Categories'}</Text>
            </MenuButton>

            <MenuList minW={'100px'} maxH={'500px'} overflow={'auto'} p={0}>
              {categories.map((c, i) => {
                return (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      handleSelectCategories(c);
                    }}
                  >
                    {c}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </HStack>

        <Button
          isDisabled={isClearFilterDisabled() ? true : false}
          variant={'outline'}
          px={8}
          fontSize={14}
          onClick={handleResetFilter}
        >
          CLEAR ALL
        </Button>
      </HStack>
    </Box>
  );
}
