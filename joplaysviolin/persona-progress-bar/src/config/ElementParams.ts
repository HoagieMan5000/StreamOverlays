import { SEDetail } from "../streamelements/SEDetail";
import { ProgressBarConfig } from "./ProgressBarConfig";
import { ProgressCountConfig } from "./ProgressCountConfig";

const dataSourceDropdownTypes = [
  "session",
  "day",
  "week",
  "month",
];

const getFieldValue = (detail: SEDetail | null, field: string): number => detail?.fieldData?.[field];

export class ElementParams {
  public static readonly referenceCanvasWidth = 882;
  public static readonly referenceCanvasHeight = 882;

  public static readonly defaultBackgroundImageSrc = "https://hoagieman5000.github.io/StreamOverlays/public/joplaysviolin/persona-joverlay-v1-final.png";

  public static readonly ColorSubs = "#8bffde";
  public static readonly ColorDonos = "#ec5edd";

  private static subAmountField = (detail: SEDetail | null) => `subscriber-${getFieldValue(detail, "sub-progress-type") ?? "goal"}`
  private static tipAmountField = (detail: SEDetail | null) => `tip-${getFieldValue(detail, "tip-progress-type") ?? "goal"}`;

  public static readonly ProgressBars: Record<string, ProgressBarConfig> = {
    subs: {
      name: "subs",
      origin: { x: 75, y: 705 },
      height: 38,
      rotation: -8.9,
      maxWidth: 609,
      color: ElementParams.ColorSubs,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.[this.subAmountField(detail)]?.count ?? detail?.session?.data?.[this.subAmountField(detail)]?.amount ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.fieldData?.subGoal ?? 0,
    },
    donos: {
      name: "donos",
      origin: { x: 217, y: 775 },
      height: 38,
      rotation: -12.89,
      maxWidth: 609,
      color: ElementParams.ColorDonos,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.[this.tipAmountField(detail)]?.amount ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.fieldData?.tipGoal ?? 0,
    },
  };

  public static readonly ProgressCounts: Record<string, ProgressCountConfig> = {
    subs: {
      origin: { x: 90, y: 675 },
      rotation: -8.9,
      font: "600 75px Libre Franklin",
      color: ElementParams.ColorSubs,
      showCents: (detail: SEDetail | null) => false,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.[this.subAmountField(detail)]?.count ?? detail?.session?.data?.[this.subAmountField(detail)]?.amount ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.fieldData?.subGoal ?? 0,
    },
    donos: {
      origin: { x: 410, y: 610 },
      rotation: -8.9,
      font: "600 75px Libre Franklin",
      color: ElementParams.ColorDonos,
      showCents: (detail: SEDetail | null) => !!detail?.fieldData?.showCents,
      getValue: (detail: SEDetail | null) => detail?.session?.data?.[this.tipAmountField(detail)]?.amount ?? 0,
      getGoal: (detail: SEDetail | null) => detail?.fieldData?.tipGoal ?? 0,
      currency: "$",
    },
  };
}
