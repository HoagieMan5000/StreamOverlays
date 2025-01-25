import { ElementParams } from "../config/ElementParams";
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
    ctx.fillStyle = this.config.color;
    ctx.fillText("23 / 169", 0 * scale.heightRatio, 0 * scale.widthRatio);
  }
}
