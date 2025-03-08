import { useContext, useEffect, useRef, useState } from "react";
import { SEDetail } from "../streamelements/SEDetail";
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

  const { addToQueue, currentItem, processNextItem } = useQueue<SEDetail>();

  const draw = (detail: SEDetail | null) => {
    rendererRef.current?.render(detail, processNextItem);
  };

  useEffect(() => {
    if (details) {
      addToQueue(details);
    }
  }, [details]);

  useEffect(() => {
    async function initialize() {
      const canvas = canvasRef.current;
      if (details && canvas && !rendererRef.current) {
        rendererRef.current = props.renderer(canvas);
        await rendererRef.current.initialize(details);
        // TODO do an initial draw? Or will be be taken care of?
      }
    }
    initialize();
  }, [details, canvasRef.current]);

  useEffect(() => {
    if (currentItem) {
      console.log("DRAW");
      draw(currentItem);
    }
  }, [currentItem]);

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
