import anime from "animejs";
import { ElementParams } from "../config/ElementParams";
import { ProgressBarConfig } from "../config/ProgressBarConfig";
import { SEDetail } from "../streamelements/SEDetail";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";

interface RunningAnimation {
  value: number;
  thicknessScale: number;
  target: number;
}

export class ProgressBarRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: ProgressBarConfig;
  private previousPercent: number = 0;
  private currAnim: RunningAnimation | null = null;

  constructor(canvas: HTMLCanvasElement, config: ProgressBarConfig) {
    this.canvas = canvas;
    this.config = config;   
  }

  public async initialize(detail: SEDetail | null): Promise<void> {}

  render(detail: SEDetail | null, doneAnimating: () => void) {
    const value = this.config.getValue(detail);
    const goal = this.config.getGoal(detail);

    const targetPercent = Math.min(goal > 0 ? value / goal : 0, 1.0);
    
    // Animation not running
    if (!this.currAnim) {
      const hasChanged = Math.abs(targetPercent - this.previousPercent) > 1e-6;
      if (!hasChanged) {
        // No change in value, just render the bar
        this.renderBar(targetPercent);
        doneAnimating();
        return;
      }

      //Value changed, create animation
      this.createAnimation(this.previousPercent, targetPercent, doneAnimating);
    } else {
      // NOTHING HERE, we are processing them one at a time
      console.error("NEW RENDER TRIGGERED BEFORE ANIMATION COMPLETION");
      return;
    }
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

  createAnimation(startValue: number, targetPercent: number, onComplete: () => void) {
    this.currAnim = {
      value: startValue,
      target: targetPercent,
      thicknessScale: this.currAnim?.thicknessScale ?? 1.0,
    };

    const newAnim = anime({
      targets: this.currAnim,
      value: this.currAnim!.target,
      keyframes: [
        { value: this.currAnim!.value, thicknessScale: this.currAnim.thicknessScale, duration: 0 },
        { thicknessScale: 1.5, duration: 500 },
        { value: this.currAnim!.target, thicknessScale: 1.5, duration: 1000 },
        { thicknessScale: 1.0, duration: 500 },
      ],
      easing: "easeOutCubic",
      update: () => {
        this.renderBar(this.currAnim!.value, this.currAnim!.thicknessScale);
      },
      complete: () => {
        this.previousPercent = this.currAnim!.target;
        this.currAnim = null;
        onComplete();
      }
    });
  }

  resize(): void {
    // TODO this is wrong
    this.renderBar(this.currAnim?.value ?? this.previousPercent);
  }
}
