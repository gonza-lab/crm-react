import { useEffect, useState } from 'react';

const useDebounce = (callback: () => void, dependency: any[]) => {
  const [timeOut, setStateTimeOut] = useState<NodeJS.Timeout>();
  const [times, setTimes] = useState(0);

  useEffect(() => {
    if (timeOut) clearTimeout(timeOut);

    if (times !== 0) {
      setStateTimeOut(setTimeout(callback, 1000));
    }

    setTimes(times + 1);
    return () => {
      if (timeOut) clearTimeout(timeOut);
    };
  }, dependency);
};

export default useDebounce;
