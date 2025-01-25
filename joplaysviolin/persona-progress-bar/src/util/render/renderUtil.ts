export const getScaleRatio = (
  canvas: HTMLCanvasElement,
  referenceHeight: number,
  referenceWidth: number
): {
    heightRatio: number,
    widthRatio: number,
    scale: number
} => {
    const heightRatio = canvas.height / referenceHeight;
    const widthRatio = canvas.width / referenceWidth;
    const scale = Math.min(heightRatio, widthRatio);
    
    return { heightRatio, widthRatio, scale };
};
