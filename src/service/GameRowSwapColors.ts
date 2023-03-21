import { CellType } from "../model/CellType";
import GameRowSimpleColors from "./GameRowSimpleColors";

export class GameRowSwapColors extends GameRowSimpleColors {
    private count: number = 0;
    private firstIndex: number = -1;
    constructor(nCells: number) {
        super(nCells);
    }
    isOver(): boolean {
        return this.count >= this.row.length / 2;
    }
    move(id: number): string | CellType[] {
        let res: string | CellType[] = "game is over";;
        if (!this.isOver()){
            if (this.firstIndex == -1) {
                this.firstIndex = id;
                res = this.row;
            } else {
                res = JSON.parse(JSON.stringify(this.row));
                const resAr = res as CellType[];
                const tmpColor = resAr[this.firstIndex].cellColor;
                resAr[this.firstIndex].cellColor = resAr[id].cellColor;
                resAr[id].cellColor = tmpColor;
                this.firstIndex = -1;
                this.row = resAr;
                this.count++;
            }
        }
        return res;
    }


}