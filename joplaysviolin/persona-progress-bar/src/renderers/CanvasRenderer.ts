import { SEDetail } from "../streamelements/SEDetail";
import { IRenderer } from "./IRenderer";

export class CanvasRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;

  private renderers: IRenderer[] = [];

  constructor(canvas: HTMLCanvasElement, renderers: IRenderer[] = []) {
    this.canvas = canvas;
    this.renderers = renderers;
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
