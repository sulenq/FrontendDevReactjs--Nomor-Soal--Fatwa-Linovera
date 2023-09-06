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
  Stack,
} from '@chakra-ui/react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import useScreenWidth from '../utils/useScreenWidth';

export default function Filter(props) {
  // constant
  const filter = props?.filter;

  const filterDispatch = props?.filterDispatch;

  const prices = ['$', '$$', '$$$', '$$$$', '$$$$$'];

  const categories = [
    {
      label: 'All Cuisines',
      value: 'all',
      selected: true,
      count: '2171',
      default: true,
      single_select: true,
    },
    {
      label: 'Afghan',
      value: '10788',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'African',
      value: '10632',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Aligot',
      value: '21015',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'American',
      value: '9908',
      selected: false,
      count: '112',
      default: false,
      single_select: false,
    },
    {
      label: 'Apple pie',
      value: '21027',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Apulian',
      value: '20073',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Arabic',
      value: '11744',
      selected: false,
      count: '4',
      default: false,
      single_select: false,
    },
    {
      label: 'Asian',
      value: '10659',
      selected: false,
      count: '1209',
      default: false,
      single_select: false,
    },
    {
      label: 'Australian',
      value: '10681',
      selected: false,
      count: '10',
      default: false,
      single_select: false,
    },
    {
      label: 'Bar',
      value: '10640',
      selected: false,
      count: '35',
      default: false,
      single_select: false,
    },
    {
      label: 'Barbecue',
      value: '10651',
      selected: false,
      count: '38',
      default: false,
      single_select: false,
    },
    {
      label: 'Beef',
      value: '20752',
      selected: false,
      count: '37',
      default: false,
      single_select: false,
    },
    {
      label: 'Beer restaurants',
      value: '21355',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Belgian',
      value: '10617',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Bibimbap',
      value: '10877',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Brew Pub',
      value: '10621',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'British',
      value: '10662',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
    },
    {
      label: 'Burger',
      value: '10907',
      selected: false,
      count: '13',
      default: false,
      single_select: false,
    },
    {
      label: 'Burrito',
      value: '10878',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Cafe',
      value: '10642',
      selected: false,
      count: '290',
      default: false,
      single_select: false,
    },
    {
      label: 'Cajun & Creole',
      value: '10635',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Cakes',
      value: '21275',
      selected: false,
      count: '13',
      default: false,
      single_select: false,
    },
    {
      label: 'Calamari',
      value: '20027',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Cantonese',
      value: '10692',
      selected: false,
      count: '8',
      default: false,
      single_select: false,
      parent_id: '5379',
    },
    {
      label: 'Carbonara',
      value: '20320',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Central American',
      value: '10760',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Central Asian',
      value: '11739',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Central European',
      value: '10746',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Central-Italian',
      value: '20075',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Ceviche',
      value: '10883',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Cheesecake',
      value: '10885',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Chicken Wings',
      value: '10685',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Chili',
      value: '20029',
      selected: false,
      count: '5',
      default: false,
      single_select: false,
    },
    {
      label: 'Chinese',
      value: '5379',
      selected: false,
      count: '140',
      default: false,
      single_select: false,
    },
    {
      label: 'Churrasco',
      value: '10891',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Clams',
      value: '20556',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
    },
    {
      label: 'Contemporary',
      value: '10669',
      selected: false,
      count: '6',
      default: false,
      single_select: false,
    },
    {
      label: 'Crab',
      value: '10893',
      selected: false,
      count: '9',
      default: false,
      single_select: false,
    },
    {
      label: 'Crab Cake',
      value: '10894',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Crepes',
      value: '20317',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Curry',
      value: '20181',
      selected: false,
      count: '5',
      default: false,
      single_select: false,
    },
    {
      label: 'Deli',
      value: '10666',
      selected: false,
      count: '9',
      default: false,
      single_select: false,
    },
    {
      label: 'Dim Sum',
      value: '10896',
      selected: false,
      count: '13',
      default: false,
      single_select: false,
    },
    {
      label: 'Diner',
      value: '10676',
      selected: false,
      count: '8',
      default: false,
      single_select: false,
    },
    {
      label: 'Dining bars',
      value: '21353',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Duck',
      value: '21022',
      selected: false,
      count: '15',
      default: false,
      single_select: false,
    },
    {
      label: 'Dumplings',
      value: '10898',
      selected: false,
      count: '4',
      default: false,
      single_select: false,
    },
    {
      label: 'Dutch',
      value: '10627',
      selected: false,
      count: '8',
      default: false,
      single_select: false,
    },
    {
      label: 'Eastern European',
      value: '10742',
      selected: false,
      count: '6',
      default: false,
      single_select: false,
    },
    {
      label: 'Eggplant',
      value: '20483',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Eggs Benedict',
      value: '19959',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Egyptian',
      value: '10784',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Escargot',
      value: '20333',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'European',
      value: '10654',
      selected: false,
      count: '138',
      default: false,
      single_select: false,
    },
    {
      label: 'Fajitas',
      value: '20034',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Fast Food',
      value: '10646',
      selected: false,
      count: '60',
      default: false,
      single_select: false,
    },
    {
      label: 'Fish',
      value: '21324',
      selected: false,
      count: '40',
      default: false,
      single_select: false,
    },
    {
      label: 'Fish & Chips',
      value: '10901',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'French',
      value: '5086',
      selected: false,
      count: '15',
      default: false,
      single_select: false,
    },
    {
      label: 'French Fries',
      value: '20703',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Fried rice',
      value: '21285',
      selected: false,
      count: '7',
      default: false,
      single_select: false,
    },
    {
      label: 'Fusion',
      value: '10671',
      selected: false,
      count: '74',
      default: false,
      single_select: false,
    },
    {
      label: 'Gastropub',
      value: '10683',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Gelato',
      value: '20533',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Greek',
      value: '10664',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
    },
    {
      label: 'Grill',
      value: '10668',
      selected: false,
      count: '39',
      default: false,
      single_select: false,
    },
    {
      label: 'Hawaiian',
      value: '10772',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Healthy',
      value: '10679',
      selected: false,
      count: '22',
      default: false,
      single_select: false,
    },
    {
      label: 'Hong Kong',
      value: '10755',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
      parent_id: '5379',
    },
    {
      label: 'Hot Dog',
      value: '10908',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Hot Pot',
      value: '10909',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Ice Cream',
      value: '9899',
      selected: false,
      count: '8',
      default: false,
      single_select: false,
    },
    {
      label: 'Imperial Chinese',
      value: '10729',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
    },
    {
      label: 'Indian',
      value: '10346',
      selected: false,
      count: '11',
      default: false,
      single_select: false,
    },
    {
      label: 'Indonesian',
      value: '10690',
      selected: false,
      count: '1073',
      default: false,
      single_select: false,
    },
    {
      label: 'International',
      value: '10648',
      selected: false,
      count: '120',
      default: false,
      single_select: false,
    },
    {
      label: 'Italian',
      value: '4617',
      selected: false,
      count: '70',
      default: false,
      single_select: false,
    },
    {
      label: 'Japanese',
      value: '5473',
      selected: false,
      count: '105',
      default: false,
      single_select: false,
    },
    {
      label: 'Japanese Fusion',
      value: '21367',
      selected: false,
      count: '9',
      default: false,
      single_select: false,
    },
    {
      label: 'Juice & Smoothies',
      value: '9911',
      selected: false,
      count: '16',
      default: false,
      single_select: false,
    },
    {
      label: 'Kale Salad',
      value: '20187',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Korean',
      value: '10661',
      selected: false,
      count: '37',
      default: false,
      single_select: false,
    },
    {
      label: 'Lamb',
      value: '21174',
      selected: false,
      count: '18',
      default: false,
      single_select: false,
    },
    {
      label: 'Lamb chops',
      value: '20039',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Lasagne',
      value: '10914',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
    },
    {
      label: 'Latin',
      value: '10639',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Lazio',
      value: '20068',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Lebanese',
      value: '10626',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Lobster',
      value: '10915',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Malaysian',
      value: '10741',
      selected: false,
      count: '19',
      default: false,
      single_select: false,
    },
    {
      label: 'Mandarin Duck',
      value: '10917',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Meatballs',
      value: '20318',
      selected: false,
      count: '11',
      default: false,
      single_select: false,
    },
    {
      label: 'Medicinal foods',
      value: '21350',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Mediterranean',
      value: '10649',
      selected: false,
      count: '6',
      default: false,
      single_select: false,
    },
    {
      label: 'Mexican',
      value: '5110',
      selected: false,
      count: '8',
      default: false,
      single_select: false,
    },
    {
      label: 'Middle Eastern',
      value: '10687',
      selected: false,
      count: '9',
      default: false,
      single_select: false,
    },
    {
      label: 'Moroccan',
      value: '10633',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'New Zealand',
      value: '10709',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Noodle',
      value: '10645',
      selected: false,
      count: '27',
      default: false,
      single_select: false,
    },
    {
      label: 'NorthWestern Chinese',
      value: '10780',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Omelette',
      value: '10921',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Pad Thai',
      value: '10923',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Pancakes',
      value: '16555',
      selected: false,
      count: '4',
      default: false,
      single_select: false,
    },
    {
      label: 'Pasta',
      value: '10678',
      selected: false,
      count: '23',
      default: false,
      single_select: false,
    },
    {
      label: 'Peking Duck',
      value: '10925',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Peruvian',
      value: '10631',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Pesto',
      value: '21239',
      selected: false,
      count: '24',
      default: false,
      single_select: false,
    },
    {
      label: 'Pho',
      value: '19953',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Pizza',
      value: '10641',
      selected: false,
      count: '42',
      default: false,
      single_select: false,
    },
    {
      label: 'Pork',
      value: '21326',
      selected: false,
      count: '18',
      default: false,
      single_select: false,
    },
    {
      label: 'Prawns',
      value: '20699',
      selected: false,
      count: '7',
      default: false,
      single_select: false,
    },
    {
      label: 'Pub',
      value: '10670',
      selected: false,
      count: '32',
      default: false,
      single_select: false,
    },
    {
      label: 'Quail',
      value: '20561',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Ramen',
      value: '11722',
      selected: false,
      count: '8',
      default: false,
      single_select: false,
    },
    {
      label: 'Ribs',
      value: '10932',
      selected: false,
      count: '10',
      default: false,
      single_select: false,
    },
    {
      label: 'Risotto',
      value: '20312',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Romana',
      value: '20067',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Russian',
      value: '10693',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Salad',
      value: '16554',
      selected: false,
      count: '25',
      default: false,
      single_select: false,
    },
    {
      label: 'Salmon',
      value: '20547',
      selected: false,
      count: '20',
      default: false,
      single_select: false,
    },
    {
      label: 'Sandwiches',
      value: '10647',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Sashimi',
      value: '21320',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Seafood',
      value: '10643',
      selected: false,
      count: '56',
      default: false,
      single_select: false,
    },
    {
      label: 'Shabu Shabu',
      value: '21281',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Shrimp',
      value: '10937',
      selected: false,
      count: '6',
      default: false,
      single_select: false,
    },
    {
      label: 'Singaporean',
      value: '10714',
      selected: false,
      count: '10',
      default: false,
      single_select: false,
    },
    {
      label: 'Sirloin Steak',
      value: '20485',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
    },
    {
      label: 'Soups',
      value: '10700',
      selected: false,
      count: '10',
      default: false,
      single_select: false,
    },
    {
      label: 'South American',
      value: '10749',
      selected: false,
      count: '4',
      default: false,
      single_select: false,
    },
    {
      label: 'Southern-Italian',
      value: '20076',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Southwestern',
      value: '10634',
      selected: false,
      count: '7',
      default: false,
      single_select: false,
    },
    {
      label: 'Spanish',
      value: '10655',
      selected: false,
      count: '5',
      default: false,
      single_select: false,
    },
    {
      label: 'Steakhouse',
      value: '10345',
      selected: false,
      count: '70',
      default: false,
      single_select: false,
    },
    {
      label: 'Street Food',
      value: '10686',
      selected: false,
      count: '15',
      default: false,
      single_select: false,
    },
    {
      label: 'Sukiyaki & Shabu Shabu',
      value: '11726',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Sushi',
      value: '10653',
      selected: false,
      count: '27',
      default: false,
      single_select: false,
    },
    {
      label: 'Taiwanese',
      value: '10696',
      selected: false,
      count: '3',
      default: false,
      single_select: false,
    },
    {
      label: 'Tempura',
      value: '11717',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Thai',
      value: '10660',
      selected: false,
      count: '27',
      default: false,
      single_select: false,
    },
    {
      label: 'Tilapia',
      value: '20553',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Tiramisu',
      value: '20314',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Toasts',
      value: '20730',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Tuna',
      value: '20552',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Turkish',
      value: '10663',
      selected: false,
      count: '7',
      default: false,
      single_select: false,
    },
    {
      label: 'Udon',
      value: '21270',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Udon & Soba (Wheat & Buckwheat Noodle)',
      value: '11721',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Uzbek',
      value: '11740',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Vegetable dishes',
      value: '21346',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
    {
      label: 'Vietnamese',
      value: '10675',
      selected: false,
      count: '6',
      default: false,
      single_select: false,
    },
    {
      label: 'Waffles',
      value: '20045',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Wine Bar',
      value: '10682',
      selected: false,
      count: '11',
      default: false,
      single_select: false,
    },
    {
      label: 'Wings',
      value: '19955',
      selected: false,
      count: '2',
      default: false,
      single_select: false,
    },
    {
      label: 'Yakiniku (Japanese BBQ)',
      value: '11735',
      selected: false,
      count: '1',
      default: false,
      single_select: false,
    },
  ];

  const filterInitialValues = props?.filterInitialValues;

  // utils
  const isClearFilterDisabled = () => {
    let isDisabled = true;
    Object.keys(filter).forEach(key => {
      if (key === 'categories') {
        if (filter[key].value !== 'all') {
          isDisabled = false;
        }
      } else {
        if (filter[key] !== filterInitialValues[key]) {
          isDisabled = false;
        }
      }
    });

    return isDisabled;
  };

  const handleResetFilter = () => {
    filterDispatch({ type: 'reset', filterInitialValues: filterInitialValues });
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

  const sw = useScreenWidth();

  return (
    <Box
      w={'100%'}
      borderTop={'1px solid var(--divider)'}
      borderBottom={'1px solid var(--divider)'}
    >
      <Stack
        align={'center'}
        direction={['column', 'row']}
        w={'100%'}
        gap={5}
        justify={'space-between'}
        className="dp"
        py={4}
      >
        <Stack
          w={'100%'}
          align={'center'}
          direction={['column', null, 'row']}
          rowGap={1}
          columnGap={5}
        >
          <Text w={sw < 770 ? '100%' : ''} flexShrink={0} fontWeight={600}>
            Filter By:
          </Text>

          <Stack
            w={'100%'}
            direction={sw < 350 ? 'column' : 'row'}
            gap={sw < 350 ? 2 : 6}
          >
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
                    ? '4px solid #68D391'
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

                <MenuItem
                  onClick={() => {
                    handleSelectPrice('');
                  }}
                >
                  <HStack>
                    <Text>{'None'}</Text>
                  </HStack>
                </MenuItem>

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
                <Text mr={4}>{filter?.categories.label}</Text>
              </MenuButton>

              <MenuList
                minW={'100px'}
                maxW={'200px'}
                maxH={'400px'}
                overflow={'auto'}
                p={0}
              >
                <Text p={3} fontSize={14} opacity={0.5} lineHeight={1}>
                  Select category/cuisine
                </Text>

                {categories.map((c, i) => {
                  return (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        handleSelectCategories(c);
                      }}
                    >
                      {c?.label}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </Stack>
        </Stack>

        <Button
          w={['100%', 'fit-content']}
          isDisabled={isClearFilterDisabled() ? true : false}
          variant={'outline'}
          px={8}
          fontSize={14}
          onClick={handleResetFilter}
        >
          CLEAR ALL
        </Button>
      </Stack>
    </Box>
  );
}
