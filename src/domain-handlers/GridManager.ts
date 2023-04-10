import { Grid } from "../domain/Grid";
import { IGridController } from "../infrastructure/IGridController";

export enum GridSection {
  TOP_LEFT_SECTION = 0,
  TOP_RIGHT_SECTION = 1,
  BOTTOM_LEFT_SECTION = 2,
  BOTTOM_RIGHT_SECTION = 3,
  MIDDLE_SECTION = 4,
  FULL_GRID = 5,
  TOP_GRID = 6,
  BOTTOM_GRID = 7,
}
export class GridManager {
  gridController: IGridController;

  public static MIDDLE_SECTION = 4;

  //create a multidimensional array of Uint8Array and initialise it to 0
  private gridData: Uint8Array[][] = [];

  //private gridData: Uint8Array[][] = _.range(8).map(() => new Array(8).map(().> 0));

  constructor(gridController: IGridController) {
    this.gridController = gridController;

    this.createMultiDimensionalArray(8, 8);
  }

  private createMultiDimensionalArray(rows: number, columns: number) {
    // iterate over the rows
    for (let i = 0; i < rows; i++) {
      // create an empty array to store the columns
      const columnArr: Uint8Array[] = [];
      // iterate over the columns
      for (let j = 0; j < columns; j++) {
        // create a new Uint8Array of length 1 and initialize it to 0
        const uint8Arr = new Uint8Array(1);
        columnArr.push(uint8Arr);
      }
      // push the column array to the row array
      this.gridData.push(columnArr);
    }
  }

  public getGridData(): Uint8Array[][] {
    return this.gridData;
  }

  public setFullGrid(grid: Grid) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        this.setCell(row, col, grid.data[row][col]);
      }
    }
  }

  public setTopLeftSection(grid: Grid) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        this.setCell(row, col, grid.data[row][col]);
      }
    }
  }
  public setTopRightSection(grid: Grid) {
    for (let row = 0; row < 4; row++) {
      for (let col = 5; col < 8; col++) {
        this.setCell(row, col, grid.data[row][col - 5]);
      }
    }
  }
  public setBottomLeftSection(grid: Grid) {
    for (let row = 4; row < 8; row++) {
      for (let col = 0; col < 3; col++) {
        this.setCell(row, col, grid.data[row - 4][col]);
      }
    }
  }

  public setBottomRightSection(grid: Grid) {
    for (let row = 4; row < 8; row++) {
      for (let col = 5; col < 8; col++) {
        this.setCell(row, col, grid.data[row - 4][col - 5]);
      }
    }
  }

  public setMiddleSection(grid: Grid) {
    for (let row = 0; row < 8; row++) {
      for (let col = 3; col < 5; col++) {
        this.setCell(row, col, grid.data[row][col - 3]);
      }
    }
  }

  public setTopGrid(grid: Grid) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        this.setCell(row, col, grid.data[row][col]);
      }
    }
  }

  public setBottomGrid(grid: Grid) {
    for (let row = 4; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        this.setCell(row, col, grid.data[row - 4][col]);
      }
    }
  }

  public setCell(row: number, col: number, isSet: number) {
    this.gridData[row][col] = new Uint8Array([isSet]);
  }

  public commit() {
    this.gridController.write(this.createUint8Array(this.gridData));
  }

  public commitAnimate() {
    this.gridController.write(this.createUint8Array(this.gridData));
  }

  // const heart = new Uint8Array([
  //   0b00000000, 0b01100110, 0b11111111, 0b11111111, 0b01111110, 0b00111100, 0b00011000, 0b00000000,
  // ]);
  // console.log(data);
  private createUint8Array(arr: Uint8Array[][]): Uint8Array {
    const binaryString = this.arrayToBinaryString(arr);
    return this.binaryStringToUint8Array(binaryString);
  }

  arrayToBinaryString(arr: Uint8Array[][]): string {
    let binaryString = "";
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i < arr.length && j < arr[i].length) {
          binaryString += arr[i][j][0];
        } else {
          binaryString += "0";
        }
      }
    }
    return binaryString;
  }

  binaryStringToUint8Array(binaryString: string): Uint8Array {
    const intArray: number[] = [];
    let i = 0;
    while (i < binaryString.length) {
      let byteString = "";
      for (let j = 0; j < 8; j++) {
        if (i < binaryString.length) {
          byteString += binaryString[i];
          i++;
        } else {
          byteString += "0";
        }
      }
      const byte = parseInt(byteString, 2);
      intArray.push(byte);
    }
    return new Uint8Array(intArray);
  }
}
