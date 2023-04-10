import { NumberCharacterGrids } from "./../domain/gridData/NumberCharacterGrids";
import { LowercaseCharacterGrids } from "../domain/gridData/LowercaseCharacterGrids";
import { SpecialCharacterGrids } from "./../domain/gridData/SpecialCharacterGrids";
import { UppercaseCharacterGrids } from "../domain/gridData/UppercaseCharacterGrids";
import { Console } from "../application/console";
import { Grid } from "../domain/Grid";
import { GridSection } from "./GridManager";
import { TextManager } from "./TextManager";

export class ScrollingTextManager extends TextManager {
  scrollingInterval: NodeJS.Timeout | undefined;
  currentMessage: string;

  public scrollText(message: string, section: GridSection): void {
    this.currentMessage = message;
    const grid = this.mapMessageToGrid(this.currentMessage);
    this.setGridAtSection(grid, section);
    let i = 0;
    this.scrollingInterval = setInterval(() => {
      if (i < grid.data[0].length) {
        const shiftedGrid = this.shiftGrid(grid, i);
        this.setGridAtSection(shiftedGrid, section);
        i++;
      } else {
        i = 0;

        if (this.currentMessage !== message) {
          if (this.scrollingInterval) {
            clearInterval(this.scrollingInterval);
          }
          this.scrollText(this.currentMessage, section);
        }
      }
      Console.gridManager.commit();
    }, 200);
  }

  public updateText(message: string): void {
    this.currentMessage = message;
  }

  private shiftGrid(grid: Grid, shift: number): Grid {
    const shiftedGrid = grid.data.map((row) => {
      const shiftedRow = row.slice(shift).concat(row.slice(0, shift));
      return shiftedRow;
    });
    return { data: shiftedGrid };
  }

  private mapMessageToGrid(message: string): Grid {
    message += " ";
    const letterGrids = message.split("").map((letter) => {
      if (!isNaN(Number(letter)) && letter !== " ") {
        return NumberCharacterGrids.data[Number(letter)];
      } else {
        if (letter === ":") {
          return SpecialCharacterGrids.data.colon;
        } else if (letter === ".") {
          return SpecialCharacterGrids.data.dot;
        } else if (letter === " ") {
          return SpecialCharacterGrids.data.space;
        }
        if (letter === letter.toLowerCase()) {
          return LowercaseCharacterGrids.data[letter];
        }
        return UppercaseCharacterGrids.data[letter];
      }
    });
    const concatenated = letterGrids.reduce((accumulator, current) => {
      const rows = accumulator.data.map((row, index) => row.concat(current.data[index]));
      return { data: rows };
    });
    return concatenated;
  }
}
