import { ElementParams } from "../config/ElementParams";
import { SEDetail } from "../streamelements/SEDetail";
import { IRenderer } from "./IRenderer";

export class BackgroundImageRenderer implements IRenderer {
    private canvas: HTMLCanvasElement;
    private image: HTMLImageElement | undefined;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }
    
    public async initialize(detail: SEDetail | null): Promise<void> {
        this.image = new Image();
        return new Promise<void>((resolve) => {
            this.image!.src = detail?.fieldData?.image ?? "";
            this.image!.onload = () => {
                resolve();
            }    
        });
    }
    
    render(detail: SEDetail | null, doneAnimating: () => void) {
        const ctx = this.canvas.getContext("2d")!;
        ctx.drawImage(this.image!, 0, 0, this.canvas.width, this.canvas.height);
        doneAnimating();
    }

    resize(): void {
        this.render(null, () => {});
    }
}