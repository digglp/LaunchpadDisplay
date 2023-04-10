export interface Grid {
  data: number[][];
}
export class NumberGrids {
  public static gridEmpty = {
    data: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  } as Grid;
  public static gridSpace = {
    data: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  } as Grid;

  public static grid0 = {
    data: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  } as Grid;
  public static grid1 = {
    data: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
  } as Grid;
  public static grid2 = {
    data: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [1, 1, 1],
    ],
  } as Grid;
  public static grid3 = {
    data: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
  } as Grid;
  public static grid4 = {
    data: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
  } as Grid;
  public static grid5 = {
    data: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 1, 0],
      [1, 1, 1],
    ],
  } as Grid;
  public static grid6 = {
    data: [
      [0, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [1, 1, 1],
    ],
  } as Grid;
  public static grid7 = {
    data: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
  } as Grid;
  public static grid8 = {
    data: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 1, 1],
      [0, 1, 1],
    ],
  } as Grid;
  public static grid9 = {
    data: [
      [1, 1, 1],
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
  } as Grid;
}
