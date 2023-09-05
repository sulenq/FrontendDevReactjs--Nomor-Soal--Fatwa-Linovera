import { useState } from 'react';

export default function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  function handleResize() {
    setScreenWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);
  return screenWidth;
}
