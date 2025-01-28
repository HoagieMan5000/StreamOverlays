import { useEffect } from "react";
import { setCanvasFullScreen } from "../util/canvas/canvasUtil";

export const useResizeCanvas = (
  canvas: HTMLCanvasElement,
  draw: () => void
) => {
  useEffect(() => {
    if (canvas) {
      const resizeCanvas = () => {
        setCanvasFullScreen(canvas);
        draw();
      };

      resizeCanvas();

      window.addEventListener("resize", resizeCanvas);

      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, [canvas]);
};
