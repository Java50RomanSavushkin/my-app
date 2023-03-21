import React from "react";
import { CellType } from "../model/CellType";
type Props = {
    width: string;
    cell: CellType;
    clickFn: (id: number)=>void
}
export const Cell: React.FC<Props> = ({width, cell, clickFn}) => {
   return <div style={{width, height: width,
    backgroundColor: cell.cellColor, border: `solid 1px ${cell.borderColor}`}}
     onClick={() => clickFn(cell.id)}>
        {cell.cellContent}
   </div>
}