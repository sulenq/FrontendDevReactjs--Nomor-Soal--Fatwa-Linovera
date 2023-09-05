import { extendTheme } from '@chakra-ui/react';

export const myTheme = extendTheme({
  colors: {
    p: {
      50: '#D4E4F6',
      100: '#D4E4F6',
      200: '#ADC8ED',
      300: '#7898CA',
      400: '#496596',
      500: '#1A2C51',
      600: '#132145',
      700: '#0D183A',
      800: '#08112E',
      900: '#040B26',
    },
    ap: {
      50: '#5A8CF0',
      100: '#5A8CF0',
      200: '#5A8CF0',
      300: '#5A8CF0',
      400: '#5A8CF0',
      500: '#5A8CF0',
      600: '#5A8CF0',
      700: '#5A8CF0',
      800: '#5A8CF0',
      900: '#5A8CF0',
    },
    bnw: {
      //   50: "#f1f8ff",
      //   100: "#DEEDFE",
      200: 'white',
      300: '#5A8CF0',
      //   400: "#2D4FAC",
      500: 'black',
      600: '#5A8CF0',
      //   700: "#2D4FAC",
      //   800: "#1C368B",
      //   900: "#112473",
    },
    b: '#111111',
    bt: '#333333',
    wt: '#e8e6e3',
  },

  styles: {
    global: props => ({
      body: {
        bg: props.colorMode === 'dark' ? '#111111' : 'white',
      },
    }),
  },

  components: {
    Modal: {
      baseStyle: props => ({
        dialog: {
          backdropFilter: 'blur(10px)',
          bg: props.colorMode === 'dark' ? '#18191b' : 'white',
          mx: '16px',
          //   borderRadius: '24px',
          // border: '1px solid var(--divider)',
        },
      }),
    },

    // Menu: {
    //   baseStyle: props => ({
    //     list: {
    //       bg: props.colorMode === 'dark' ? '#111111' : 'white',
    //     },
    //     item: {
    //       bg: props.colorMode === 'dark' ? '#111111' : 'white',
    //       _hover: { bg: 'var(--divider)' },
    //     },
    //   }),
    // },

    Button: {
      baseStyle: props => ({
        borderRadius: '0',
      }),
    },

    Checkbox: {
      baseStyle: props => ({
        icon: {
          color: 'white',
        },
      }),
    },
  },
});
