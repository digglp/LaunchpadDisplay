import fs from "fs";
import { Config } from "../domain/models/Config";
import { IConfiguration } from "./IConfiguration";

export class FileReaderConfiguration implements IConfiguration {
  private readonly _configPath: string;

  constructor(configPath: string) {
    this._configPath = configPath;
  }

  public read(): Config {
    const data = fs.readFileSync(this._configPath, "utf-8");
    const config: Config = JSON.parse(data);
    return config;
  }
}
