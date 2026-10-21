import { useEffect } from 'react';

let locks = 0;

export function useBodyLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    document.body.classList.add('no-scroll');
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) document.body.classList.remove('no-scroll');
    };
  }, [active]);
}
