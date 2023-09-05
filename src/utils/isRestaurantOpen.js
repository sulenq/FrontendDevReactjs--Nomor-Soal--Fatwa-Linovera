function isRestaurantOpen(text) {
  return text?.includes('Open') && !text?.includes('Opens');
}

export default isRestaurantOpen;
