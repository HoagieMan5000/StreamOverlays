import { ElementParams } from "../config/ElementParams";
import { ProgressBarConfig } from "../config/ProgressBarConfig";
import { SEDetail } from "../streamelements/SEDetail";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";

export class ProgressBarRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: ProgressBarConfig;

  constructor(canvas: HTMLCanvasElement, config: ProgressBarConfig) {
    this.canvas = canvas;
    this.config = config;
  }

  public async initialize(detail: SEDetail | null): Promise<void> {}

  render(detail: SEDetail | null) {
    const value = this.config.getValue(detail);
    const goal = this.config.getGoal(detail);

    const scale = getScaleRatio(
      this.canvas,
      ElementParams.referenceCanvasWidth,
      ElementParams.referenceCanvasHeight
    );
    console.log({ scale });
    const ctx = this.canvas.getContext("2d")!;

    const donosProgressPercent = goal > 0 ? value / goal : 0;
    const config = this.config;
    ctx.translate(
      config.origin.x * scale.widthRatio,
      config.origin.y * scale.heightRatio
    );
    ctx.rotate(deg2rad(config.rotation));
    ctx.fillStyle = config.color;
    ctx.fillRect(
      0,
      0,
      config.maxWidth * donosProgressPercent * scale.widthRatio,
      38 * scale.heightRatio
    );
  }
}
