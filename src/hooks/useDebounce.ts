import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 200) => {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const tid = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(tid);
    };
  }, [value, delay]);

  return debounced;
};
