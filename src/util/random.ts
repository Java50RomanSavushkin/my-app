export function getRandomNumber(min: number, max: number): number {
    return min + Math.trunc(Math.random() * (max - min));
}
export function getRandomElement(array: any[]): any {
    return array[getRandomNumber(0, array.length)];
}