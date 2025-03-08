import anime from "animejs";
import { ElementParams } from "../config/ElementParams";
import { ProgressBarConfig } from "../config/ProgressBarConfig";
import { SEDetail } from "../streamelements/SEDetail";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";

interface State {
  percentProgress: number;
  thicknessScale: number;
}

export class ProgressBarRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: ProgressBarConfig;
  private state: State = {
    percentProgress: 0.0,
    thicknessScale: 1.0,
  };

  constructor(canvas: HTMLCanvasElement, config: ProgressBarConfig) {
    this.canvas = canvas;
    this.config = config;
  }

  public async initialize(detail: SEDetail | null): Promise<void> {}

  render(detail: SEDetail | null, doneAnimating: () => void) {
    const targetValue = this.config.getValue(detail);
    const goal = this.config.getGoal(detail);

    const targetPercent = Math.min(goal > 0 ? targetValue / goal : 0, 1.0);

    // Animation not running
    const hasChanged =
      Math.abs(targetPercent - this.state.percentProgress) > 1e-6;
    if (!hasChanged) {
      // No change in value, just render the bar
      this.renderBar(this.state.percentProgress, this.state.thicknessScale);
      doneAnimating();
      return;
    }

    // Value changed, create animation
    this.createAnimation(targetPercent, doneAnimating);
  }

  renderBar(percentage: number, thicknessScale: number = 1.0) {
    const scale = getScaleRatio(
      this.canvas,
      ElementParams.referenceCanvasWidth,
      ElementParams.referenceCanvasHeight
    );

    const ctx = this.canvas.getContext("2d")!;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    const donosProgressPercent = percentage;
    const config = this.config;
    ctx.translate(
      config.origin.x * scale.widthRatio,
      config.origin.y * scale.heightRatio
    );
    ctx.rotate(deg2rad(config.rotation));
    ctx.fillStyle = config.color;
    ctx.fillRect(
      0,
      0 - 19 * scale.heightRatio * (thicknessScale - 1.0),
      config.maxWidth * donosProgressPercent * scale.widthRatio,
      38 * scale.heightRatio * thicknessScale
    );
    ctx.restore();
  }

  createAnimation(targetPercent: number, onComplete: () => void) {
    const newAnim = anime({
      targets: this.state,
      keyframes: [
        { percentProgress: this.state.percentProgress, thicknessScale: 1.5, duration: 500 },
        { percentProgress: targetPercent, duration: 1000 },
        { percentProgress: targetPercent, thicknessScale: 1.0, duration: 500 },
      ],
      easing: "easeOutCubic",
      update: () => {
        this.renderBar(this.state.percentProgress, this.state.thicknessScale);
      },
      complete: () => {
        onComplete();
      },
    });
  }

  resize(): void {
    this.renderBar(this.state.percentProgress, this.state.thicknessScale);
  }
}
