function filterReducer(filter, action) {
  switch (action.type) {
    default:
      return;

    case 'toggleOpenNow':
      return {
        ...filter,
        openNow: !filter.openNow,
      };

    case 'selectPrice':
      return { ...filter, price: action.price };

    case 'reset':
      return {
        openNow: false,
        price: '',
        categories: '',
      };
  }
}

export default filterReducer;
