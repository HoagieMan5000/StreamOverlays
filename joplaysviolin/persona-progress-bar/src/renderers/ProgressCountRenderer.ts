import anime from "animejs";
import { ElementParams } from "../config/ElementParams";
import { SEDetail } from "../streamelements/SEDetail";
import { getScaleRatio } from "../util/render/renderUtil";
import { deg2rad } from "../util/Util";
import { IRenderer } from "./IRenderer";
import { ProgressCountConfig } from "../config/ProgressCountConfig";
import { createTextWithSpacing } from "../util/canvas/canvasTextUtil";

const characterRotations = [
  0.001, -0.002, 0.003, 0.001, -0.002, 0.005, 0.0, 0.0025,
];
const getRotation = (i: number) =>
  characterRotations[i % characterRotations.length];
const yOffsets = [0.0, 0.3, 0.2, 0.6, 0.5, 0.0, 0.1];
const getYOffset = (i: number) => yOffsets[i % yOffsets.length];

interface State {
  value: number;
  goal: number;
  thicknessScale: number;
}

export class ProgressCountRenderer implements IRenderer {
  private canvas: HTMLCanvasElement;
  private config: ProgressCountConfig;
  private state: State = {
    value: 0,
    goal: 0,
    thicknessScale: 1.0,
  };

  constructor(canvas: HTMLCanvasElement, config: ProgressCountConfig) {
    this.canvas = canvas;
    this.config = config;
  }

  public async initialize(detail: SEDetail | null): Promise<void> {}

  render(detail: SEDetail | null, doneAnimating: () => void) {
    if (!detail) {
      doneAnimating();
      return;
    }

    const targetValue = this.config.getValue(detail);
    const goal = this.config.getGoal(detail);
    this.state.goal = goal;

    if (targetValue === this.state.value) {
      // No change in value, just render the count
      this.renderCount(targetValue, goal);
      doneAnimating();
      return;
    }

    //Value changed, create animation
    this.createAnimation(targetValue, goal, doneAnimating);
  }

  renderCount(count: number, goal: number) {
    const value = count;
    const currency = this.config.currency ?? "";

    const ctx = this.canvas.getContext("2d")!;
    const scale = getScaleRatio(
      this.canvas,
      ElementParams.referenceCanvasWidth,
      ElementParams.referenceCanvasHeight
    );

    ctx.save();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.translate(
      this.config.origin.x * scale.heightRatio,
      this.config.origin.y * scale.widthRatio
    );
    ctx.rotate(deg2rad(this.config.rotation));
    ctx.font = `600 ${65 * scale.scale}px Libre Franklin`;
    ctx.fontKerning = "auto";
    ctx.fillStyle = this.config.color;
    const { width } = createTextWithSpacing(
      ctx,
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

  createAnimation(targetValue: number, goal: number, onComplete: () => void) {
    const newAnim = anime({
      targets: this.state,
      keyframes: [
        { value: this.state.value, duration: 500 },
        { value: targetValue, duration: 1000 },
        { value: targetValue, duration: 500 },
      ],
      easing: "easeOutCubic",
      update: () => {
        this.renderCount(this.state.value, goal);
      },
      complete: () => {
        onComplete();
      },
    });
  }

  resize(): void {
    this.renderCount(this.state.value, this.state.goal);
  }
}
