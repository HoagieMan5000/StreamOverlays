import { ElementParams } from "../config/ElementParams";
import { SEDetail } from "../streamelements/SEDetail";
import { BackgroundImageRenderer } from "./BackgroundImageRenderer";
import { IRenderer } from "./IRenderer";
import { ProgressBarRenderer } from "./ProgressBarRenderer";
import { ProgressCountRenderer } from "./ProgressCountRenderer";

export class MainRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;

  private renderers: IRenderer[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderers.push(new BackgroundImageRenderer(this.canvas));
    this.renderers.push(new ProgressBarRenderer(this.canvas, ElementParams.ProgressBars.donos));
    this.renderers.push(new ProgressBarRenderer(this.canvas, ElementParams.ProgressBars.subs));
    this.renderers.push(new ProgressCountRenderer(this.canvas, ElementParams.ProgressCounts.donos));
    this.renderers.push(new ProgressCountRenderer(this.canvas, ElementParams.ProgressCounts.subs));
  }

  public async initialize(detail: SEDetail | null): Promise<void> {
    for (const renderer of this.renderers) {
      await renderer.initialize(detail);
    }
  }

  render(detail: SEDetail | null) {
    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const renderer of this.renderers) {
      ctx.save();
      renderer.render(detail);
      ctx.restore();
    }
  }
}
