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
  // datas
  const filter = props?.filter;
  const filterDispatch = props?.filterDispatch;

  const prices = ['$', '$$', '$$$', '$$$$', '$$$$$'];
  const categories = [];
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

  return (
    <HStack
      w={'100%'}
      gap={5}
      justify={'space-between'}
      className="dp"
      py={4}
      borderTop={'1px solid var(--divider)'}
      borderBottom={'1px solid var(--divider)'}
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

          <MenuList minW={'100px'} p={0}>
            <Text p={3}>The API does not support this feature (server-side-filter)</Text>
            {categories.map((c, i) => {
              return (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleSelectPrice(c);
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
  );
}
