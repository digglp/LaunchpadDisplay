import { IGridController } from "./IGridController";
declare module "max7219";
import { MAX7219 } from "max7219";

export class Max7219 implements IGridController {
  getInfo(): string {
    throw new Error("Method not implemented.");
  }
  din = 16;
  clk = 18;
  cs = 17;
  max = new MAX7219(this.din, this.clk, this.cs);

  init(): void {
    this.max.setup();
  }
  write(data: Uint8Array): void {
    this.max.write(data);
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
}
