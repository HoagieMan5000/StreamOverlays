export class AppConfig {
  public static readonly isDev = import.meta.env.MODE !== "production";
}
