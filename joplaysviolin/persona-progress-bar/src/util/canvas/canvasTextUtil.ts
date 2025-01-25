export const createTextWithSpacing = (
  ctx: CanvasRenderingContext2D,
  text: string,
  createText: (char: string, dx: number) => void,
  spacingPx: number
): { width: number } => {
    let width = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        createText(char, width);
        const metrics = ctx.measureText(char);
        width += metrics.width + spacingPx;
    }

    return { width };
};
