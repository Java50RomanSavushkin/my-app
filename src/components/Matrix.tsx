import { ReactNode } from "react"
import { Row } from "./Row"

type Props = {
    matrix: number[][]
}
export const Matrix: React.FC<Props> = ({matrix}) => {
    function getRows(): ReactNode {
        return matrix.map((row, index) => <Row row={row} key={index}></Row>)
    }
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        {getRows()}
    </div>
}