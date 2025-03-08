import { useContext, useEffect, useRef, useState } from "react";
import {
  SEDetail,
} from "../streamelements/SEDetail";
import { IRenderer } from "../renderers/IRenderer";
import { SessionDataContext } from "./SessionDataProvider";
import { useResizeCanvas } from "../hooks/resizeCanvas";
import { useQueue } from "../hooks/useQueue";

interface CanvasRendererProps {
  renderer: (canvas: HTMLCanvasElement) => IRenderer;
}

export const CanvasRenderer: React.FC<CanvasRendererProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { details } = useContext(SessionDataContext);
  
  const rendererRef = useRef<IRenderer | null>(null);
  const widgetDataRef = useRef<SEDetail | null>(null);

  const queue = useQueue<SEDetail>();

  const draw = (detail: SEDetail | null) => {
    rendererRef.current?.render(detail, queue.processNextItem);
  };

  useEffect(() => {
    if (details) {
      queue.addToQueue(details);
    }
  }, [details]);

  useEffect(() => {
    async function initialize() {
      const canvas = canvasRef.current;
      if (details && canvas && !rendererRef.current) {
        rendererRef.current = props.renderer(canvas);
        await rendererRef.current.initialize(details);
        queue.addToQueue(details);
        widgetDataRef.current = details;
      }
    }
    initialize();
  }, [details, canvasRef.current]);

  useEffect(() => {
    if (queue.currentItem) {
      draw(queue.currentItem);
    }
  }, [queue.currentItem]);

  useResizeCanvas(canvasRef.current!, () => rendererRef.current?.resize());

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
