import { CellType } from "../model/CellType";

export default interface GameRow {
    getInitialRow(): Array<CellType>;
    move(id: number): Array<CellType> | string;
    isOver(): boolean;
}