export function sumArray(array: number[]): number {
    return array.reduce((res, cur) => res + cur);
}
export function minEvenNumber(array: number[]): number | undefined {
    let res: number | undefined;
    const evenNumbers: number[] = array.filter(n => n % 2 == 0)
    if (evenNumbers.length !== 0) {
        res = Math.min(...evenNumbers)
    }
    return res;
}
export function mapperNumbers(array: number[],
    mapperFn: (num: number) => number):
    number[] {
    return array.map(mapperFn);
}
export function sumMatrix(matrix: number[][]): number {
    return matrix.reduce((res, cur) => res + sumArray(cur), 0);
}