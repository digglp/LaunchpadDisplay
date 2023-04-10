import commandLineArgs from "command-line-args";

import { FileReaderConfiguration } from "./../infrastructure/FileReaderConfiguration";
import { LaunchpadMini } from "./../infrastructure/LaunchpadMini";
//import { ScrollingClock } from "./../domain/ScrollingClock";
//import { Max7219 } from "../infrastructure/Max7219";

import { GridManager, GridSection } from "../domain-handlers/GridManager";
//import { Clock } from "../domain/Clock";
import { ResponseIcon, TextManager } from "../domain-handlers/TextManager";
//import { ScrollingTextManager } from "../domain-handlers/ScrollingTextManager";
import { ScrollingClock } from "../domain/ScrollingClock";

const optionDefinitions = [
  { name: "config", alias: "c", type: String },
  { name: "help", alias: "h", type: Boolean },
  { name: "info", alias: "i", type: Boolean },
];

export class Console {
  public static gridManager: GridManager;

  public static async main(): Promise<void> {
    //const gridController = new Max7219();

    const options = commandLineArgs(optionDefinitions);

    const textManager = new TextManager();
    try {
      if (options.config) {
        console.log(`Using config file: ${options.config}`);
        const gridController = new LaunchpadMini(new FileReaderConfiguration(options.config));
        gridController.init();

        Console.gridManager = new GridManager(gridController);

        //textManager.SetResponseIconAtSection(ResponseIcon.WIFI_SUCCESS, GridSection.FULL_GRID);
        // textManager.SetMessageAtSection("ABC", GridSection.FULL_GRID);

        //  Console.gridManager.commit();

        // setTimeout(() => {
        //   const clock = new Clock();
        //   clock.start();
        // }, 3000);

        // const scrollingText = new ScrollingTextManager();
        // scrollingText.scrollText("AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz", GridSection.FULL_GRID);

        const scrollingClock = new ScrollingClock();
        scrollingClock.start();
      }
      if (options.info) {
        const gridController = new LaunchpadMini();
        console.log(gridController.getInfo());
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      textManager.SetResponseIconAtSection(ResponseIcon.WIFI_ERROR, GridSection.TOP_LEFT_SECTION);
    }
  }
}

Console.main();
