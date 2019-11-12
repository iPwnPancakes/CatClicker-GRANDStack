export function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}