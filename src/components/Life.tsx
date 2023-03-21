import { useEffect, useRef, useState } from "react"
import LifeMatrix from "../service/lifeMatrix"
import { getRandomMatrix } from "../util/random"
import { Matrix } from "./Matrix"
import { dimensions, tickInterval } from '../config/lifeGameConfig.json'

export const Life: React.FC = () => {
    const [numbers, setNumbers] = useState<number[][]>([])
    const lifeMatrix = useRef<LifeMatrix>();
    function tick() {
        if (lifeMatrix.current == null) {
            lifeMatrix.current = new LifeMatrix(getRandomMatrix(dimensions,
                dimensions, 0, 1))
        }
        setNumbers(lifeMatrix.current.nextStep())
    }
    useEffect(() => {
        const interval = setInterval(tick, tickInterval);
        return () => clearInterval(interval);
    }, [tickInterval, dimensions])
    return <div>
        <Matrix matrix={numbers} />
    </div>
}