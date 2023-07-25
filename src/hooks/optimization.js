import { useRef, useEffect, useMemo } from "react";
import _debounce from "lodash/debounce";

const DEBOUNCE_TIME = 1000;

const useDebounce = (callback) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return _debounce(func, DEBOUNCE_TIME);
  }, []);

  return debouncedCallback;
};

export { useDebounce };
