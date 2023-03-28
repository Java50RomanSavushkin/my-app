export function getRandomNumber(min: number, max: number): number {
    return min + Math.trunc(Math.random() * (max - min));
}

export function getRandomMatrix(rows: number, columns: number, minNumber: number,
    maxNumber: number): number[][] {
    function getRow(): number[] {
        return Array.from({ length: columns }, () => getRandomNumber(minNumber, maxNumber + 1))
    }
    const res: number[][] = Array.from({ length: rows }, () => getRow());
    return res;
}
