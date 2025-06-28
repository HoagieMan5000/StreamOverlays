import { useContext, useEffect, useRef, useState } from "react";
import {
  SEDetail,
} from "../streamelements/SEDetail";
import { SessionDataContext } from "./SessionDataProvider";
import { BackgroundImageRenderer } from "../renderers/BackgroundImageRenderer";
import { useResizeCanvas } from "../hooks/resizeCanvas";
import { useQueue } from "../hooks/useQueue";

interface BackgroundProps {}

export const Background: React.FC<BackgroundProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<BackgroundImageRenderer | null>(null);

  const queue = useQueue<SEDetail>();

  const { details } = useContext(SessionDataContext);
  const widgetDataRef = useRef<SEDetail | null>(null);

  useEffect(() => {
    widgetDataRef.current = details
    draw(queue.currentItem, queue.processNextItem);
  }, [queue.currentItem]);

  const draw = (detail: SEDetail | null, doneAnimating: () => void) => {
    rendererRef.current?.render(detail, doneAnimating);
  };

  useEffect(() => {
    async function initialize() {
      const canvas = canvasRef.current;
      if (details && canvas && !rendererRef.current) {
        rendererRef.current = new BackgroundImageRenderer(canvas);
        await rendererRef.current.initialize(details);
        queue.addToQueue(details);
      }
    }
    initialize();
  }, [details, canvasRef.current]);


  useResizeCanvas(canvasRef.current!, () => draw(widgetDataRef.current, () => {}));

  return (
    <>
      <canvas
        style={{ display: "block" }}
        ref={canvasRef}
        width="100%"
        height="100%"
      ></canvas>
    </>
  );
};