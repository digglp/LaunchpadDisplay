import http from "http";

export class HttpTime {
  public static async makeRequest(): Promise<string> {
    const options: http.RequestOptions = {
      host: "worldtimeapi.org/api/timezone/Europe/London",
      port: 80,
      path: "/",
      method: "GET",
    };

    return new Promise<string>((resolve, reject) => {
      const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          console.log("No more data in response.");
          resolve(data);
        });
      });

      req.on("error", (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e);
      });

      // Finish the request
      req.end();
    });
  }

  public static async getNetworkTimeFromHttp(): Promise<Date> {
    return new Promise<Date>((resolve, reject) => {
      const options = {
        host: "worldtimeapi.org/api/timezone/Europe/London",
        port: 80,
        path: "/",
        method: "GET",
      };
      try {
        console.log("requesting time from", options.host);
        const req = http.request(options, (res) => {
          if (res.statusCode !== 200) {
            console.log(`STATUS: ${res.statusCode}`);
            reject(new Error(`Unexpected status code: ${res.statusCode}`));
          } else {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.on("data", (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on("end", () => {
              console.log("No more data in response.");

              //return promise
              resolve(new Date());
            });
          }
        });

        req.on("error", (e) => {
          console.error(`problem with request: ${e.message}`);
          reject(e);
        });

        // Finish the request
        //req.end();
      } catch (e) {
        console.log("error", e);
        reject(e);
      }
    });
  }
}
