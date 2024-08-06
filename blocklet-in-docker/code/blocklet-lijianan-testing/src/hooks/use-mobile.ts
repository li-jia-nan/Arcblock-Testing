import React from 'react';

const event: keyof WindowEventMap = 'resize';

const externalStore = {
  subscribe(onStoreChange: () => void) {
    window.addEventListener(event, onStoreChange);
    return () => {
      window.removeEventListener(event, onStoreChange);
    };
  },
  getSnapshot() {
    return (
      /Android|iPhone|iPod|iPad/i.test(navigator.userAgent) ||
      window.innerWidth <= 800 ||
      document.body.clientWidth <= 800
    );
  },
};

const useIsMobile = () => {
  return React.useSyncExternalStore<boolean>(externalStore.subscribe, externalStore.getSnapshot);
};

export default useIsMobile;
