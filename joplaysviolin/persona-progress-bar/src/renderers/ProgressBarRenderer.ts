import { ElementParams } from "../config/ElementParams";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";

export class ProgressBarRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: any; // TODO type

  constructor(canvas: HTMLCanvasElement, config: any) {
    this.canvas = canvas;
    this.config = config;
  }

  public async initialize(widgetData: any): Promise<void> {}

  render() {
    const scale = getScaleRatio(
      this.canvas,
      ElementParams.referenceCanvasWidth,
      ElementParams.referenceCanvasHeight
    );
    console.log({ scale });
    const ctx = this.canvas.getContext("2d")!;

    const donosProgressPercent = 0.69; // TODO
    const donos = this.config;
    ctx.translate(
      donos.origin.x * scale.widthRatio,
      donos.origin.y * scale.heightRatio
    );
    ctx.rotate(deg2rad(donos.rotation));
    ctx.fillStyle = donos.color;
    ctx.fillRect(
      0,
      0,
      donos.maxWidth * donosProgressPercent * scale.widthRatio,
      38 * scale.heightRatio
    );
  }
}
