import { useState, useCallback, useEffect, useRef } from "react";

export function useQueue<T>() {
  const [queue, setQueue] = useState<T[]>([]);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const processingRef = useRef(false);

  // Function to add an item to the queue
  const addToQueue = useCallback((item: T) => {
    setQueue((prevQueue) => [...prevQueue, item]);
  }, []);

  // Function to mark the current item as processed and move to the next one
  const processNextItem = useCallback(() => {
    setQueue((prevQueue) => {
      const [, ...newQueue] = prevQueue;
      setCurrentItem(newQueue.length > 0 ? newQueue[0] : null);
      return newQueue;
    });
  }, []);

  // Effect to start processing the queue when a new item is added
  useEffect(() => {
    if (!processingRef.current && queue.length > 0) {
      setCurrentItem(queue[0]);
      processingRef.current = true;
    }
  }, [queue]);

  return {
    currentItem,
    addToQueue,
    processNextItem,
    numItems: queue.length,
  };
}
