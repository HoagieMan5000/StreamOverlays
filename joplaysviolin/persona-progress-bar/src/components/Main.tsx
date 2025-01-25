import { useEffect, useRef, useState } from "react";
import { setCanvasFullScreen } from "../util/canvas/canvasUtil";
import { MainRenderer } from "../renderers/MainRenderer";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rendererRef = useRef<MainRenderer | null>(null);
  const [widgetData, setWidgetData] = useState<any>(null);

  useEffect(() => {
    async function initialize() {
      const canvas = canvasRef.current;
      if (canvas) {
        rendererRef.current = new MainRenderer(canvas);
        await rendererRef.current.initialize(widgetData);
        draw();
      }
    }
    initialize();
  }, [widgetData, canvasRef.current]);

  const getConfiguration = (obj: any) => {
    const detail = obj.detail;
    const fieldData = detail.fieldData;
    //const channelName = detail.channel.username;

    console.log({ fieldData });
    setWidgetData(fieldData);
  };

  const draw = () => {
    rendererRef.current?.render();
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      setCanvasFullScreen(canvas!);
      draw();
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("onWidgetLoad", getConfiguration);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("onWidgetLoad", getConfiguration);
    };
  }, []);

  return (
    <canvas
      style={{ display: "block" }}
      ref={canvasRef}
      width="100%"
      height="100%"
    ></canvas>
  );
};
