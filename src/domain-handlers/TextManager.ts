import { NumberCharacterGrids } from "./../domain/gridData/NumberCharacterGrids";
import { IconGrids } from "./../domain/gridData/IconGrids";
import { GridSection } from "./GridManager";

import { Console } from "../application/console";
import { Grid } from "../domain/Grid";

export enum ResponseIcon {
  EMPTY = "empty",
  WIFI_ERROR = "wifiError",
  WIFI_SUCCESS = "wifiSuccess",
}

export class TextManager {
  public SetNumberAtSection(number: number, section: GridSection): void {
    const grid = this.mapNumberToGrid(number);

    this.setGridAtSection(grid, section);
  }

  public SetResponseIconAtSection(responseIcon: ResponseIcon, section: GridSection): void {
    let grid: Grid;

    switch (responseIcon) {
      case ResponseIcon.WIFI_ERROR:
        grid = IconGrids.data.wifiErrorFull;
        break;
      case ResponseIcon.WIFI_SUCCESS:
        grid = IconGrids.data.wifiSuccessFull;
        break;
      default:
        grid = IconGrids.data.empty;
    }

    this.setGridAtSection(grid, section);
  }

  private mapNumberToGrid(number: number): Grid {
    const grid = NumberCharacterGrids.quarterSizeData[number];
    return grid;
  }

  public setGridAtSection(grid: Grid, section: GridSection): void {
    switch (section) {
      case GridSection.FULL_GRID:
        Console.gridManager.setFullGrid(grid);
        break;
      case GridSection.TOP_LEFT_SECTION:
        Console.gridManager.setTopLeftSection(grid);
        break;
      case GridSection.TOP_RIGHT_SECTION:
        Console.gridManager.setTopRightSection(grid);
        break;
      case GridSection.BOTTOM_LEFT_SECTION:
        Console.gridManager.setBottomLeftSection(grid);
        break;
      case GridSection.BOTTOM_RIGHT_SECTION:
        Console.gridManager.setBottomRightSection(grid);
        break;
      case GridSection.MIDDLE_SECTION:
        Console.gridManager.setMiddleSection(grid);
        break;
      case GridSection.TOP_GRID:
        Console.gridManager.setTopGrid(grid);
        break;
      case GridSection.BOTTOM_GRID:
        Console.gridManager.setBottomGrid(grid);
        break;
    }
  }
}
