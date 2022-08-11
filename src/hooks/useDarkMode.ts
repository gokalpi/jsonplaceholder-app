import { useEffect } from 'react';

import useLocalStorage from './useLocalStorage';
import useMedia from './useMedia';

export default function useDarkMode(): [boolean, () => void] {
  // Use our useLocalStorage hook to persist state through a page refresh.
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', false);

  // See if user has set a browser or OS preference for dark mode.
  const prefersDarkMode = useMedia<boolean>(['(prefers-color-scheme: dark)'], [true], false);

  // If isDarkMode is defined use it, otherwise fallback to prefersDarkMode.
  const enabled = isDarkMode ?? prefersDarkMode;

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = 'dark';
      const element = document.documentElement;
      if (enabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [enabled] // Only re-call effect when value changes
  );

  // Return enabled state and setter
  return [enabled, toggleDarkMode];
}
