import { useState, useCallback, useEffect, useRef } from "react";

export function useQueue<T>() {
  const [queue, setQueue] = useState<T[]>([]);
  const [currentItem, setCurrentItem] = useState<T | null>(null);

  // Function to add an item to the queue
  const addToQueue = useCallback((item: T) => {
    setQueue((prevQueue) => {
      const newQueue = [...(prevQueue ?? []), item];
      if (prevQueue.length === 0) {
        setCurrentItem(item);
      }
      return newQueue;
    });
  }, []);

  // Function to mark the current item as processed and move to the next one
  // NOTE: If it seems like the queue gets stuck, make sure the same element isn't added more than once!!!
  const processNextItem = useCallback(() => {
    setQueue((prevQueue) => {
      const newQueue = prevQueue.slice(1);
      const nextItem = newQueue.length > 0 ? newQueue[0] : null;
      setCurrentItem(nextItem ? { ...nextItem } : nextItem);
      return newQueue;
    });
  }, [setQueue]);

  return {
    currentItem,
    addToQueue,
    processNextItem,
    numItems: queue.length,
  };
}
