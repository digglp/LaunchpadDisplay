import { HttpTime } from "./HttpTime";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WiFi = require("wifi").WiFi;
// const wifi = new WiFi();

export class Wifi {
  private wifi;

  constructor() {
    this.wifi = new WiFi();
    this.wifi.reset(() => {
      console.log("reset");
    });
  }

  public connect(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.wifi.connect((err: any) => {
      if (err) {
        return Promise.reject(err);
      } else {
        console.log("Connected to Wi-Fi - Getting");

        HttpTime.getNetworkTimeFromHttp().then((date: Date) => {
          console.log("got date", date);
        });

        return Promise.resolve();
      }
    });
  }

  public connect1() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.wifi.connect({ ssid: "diggs1", password: "Patchwork2-Unpiloted-Rescuer" }, (err: any) => {
      if (err) {
        console.error(err);
      } else {
        // add your code using Wi-fi connection
        console.log("Connected to Wi-Fi - Getting");
      }
    });
  }

  public scan() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.wifi.scan((err: any, networks: any) => {
      if (err) {
        console.error(err);
      } else {
        // add your code using Wi-fi connection
        console.log("Scanned networks", networks);
      }
    });
  }
}
