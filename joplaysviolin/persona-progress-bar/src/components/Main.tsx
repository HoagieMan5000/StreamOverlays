import { useEffect, useRef, useState } from "react";
import { setCanvasFullScreen } from "../util/canvas/canvasUtil";
import { MainRenderer } from "../renderers/MainRenderer";
import {
  OnSessionUpdateEvent,
  SEDetail,
  SessionData,
} from "../streamelements/SEDetail";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const subBarCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const donoBarCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const rendererRef = useRef<MainRenderer | null>(null);
  const [widgetData, setWidgetData] = useState<SEDetail | null>(null);
  const widgetDataRef = useRef<SEDetail | null>(null);

  console.log({ widgetData });
  useEffect(() => {
    widgetDataRef.current = widgetData;
  }, [widgetData]);

  const draw = (detail: SEDetail | null) => {
    rendererRef.current?.render(detail);
  };

  useEffect(() => {
    async function initialize() {
      const canvas = canvasRef.current;
      const subBarCanvas = subBarCanvasRef.current;
      const donoBarCanvas = donoBarCanvasRef.current;
      if (widgetData && canvas && subBarCanvas && donoBarCanvas && !rendererRef.current) {
        console.log("CREATING");
        rendererRef.current = new MainRenderer(canvas, subBarCanvas, donoBarCanvas);
        await rendererRef.current.initialize(widgetData);
        draw(widgetData);
      }
    }
    initialize();
  }, [widgetData, canvasRef.current, subBarCanvasRef.current, donoBarCanvasRef]);

  const getConfiguration = (obj: { detail: SEDetail }) => {
    const detail = obj.detail;
    const fieldData = detail.fieldData;

    console.log({ detail });
    console.log({ fieldData });
    setWidgetData(detail);
  };

  const onSessionUpdate = (obj: OnSessionUpdateEvent) => {
    const widgetData = widgetDataRef.current;
    if (widgetData) {
      const newSession = obj.detail?.session;
      const newDetail = {
        ...widgetData!,
        session: {
          ...widgetData!.session,
          data: {
            ...widgetData!.session.data,
            ...newSession,
          },
        },
      };

      setWidgetData((prev: SEDetail | null) => ({
        ...prev!,
        session: {
          ...prev!.session,
          data: {
            ...prev?.session.data,
            ...newSession,
          },
        },
      }));

      draw(newDetail);
    }
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const canvases = [canvasRef.current, subBarCanvasRef.current, donoBarCanvasRef.current];
      canvases.forEach((canvas) => {
        setCanvasFullScreen(canvas!);
        draw(widgetDataRef.current);  
      });
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("onWidgetLoad", getConfiguration as any);
    window.addEventListener("onSessionUpdate", onSessionUpdate as any);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("onWidgetLoad", getConfiguration as any);
      window.removeEventListener("onSessionUpdate", onSessionUpdate as any);
    };
  }, []);

  return (
    <>
      <canvas
        style={{ display: "block" }}
        ref={canvasRef}
        width="100%"
        height="100%"
      ></canvas>
      <canvas
        style={{ display: "block" }}
        ref={subBarCanvasRef}
        width="100%"
        height="100%"
      ></canvas>
      <canvas
        style={{ display: "block" }}
        ref={donoBarCanvasRef}
        width="100%"
        height="100%"
      ></canvas>
    </>
  );
};
