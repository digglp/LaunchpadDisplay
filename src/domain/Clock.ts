import { Console } from "./../application/console";

import { GridSection } from "../domain-handlers/GridManager";

import { TextManager } from "../domain-handlers/TextManager";
import { TickAnimation } from "../domain-handlers/TickAnimation";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rtc = require("rtc");

export class Clock {
  private textManager: TextManager;
  private tickAnimation: TickAnimation;

  private oldHours: number[];
  private oldMinutes: number[];

  constructor() {
    this.textManager = new TextManager();
    this.tickAnimation = new TickAnimation();
    //todo: need to get time from time server
    // rtc.setTime(1680298574000);
    const now = rtc.getTime();
    console.log(now);
  }

  public start() {
    setInterval(async () => {
      const now = new Date(rtc.getTime());

      const hours = this.getDigits(now.getHours().toString().padStart(2, "0"));
      const minutes = this.getDigits(now.getMinutes().toString().padStart(2, "0"));

      this.setHoursOnGrid(hours);
      this.setMinutesOnGrid(minutes);
      this.tickAnimation.animateTick();

      Console.gridManager.commit();
    }, 1000);
  }

  private getDigits(strNumber: string): number[] {
    return [parseInt(strNumber[0]), parseInt(strNumber[1])];
  }

  private setHoursOnGrid(hours: number[]) {
    if (this.oldHours === undefined) this.oldHours = new Array<number>(2);

    if (this.oldHours[0] !== hours[0] || this.oldHours[1] !== hours[1]) {
      this.oldHours = hours;

      this.textManager.SetNumberAtSection(hours[0], GridSection.TOP_LEFT_SECTION);
      this.textManager.SetNumberAtSection(hours[1], GridSection.TOP_RIGHT_SECTION);
    }
  }

  private setMinutesOnGrid(minutes: number[]) {
    if (this.oldMinutes === undefined) this.oldMinutes = new Array<number>(2);

    if (this.oldMinutes[0] !== minutes[0] || this.oldMinutes[1] !== minutes[1]) {
      this.oldMinutes = minutes;

      this.textManager.SetNumberAtSection(minutes[0], GridSection.BOTTOM_LEFT_SECTION);
      this.textManager.SetNumberAtSection(minutes[1], GridSection.BOTTOM_RIGHT_SECTION);
    }
  }
}
