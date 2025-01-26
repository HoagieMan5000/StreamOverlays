import anime from "animejs";
import { ElementParams } from "../config/ElementParams";
import { ProgressBarConfig } from "../config/ProgressBarConfig";
import { SEDetail } from "../streamelements/SEDetail";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";

interface RunningAnimation {
  value: number;
  target: number;
  anim?: anime.AnimeInstance;
}

export class ProgressBarRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: ProgressBarConfig;
  private previousValue: number = 0;
  private currAnim: RunningAnimation | null = null;

  constructor(canvas: HTMLCanvasElement, config: ProgressBarConfig) {
    this.canvas = canvas;
    this.config = config;   
  }

  public async initialize(detail: SEDetail | null): Promise<void> {}

  render(detail: SEDetail | null) {
    const value = this.config.getValue(detail);
    const goal = this.config.getGoal(detail);

    const targetPercent = goal > 0 ? value / goal : 0;
    console.log({ value, goal, targetPercent });
      // Animation not running
    if (!this.currAnim) {
      if (value === this.previousValue) {
        // No change in value, just render the bar
        this.renderBar(targetPercent);
        return;
      }

      //Value changed, create animation
      this.createAnimation(this.previousValue, targetPercent);
    } else {
      // There is an animation running
      if (value !== this.currAnim.target) {
        // Target changed, pause current animation and start a new one
        this.currAnim.anim?.pause();
        this.createAnimation(this.currAnim.value, targetPercent);       
      }
    }
  }

  renderBar(percentage: number) {
    const scale = getScaleRatio(
      this.canvas,
      ElementParams.referenceCanvasWidth,
      ElementParams.referenceCanvasHeight
    );
    const ctx = this.canvas.getContext("2d")!;

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
      0,
      config.maxWidth * donosProgressPercent * scale.widthRatio,
      38 * scale.heightRatio
    );
    ctx.restore();
  }

  createAnimation(startValue: number, targetPercent: number) {
    this.currAnim = {
      value: startValue,
      target: targetPercent,
    };
    const newAnim = anime({
      targets: this.currAnim,
      value: this.currAnim!.target,
      duration: 3000,
      easing: "easeOutCubic",
      update: () => {
        this.renderBar(this.currAnim!.value);
      },
      complete: () => {
        this.previousValue = this.currAnim!.target;
        this.currAnim = null;
      }
    });
    this.currAnim.anim = newAnim;
  }
}
