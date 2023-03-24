import { getRandomMatrix } from "../util/random";

export default class LifeMatrix {
    constructor(private _numbers: number[][]){}
    get numbers() {
        return this._numbers;
    }
    nextStep(): number[][] {
        
        this._numbers = this._numbers.map((__, i) => this.getNewRow(i));
        return this._numbers;
    }
    getNewRow(i: number): number[] {
        return this._numbers[i].map((__, j) => this.getNewCell(i, j));
    }
    
    getNewCell(i: number, j: number): number {
        const matrixPart: number[][] = this.getMatrixPart(i, j);
        const sumCells = matrixPart.reduce((res, row) => res + 
        row.reduce((rSum, cell) => rSum + cell), 0);
        return this._numbers[i][j] ? isLiveFromLive(sumCells) : isLiveFromDead(sumCells);
    }
    getMatrixPart(i: number, j: number): number[][] {
        const sliceIndex1 = j == 0 ? j : j - 1;
        const sliceIndex2 = j == this._numbers[0].length - 1 ? j + 1 : j + 2;
        const savedNum = this._numbers[i][j];
        this._numbers[i][j] = 0;
        const res = [i - 1, i, i + 1].map(rowIndex => this._numbers[rowIndex] ? 
            this._numbers[rowIndex].slice(sliceIndex1, sliceIndex2) : [0]);
       this._numbers[i][j] = savedNum;
        return res;
    }
}
function isLiveFromLive(sumCells: number): number {
    return +(sumCells == 2 || sumCells == 3);
}
function isLiveFromDead(sumCells: number): number {
    return +(sumCells == 3);
}