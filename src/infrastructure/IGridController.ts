export interface IGridController {
  init(): void;
  write(data: Uint8Array): void;
  clear(): void;
  getInfo(): string;
}
