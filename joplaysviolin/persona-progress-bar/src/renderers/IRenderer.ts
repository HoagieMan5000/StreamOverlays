import { SEDetail } from "../streamelements/SEDetail";

export interface IRenderer {
    initialize(detail: SEDetail | null): Promise<void>;
    render(detail: SEDetail | null): void;
}