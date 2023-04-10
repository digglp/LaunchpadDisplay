import { IConfiguration } from "./IConfiguration";
import { IGridController } from "./IGridController";
import MidiStream from "midi-stream";
import midi from "midi";

export class LaunchpadMini implements IGridController {
  public static RED_COLOUR = 10;
  public static GREEN_COLOUR = 20;
  public static ORANGE_COLOUR = 30;
  public static YELLOW_COLOUR = 50;

  private _configuration: IConfiguration;

  constructor(configuration?: IConfiguration) {
    if (configuration) this._configuration = configuration;
  }
  getInfo(): string {
    const midiInput = new midi.input();
    const portCount = midiInput.getPortCount();
    const ports = [];
    for (let i = 0; i < portCount; i++) {
      ports.push(midiInput.getPortName(i));
    }
    return ports.join(", ");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stream: any;

  public init(): void {
    this.setMidiStream(this._configuration.read().midiName);
  }
  public write(data: Uint8Array): void {
    //convert to launchpadmini format
    this.writeToLaunchpad(data);
  }
  public clear(): void {
    throw new Error("Method not implemented.");
  }

  private setMidiStream(midiName: string): void {
    this.stream = MidiStream(midiName);
  }

  private writeToLaunchpad(data: Uint8Array): void {
    const binaryStringArray = this.uint8ArrayToBinaryString(data);

    //iterate over the array and write to the launchpad
    for (let rows = 0; rows < binaryStringArray.length; rows++) {
      const columns = binaryStringArray[rows].split("");
      for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        const launchpadIndex = this.mapToLaunchpad(rows, j);
        const launchpadData = [144, launchpadIndex, parseInt(column) * 50];
        this.stream.write(launchpadData);
      }
    }

    //console.log(binaryStringArray);
  }

  private mapToLaunchpad(row: number, col: number) {
    return row * 16 + col;
  }
  private uint8ArrayToBinaryString(uint8Array: Uint8Array): string[] {
    const stringArray = [];

    for (let i = 0; i < uint8Array.length; i++) {
      const byte = uint8Array[i];
      let byteString = byte.toString(2);
      while (byteString.length < 8) {
        byteString = "0" + byteString;
      }
      stringArray.push(byteString);
    }
    return stringArray;
  }
}
