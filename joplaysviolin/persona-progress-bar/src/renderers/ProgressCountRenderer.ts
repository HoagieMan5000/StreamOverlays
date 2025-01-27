import { ElementParams } from "../config/ElementParams";
import { ProgressCountConfig } from "../config/ProgressCountConfig";
import { SEDetail } from "../streamelements/SEDetail";
import { createTextWithSpacing } from "../util/canvas/canvasTextUtil";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";

export class ProgressCountRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: ProgressCountConfig;

  constructor(canvas: HTMLCanvasElement, config: ProgressCountConfig) {
    this.canvas = canvas;
    this.config = config;
  }

  public async initialize(detail: SEDetail | null): Promise<void> {}

  render(detail: SEDetail | null) {
    const value = this.config.getValue(detail);
    const goal = this.config.getGoal(detail);
    console.log({ detail, value, goal });
    const currency = this.config.currency ?? "";

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
      `${currency}${value}/${goal}`,
      (char, dx) => {
        ctx.save();
        ctx.rotate(0.03 * Math.random() - 0.03),
        ctx.fillText(char, 0 + dx, Math.random() * 0.6),
        ctx.restore();
      },
      -2 * scale.scale
    );
  }
}
