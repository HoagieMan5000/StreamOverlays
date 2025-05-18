import { SEDetail } from "../streamelements/SEDetail";

const getFieldValue = (detail: SEDetail | null, field: string): number => detail?.fieldData?.[field];

export class ElementParams {
  public static readonly referenceCanvasWidth = 1000;
  public static readonly referenceCanvasHeight = 400;
}
