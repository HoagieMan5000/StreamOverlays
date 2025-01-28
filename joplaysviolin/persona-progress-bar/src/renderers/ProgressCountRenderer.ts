import anime from "animejs";
import { ElementParams } from "../config/ElementParams";
import { ProgressBarConfig } from "../config/ProgressBarConfig";
import { SEDetail } from "../streamelements/SEDetail";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";
import { ProgressCountConfig } from "../config/ProgressCountConfig";
import { createTextWithSpacing } from "../util/canvas/canvasTextUtil";

const characterRotations = [0.001, -0.002, 0.003, 0.001, -0.002, 0.005, 0.0, 0.0025];
const getRotation = (i: number) => characterRotations[i % characterRotations.length];
const yOffsets = [0.0, 0.3, 0.2, 0.6, 0.5, 0.0, 0.1];
const getYOffset = (i: number) => yOffsets[i % yOffsets.length];

interface RunningAnimation {
  value: number;
  target: number;
  anim?: anime.AnimeInstance;
}

export class ProgressCountRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: ProgressCountConfig;
  private previousValue: number = 0;
  private currAnim: RunningAnimation | null = null;

  constructor(canvas: HTMLCanvasElement, config: ProgressCountConfig) {
    this.canvas = canvas;
    this.config = config;   
  }

  public async initialize(detail: SEDetail | null): Promise<void> {}

  render(detail: SEDetail | null) {
    if (!detail) {
      return;
    }

    const value = this.config.getValue(detail);
    //const goal = this.config.getGoal(detail);

    // Animation not running
    if (!this.currAnim) {
      if (value === this.previousValue) {
        // No change in value, just render the bar
        this.renderCount(value, detail);
        return;
      }

      //Value changed, create animation
      this.createAnimation(this.previousValue, value, detail);
    } else {
      // There is an animation running
      if (value !== this.currAnim.target) {
        // Target changed, pause current animation and start a new one
        this.currAnim.anim?.pause();
        this.createAnimation(this.currAnim.value, value, detail);       
      }
    }
  }

  renderCount(count: number, detail: SEDetail | null) {
    const value = count;
    const goal = this.config.getGoal(detail);
    console.log({ detail, value, goal });
    const currency = this.config.currency ?? "";

    const ctx = this.canvas.getContext("2d")!;
    const scale = getScaleRatio(
      this.canvas,
      ElementParams.referenceCanvasWidth,
      ElementParams.referenceCanvasHeight
    );

    ctx.save();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.translate(this.config.origin.x * scale.heightRatio, this.config.origin.y * scale.widthRatio);
    ctx.rotate(deg2rad(this.config.rotation));
    ctx.font = `900 ${75 * scale.scale}px Franklin Gothic`;
    ctx.fontKerning = "auto";
    ctx.fillStyle = this.config.color;
    const { width } = createTextWithSpacing(ctx,
      `${currency}${Math.floor(value)}/${goal}`,
      (char, dx, i) => {
        ctx.save();
        ctx.rotate(getRotation(i ?? 0)),
        ctx.fillText(char, 0 + dx, getYOffset(i ?? 0)),
        ctx.restore();
      },
      -2 * scale.scale
    );
    ctx.restore();
  }

  createAnimation(startValue: number, targetPercent: number, detail: SEDetail) {
    this.currAnim = {
      value: startValue,
      target: targetPercent,
    };

    const newAnim = anime({
      targets: this.currAnim,
      value: this.currAnim!.target,
      duration: 1000,
      easing: "easeOutCubic",
      update: () => {
        this.renderCount(this.currAnim!.value, detail);
      },
      complete: () => {
        this.previousValue = this.currAnim!.target;
        this.currAnim = null;
      }
    });
    this.currAnim.anim = newAnim;
  }
}
