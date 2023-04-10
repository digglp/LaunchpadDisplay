import { Config } from "../domain/models/Config";

export interface IConfiguration {
  read(): Config;
}
