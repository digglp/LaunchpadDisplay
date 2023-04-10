// eslint-disable-next-line @typescript-eslint/no-var-requires
//const rtc = require("rtc");
import { GridSection } from "../domain-handlers/GridManager";
import { ScrollingTextManager } from "./../domain-handlers/ScrollingTextManager";
export class ScrollingClock {
  private scrollingTextManager: ScrollingTextManager;

  constructor() {
    this.scrollingTextManager = new ScrollingTextManager();

    //todo: need to get time from time server
    // rtc.setTime(1680900191000);
  }

  public start() {
    // setInterval(async () => {
    this.setTimeOnGrid();
    // }, 60000);
  }

  private setTimeOnGrid() {
    // const now = new Date(rtc.getTime());
    this.scrollingTextManager.scrollText(this.getTimeText(), GridSection.FULL_GRID);
    setInterval(async () => {
      this.scrollingTextManager.updateText(this.getTimeText());
    }, 60000);
  }

  private getTimeText(): string {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const time = hours + ":" + minutes + " ";

    return time;
  }
}
