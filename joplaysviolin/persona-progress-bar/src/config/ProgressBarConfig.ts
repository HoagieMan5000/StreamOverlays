import { SEDetail } from "../streamelements/SEDetail";
import { Point2d } from "./Point2d";

export interface ProgressBarConfig {
  name: string;
  origin: Point2d;
  height: number;
  rotation: number;
  maxWidth: number;
  color: string;

  getValue: (detail: SEDetail | null) => number;
  getGoal: (detail: SEDetail | null) => number;
}
