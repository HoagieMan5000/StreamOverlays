import { SEDetail } from "../streamelements/SEDetail";
import { Point2d } from "./Point2d";

export interface ProgressCountConfig {
  origin: Point2d;
  rotation: number;
  font: string;
  color: string;
  showCents: (detail: SEDetail | null) => boolean;

  getValue: (detail: SEDetail | null) => number;
  getGoal: (detail: SEDetail | null) => number;
  currency?: string;
}
