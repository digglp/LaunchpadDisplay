import { Console } from "../application/console";
import { Grid } from "../domain/Grid";

export class TickAnimation {
  private currentTick = 0;

  public animateTick() {
    const grid = this.mapNumberToGrid(this.currentTick);

    Console.gridManager.setMiddleSection(grid);
    this.currentTick++;
    if (this.currentTick > 7) {
      this.currentTick = 0;
    }
  }

  private mapNumberToGrid(number: number): Grid {
    const grid = this.tickGrids[number];
    return grid;
  }

  tickGrids: { [key: number]: Grid } = {
    0: {
      data: [
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
    1: {
      data: [
        [0, 0],
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
    2: {
      data: [
        [0, 0],
        [0, 0],
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
    3: {
      data: [
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
    4: {
      data: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 1],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    },
    5: {
      data: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 1],
        [0, 0],
        [0, 0],
      ],
    },
    6: {
      data: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 1],
        [0, 0],
      ],
    },
    7: {
      data: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [1, 1],
      ],
    },
  };
}
