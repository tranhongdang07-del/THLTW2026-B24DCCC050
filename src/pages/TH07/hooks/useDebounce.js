import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 300) {
  const [val, setVal] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setVal(value), delay);
    return () => clearTimeout(t);
  }, [value]);

  return val;
}