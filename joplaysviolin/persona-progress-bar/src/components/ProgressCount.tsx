import { useContext, useEffect, useRef, useState } from "react";
import {
  SEDetail,
} from "../streamelements/SEDetail";
import { IRenderer } from "../renderers/IRenderer";
import { SessionDataContext } from "./SessionDataProvider";
import { useResizeCanvas } from "../hooks/resizeCanvas";
import { ProgressCountConfig } from "../config/ProgressCountConfig";
import { ProgressCountRenderer } from "../renderers/ProgressCountRenderer";

interface ProgressCountProps {
  config: ProgressCountConfig;
}

export const ProgressCount: React.FC<ProgressCountProps> = (props: ProgressCountProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { details } = useContext(SessionDataContext);
  
  const rendererRef = useRef<IRenderer | null>(null);
  const widgetDataRef = useRef<SEDetail | null>(null);

  useEffect(() => {
    widgetDataRef.current = details;
    draw(details);
  }, [details]);

  const draw = (detail: SEDetail | null) => {
    rendererRef.current?.render(detail);
  };

  useEffect(() => {
    async function initialize() {
      const canvas = canvasRef.current;
      if (details && canvas && !rendererRef.current) {
        rendererRef.current = new ProgressCountRenderer(canvas, props.config);
        await rendererRef.current.initialize(details);
        draw(details);
      }
    }
    initialize();
  }, [details, canvasRef.current]);

  useResizeCanvas(canvasRef.current!, () => draw(widgetDataRef.current));

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
