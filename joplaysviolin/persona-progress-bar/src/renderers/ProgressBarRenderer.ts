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
  anim?: anime.AnimeInstance;
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

  render(detail: SEDetail | null) {
    const value = this.config.getValue(detail);
    const goal = this.config.getGoal(detail);

    const targetPercent = Math.min(goal > 0 ? value / goal : 0, 1.0);
      // Animation not running
    if (!this.currAnim) {
      if (Math.abs(targetPercent - this.previousPercent) < 1e-6) {
        // No change in value, just render the bar
        this.renderBar(targetPercent);
        return;
      }

      //Value changed, create animation
      this.createAnimation(this.previousPercent, targetPercent);
    } else {
      // There is an animation running
      if (value !== this.currAnim.target) {
        // Target changed, pause current animation and start a new one
        this.currAnim.anim?.pause();
        this.createAnimation(this.currAnim.value, targetPercent);       
      }
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

  createAnimation(startValue: number, targetPercent: number) {
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
        { value: this.currAnim!.value, thicknessScale: 1.5, duration: 500 },
        { value: this.currAnim!.target, thicknessScale: 1.5, duration: 1000 },
        { value: this.currAnim!.target, thicknessScale: 1.0, duration: 500 },
      ],
      //duration: 1000,
      easing: "easeOutCubic",
      update: () => {
        this.renderBar(this.currAnim!.value, this.currAnim!.thicknessScale);
      },
      complete: () => {
        this.previousPercent = this.currAnim!.target;
        this.currAnim = null;
      }
    });
    this.currAnim.anim = newAnim;
  }
}
