import { IRenderer } from "./IRenderer";

export class BackgroundImageRenderer implements IRenderer {
    private canvas: HTMLCanvasElement;
    private image: HTMLImageElement | undefined;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public async initialize(widgetData: any): Promise<void> {
        this.image = new Image();
        return new Promise<void>((resolve) => {
            this.image!.src = widgetData?.image ?? "/persona-joverlay-v1-final.png";
            this.image!.onload = () => {
                resolve();
            }    
        });
    }
    
    render() {
        const ctx = this.canvas.getContext("2d")!;
        ctx.drawImage(this.image!, 0, 0, this.canvas.width, this.canvas.height);
    }
}