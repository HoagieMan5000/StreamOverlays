export interface IRenderer {
    initialize(widgetData: any): Promise<void>;
    render(): void;
}