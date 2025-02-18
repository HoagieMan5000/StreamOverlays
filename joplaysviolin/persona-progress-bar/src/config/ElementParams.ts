import { SEDetail } from "../streamelements/SEDetail";
import { ProgressBarConfig } from "./ProgressBarConfig";
import { ProgressCountConfig } from "./ProgressCountConfig";

export class ElementParams {
  public static readonly referenceCanvasWidth = 882;
  public static readonly referenceCanvasHeight = 882;

  public static readonly ColorSubs = "#8bffde";
  public static readonly ColorDonos = "#ec5edd";

  public static readonly ProgressBars: Record<string, ProgressBarConfig> = {
    subs: {
      name: "subs",
      origin: { x: 75, y: 705 },
      height: 38,
      rotation: -8.9,
      maxWidth: 609,
      color: ElementParams.ColorSubs,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.["subscriber-session"]?.count ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.session?.data?.["subscriber-goal"]?.amount ?? 0,
    },
    donos: {
      name: "donos",
      origin: { x: 217, y: 775 },
      height: 38,
      rotation: -12.89,
      maxWidth: 609,
      color: ElementParams.ColorDonos,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.["tip-session"]?.amount ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.session?.data?.["tip-goal"]?.amount ?? 0,
    },
  };

  public static readonly ProgressCounts: Record<string, ProgressCountConfig> = {
    subs: {
      origin: { x: 90, y: 675 },
      rotation: -8.9,
      font: "900 75px Franklin Gothic",
      color: ElementParams.ColorSubs,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.["subscriber-session"]?.count ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.session?.data?.["subscriber-goal"]?.amount ?? 0,
    },
    donos: {
      origin: { x: 410, y: 610 },
      rotation: -8.9,
      font: "900 75px Franklin Gothic",
      color: ElementParams.ColorDonos,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.["tip-session"]?.amount ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.session?.data?.["tip-goal"]?.amount ?? 0,
      currency: "$",
    },
  };
}
