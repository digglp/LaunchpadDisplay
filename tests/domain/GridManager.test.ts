import { GridManager } from "../../src/domain-handlers/GridManager";
import { IGridController } from "../../src/infrastructure/IGridController";
import { Grid } from "../../src/domain/Grid";

describe("GridManager", () => {
  let mockGridController: IGridController;
  let gridManager: GridManager;

  const grid0 = {
    data: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  } as Grid;

  beforeEach(() => {
    mockGridController = {
      init: jest.fn(),
      write: jest.fn(),
      clear: jest.fn(),
    } as unknown as IGridController;

    gridManager = new GridManager(mockGridController);
  });

  describe("createMultiDimensionalArray", () => {
    it("should create a 8x8 multidimensional array of Uint8Array with all values initialized to 0", () => {
      const expectedArray: Uint8Array[][] = new Array(8).fill(null).map(() => new Array(8).fill(new Uint8Array([0])));
      expect(gridManager.getGridData()).toEqual(expectedArray);
    });
  });

  it("should set the top left quarter of the grid", () => {
    const gridManager = new GridManager(mockGridController);

    const grid = new Grid(grid0.data);

    gridManager.setTopLeftSection(grid);
    const gridData = gridManager.getGridData();

    expect(gridData[0][0]).toEqual(new Uint8Array([1]));
    expect(gridData[0][1]).toEqual(new Uint8Array([1]));
    expect(gridData[0][2]).toEqual(new Uint8Array([1]));
    expect(gridData[1][0]).toEqual(new Uint8Array([1]));
    expect(gridData[1][1]).toEqual(new Uint8Array([0]));
    expect(gridData[1][2]).toEqual(new Uint8Array([1]));
    expect(gridData[2][0]).toEqual(new Uint8Array([1]));
    expect(gridData[2][1]).toEqual(new Uint8Array([0]));
    expect(gridData[2][2]).toEqual(new Uint8Array([1]));
    expect(gridData[3][0]).toEqual(new Uint8Array([1]));
    expect(gridData[3][1]).toEqual(new Uint8Array([1]));
    expect(gridData[3][2]).toEqual(new Uint8Array([1]));
  });
  it("should set the top right quarter of the grid", () => {
    const gridManager = new GridManager(mockGridController);
    const grid = new Grid(grid0.data);

    gridManager.setTopRightSection(grid);
    const gridData = gridManager.getGridData();

    expect(gridData[0][5]).toEqual(new Uint8Array([1]));
    expect(gridData[0][6]).toEqual(new Uint8Array([1]));
    expect(gridData[0][7]).toEqual(new Uint8Array([1]));

    expect(gridData[1][5]).toEqual(new Uint8Array([1]));
    expect(gridData[1][6]).toEqual(new Uint8Array([0]));
    expect(gridData[1][7]).toEqual(new Uint8Array([1]));

    expect(gridData[2][5]).toEqual(new Uint8Array([1]));
    expect(gridData[2][6]).toEqual(new Uint8Array([0]));
    expect(gridData[2][7]).toEqual(new Uint8Array([1]));

    expect(gridData[3][5]).toEqual(new Uint8Array([1]));
    expect(gridData[3][6]).toEqual(new Uint8Array([1]));
    expect(gridData[3][7]).toEqual(new Uint8Array([1]));
  });

  it("should set the bottom left quarter of the grid", () => {
    const gridManager = new GridManager(mockGridController);
    const grid = new Grid(grid0.data);

    gridManager.setBottomLeftSection(grid);
    const gridData = gridManager.getGridData();

    expect(gridData[4][0]).toEqual(new Uint8Array([1]));
    expect(gridData[4][1]).toEqual(new Uint8Array([1]));
    expect(gridData[4][2]).toEqual(new Uint8Array([1]));

    expect(gridData[5][0]).toEqual(new Uint8Array([1]));
    expect(gridData[5][1]).toEqual(new Uint8Array([0]));
    expect(gridData[5][2]).toEqual(new Uint8Array([1]));

    expect(gridData[6][0]).toEqual(new Uint8Array([1]));
    expect(gridData[6][1]).toEqual(new Uint8Array([0]));
    expect(gridData[6][2]).toEqual(new Uint8Array([1]));

    expect(gridData[7][0]).toEqual(new Uint8Array([1]));
    expect(gridData[7][1]).toEqual(new Uint8Array([1]));
    expect(gridData[7][2]).toEqual(new Uint8Array([1]));
  });

  it("should set the bottom right quarter of the grid", () => {
    const gridManager = new GridManager(mockGridController);
    const grid = new Grid(grid0.data);

    gridManager.setBottomRightSection(grid);
    const gridData = gridManager.getGridData();

    expect(gridData[4][5]).toEqual(new Uint8Array([1]));
    expect(gridData[4][6]).toEqual(new Uint8Array([1]));
    expect(gridData[4][7]).toEqual(new Uint8Array([1]));

    expect(gridData[5][5]).toEqual(new Uint8Array([1]));
    expect(gridData[5][6]).toEqual(new Uint8Array([0]));
    expect(gridData[5][7]).toEqual(new Uint8Array([1]));

    expect(gridData[6][5]).toEqual(new Uint8Array([1]));
    expect(gridData[6][6]).toEqual(new Uint8Array([0]));
    expect(gridData[6][7]).toEqual(new Uint8Array([1]));

    expect(gridData[7][5]).toEqual(new Uint8Array([1]));
    expect(gridData[7][6]).toEqual(new Uint8Array([1]));
    expect(gridData[7][7]).toEqual(new Uint8Array([1]));
  });

  // it("should set the middle section of the grid", () => {
  //   const gridManager = new GridManager(mockGridController);
  //   const grid = new Grid(gridMiddleTest.data);

  //   gridManager.setMiddleSection(grid);

  //   expect(mockGridController.write).toHaveBeenCalledTimes(16);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 3, 1]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 4, 1]);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 19, 0]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 20, 0]);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 35, 0]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 36, 0]);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 51, 1]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 52, 1]);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 67, 1]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 68, 1]);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 83, 0]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 84, 0]);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 99, 0]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 100, 0]);

  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 115, 1]);
  //   expect(mockGridController.write).toHaveBeenCalledWith([144, 116, 1]);
  // });
});
