import { HStack, Icon } from '@chakra-ui/react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export default function Rating(props) {
  const rating = props?.rating;
  const round = rating / 1;
  const half = Math.round(rating % 1);

  return (
    <HStack gap={0} {...props}>
      {Array.from({ length: round }, (_, i) => i + 1).map(i => (
        <Icon
          key={i}
          fontSize={props?.fontSize | 16}
          as={StarIcon}
          color={props?.color | 'p.500'}
        />
      ))}
      {Array.from({ length: half }, (_, i) => i + 1).map(i => (
        <Icon
          key={i}
          fontSize={props?.fontSize | 16}
          as={StarHalfIcon}
          color={props?.color | 'p.500'}
        />
      ))}
    </HStack>
  );
}
