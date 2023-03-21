import { CSSProperties } from 'react'
import lifeGameConfig from '../config/lifeGameConfig.json'
type Props = {
    row: number[]
}
export const Row: React.FC<Props> = ({row}) => {
    const {dimensions} = lifeGameConfig;
    function getSize() :number {
        return Math.min(window.innerWidth, window.innerHeight) / dimensions - 2 
    }
    function getStyle(cellValue: number): CSSProperties {
        const size = getSize();
        return {width: size, height: size,
             backgroundColor: cellValue ? "black":"white",
             border: "solid 1px gray"}
    }
    function getDivs() {
        return row.map((value, index) =>
         <div style={getStyle(value)} key={index}></div>)
    }
    
    return <div style = {{display: 'flex', flexDirection: 'row'}}>
        {getDivs()}
    </div>
}