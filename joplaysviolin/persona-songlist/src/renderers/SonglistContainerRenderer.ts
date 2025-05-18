import { SEDetail } from "../streamelements/SEDetail";
import { IRenderer } from "./IRenderer";

export interface SonglistContainerRendererConfig {
    borderWidth: number;
};

export class SonglistContainerRenderer implements IRenderer {
    private canvas: HTMLCanvasElement;
    private config: SonglistContainerRendererConfig;

    constructor(canvas: HTMLCanvasElement, config: SonglistContainerRendererConfig) {
        this.canvas = canvas;
        this.config = config;
    }

    public async initialize(detail: SEDetail | null): Promise<void> {
        return new Promise<void>((resolve) => {
            resolve();
        });
    }
    
    render(detail: SEDetail | null, doneAnimating: () => void) {
        this.renderBorder();
        this.renderBackground();  
    }

    renderBackground() {
        const ctx = this.canvas.getContext("2d")!;
        ctx.fillStyle = "black";
        ctx.fillRect(
            this.config.borderWidth,
            this.config.borderWidth,
            this.getContainerDimensions().width - this.config.borderWidth,
            this.getContainerDimensions().height - this.config.borderWidth
        );
    }

    renderBorder() {
        const ctx = this.canvas.getContext("2d")!;
        ctx.fillStyle = "white";
        ctx.fillRect(
            this.config.borderWidth,
            this.config.borderWidth,
            this.getContainerDimensions().width,
            this.getContainerDimensions().height
        );
    }

    getContainerDimensions() {
        return {
            width: this.canvas.width,
            height: this.canvas.height / 2,
        };
    }

    resize(): void {
        this.render(null, () => {});
    }
}