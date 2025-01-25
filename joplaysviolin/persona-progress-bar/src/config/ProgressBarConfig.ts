import { Point2d } from "./Point2d";

export interface ProgressBarConfig {
  origin: Point2d;
  height: number;
  rotation: number;
  maxWidth: number;
  color: string;
}
