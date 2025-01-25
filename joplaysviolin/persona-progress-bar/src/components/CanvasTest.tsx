import { useEffect, useRef, useState } from "react";
import { setCanvasFullScreen } from "../util/canvas/canvasUtil";
import { ElementParams } from "../config/ElementParams";
import { MainRenderer } from "../renderers/MainRenderer";
import { deg2rad } from "../util/Util";

interface CanvasTestProps {}

export const CanvasTest: React.FC<CanvasTestProps> = ({}) => {
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

  const drawFull = () => {
    const canvas = canvasRef.current;
    console.log({ canvas });
    if (canvas) {
      const ctx = canvas.getContext("2d");
      console.log({ ctx });
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;
        const ratioHeight = canvasHeight / 882;
        const ratioWidth = canvasWidth / 882;
        const scale = Math.min(ratioHeight, ratioWidth);

        // Donos
        ctx.translate(90 * ratioWidth, 675 * ratioHeight);
        ctx.rotate(deg2rad(-8.9));
        ctx.font = `900 ${75 * scale}px Franklin Gothic`;
        ctx.fillStyle = ElementParams.ColorSubs;
        ctx.fillText("23 / 169", 0 * ratioWidth, 0 * ratioHeight);

        ctx.restore();
        ctx.save();
        const donosProgressPercent = 0.69; // TODO
        const donos = ElementParams.ProgressBars.donos;
        ctx.translate(
          donos.origin.x * ratioWidth,
          donos.origin.y * ratioHeight
        );
        ctx.rotate(deg2rad(donos.rotation));
        ctx.fillStyle = donos.color;
        ctx.fillRect(
          0,
          0,
          donos.maxWidth * donosProgressPercent * ratioHeight,
          38 * ratioWidth
        );

        ctx.restore();
        ctx.save();

        // Subs
        ctx.translate(410 * ratioWidth, 610 * ratioHeight);
        ctx.rotate(deg2rad(-8.9));
        ctx.font = `900 ${75 * scale}px Franklin Gothic`;
        ctx.fontStretch = "ultra-condensed";
        ctx.fontKerning = "normal";
        ctx.fillStyle = ElementParams.ColorDonos;
        ctx.fillText("1200 / 4000", 0 * ratioWidth, 0 * ratioHeight);

        ctx.restore();
        ctx.save();
        const subsProgressPercent = 0.43; // TODO
        const subs = ElementParams.ProgressBars.subs;
        ctx.translate(subs.origin.x * ratioWidth, subs.origin.y * ratioHeight);
        ctx.rotate(deg2rad(subs.rotation));
        ctx.fillStyle = subs.color;
        ctx.fillRect(
          0,
          0,
          subs.maxWidth * subsProgressPercent * ratioHeight,
          38 * ratioWidth
        );
        ctx.restore();
      }
    }
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
