import LifeMatrix from '../src/service/LifeMatrix'

test("getNewCell should return 0 for a dead cell with less than 3 live neighbors", () => {
    const lifeMatrix = new LifeMatrix([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]);
    expect(lifeMatrix.getNewCell(1, 1)).toBe(0);
});

test("getNewCell should return 1 for a dead cell with exactly 3 live neighbors", () => {
    const lifeMatrix = new LifeMatrix([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]);
    expect(lifeMatrix.getNewCell(1, 0)).toBe(1);
});

test("getNewCell should return 0 for a live cell with less than 2 live neighbors", () => {
    const lifeMatrix = new LifeMatrix([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ]);
    expect(lifeMatrix.getNewCell(1, 1)).toBe(0);
});

test("getNewCell should return 1 for a live cell with 2 or 3 live neighbors", () => {
    const lifeMatrix = new LifeMatrix([
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]);
    expect(lifeMatrix.getNewCell(1, 1)).toBe(1);
});

test("getNewCell should return 0 for a live cell with more than 3 live neighbors", () => {
    const lifeMatrix = new LifeMatrix([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]);
    expect(lifeMatrix.getNewCell(1, 1)).toBe(0);
});
