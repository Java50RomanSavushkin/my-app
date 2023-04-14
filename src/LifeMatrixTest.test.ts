import LifeMatrix from "./service/LifeMatrix";
const matrixHorizontal3: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
const matrixVertical3: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
];
const matrixSquare4: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
test("next for three lives in horizontal", () => {
    const lifeMatrix = new LifeMatrix(matrixHorizontal3);
    expect(lifeMatrix.nextStep()).toEqual(matrixVertical3);
});
test("next for three lives in vertical", () => {
    const lifeMatrix = new LifeMatrix(matrixVertical3);
    expect(lifeMatrix.nextStep()).toEqual(matrixHorizontal3);
});
test("next for four lives in square", () => {
    const lifeMatrix = new LifeMatrix(matrixSquare4);
    expect(lifeMatrix.nextStep()).toEqual(matrixSquare4);
});