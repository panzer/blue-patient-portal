import { useEffect, useState } from 'react';

function getOrientation() {
  return window.innerHeight > window.innerWidth;
}

/**
 * Custom React hook that returns a boolean indicating if the device is in portrait orientation.
 *
 * The hook listens for window resize events and updates the value accordingly.
 *
 * @returns {boolean} - `true` if the window's height is greater than its width (portrait), otherwise `false` (landscape).
 *
 * @example
 * const isPortrait = useOrientation();
 * if (isPortrait) {
 *   // Render portrait layout
 * } else {
 *   // Render landscape layout
 * }
 */
function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(getOrientation());

  useEffect(() => {
    function handleResize() {
      setIsPortrait(getOrientation());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isPortrait;
}

export default useOrientation;
