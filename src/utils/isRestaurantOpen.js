function isRestaurantOpen(text) {
  return (
    (text?.includes('Open') && !text?.includes('Opens')) ||
    text?.includes('Closes')
  );
}

export default isRestaurantOpen;
