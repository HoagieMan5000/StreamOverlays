import { ElementParams } from "../config/ElementParams";
import { createTextWithSpacing } from "../util/canvas/canvasTextUtil";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";

export class ProgressCountRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: any; // TODO type

  constructor(canvas: HTMLCanvasElement, config: any) {
    this.canvas = canvas;
    this.config = config;
  }

  public async initialize(widgetData: any): Promise<void> {}

  render() {
    const ctx = this.canvas.getContext("2d")!;
    const scale = getScaleRatio(
      this.canvas,
      ElementParams.referenceCanvasWidth,
      ElementParams.referenceCanvasHeight
    );

    ctx.translate(this.config.origin.x * scale.heightRatio, this.config.origin.y * scale.widthRatio);
    ctx.rotate(deg2rad(this.config.rotation));
    ctx.font = `900 ${75 * scale.scale}px Franklin Gothic`;
    ctx.fontKerning = "auto";
    ctx.fillStyle = this.config.color;
    const { width } = createTextWithSpacing(ctx,
      "23/169",
      (char, dx) => ctx.fillText(char, 0 + dx, 0),
      0.0001 * scale.scale
    );
  }
}
