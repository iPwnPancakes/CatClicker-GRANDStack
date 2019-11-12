import { getRandomArrayElement, getRandomNumberBetween } from "./Utils";

const HairTypes = ['SH', 'LH'];

export function getRandomCatFaceUrl() {
    const randomHairType = getRandomArrayElement(HairTypes);
    const imageNumber = getRandomNumberBetween(1, 10);
    const fileExtension = '.png';

    return `${ randomHairType }Cat${ imageNumber }LG${ fileExtension }`;
}

export function getAllCatFaceUrls() {
    return [
        'LHCat1LG.png',
        'LHCat2LG.png',
        'LHCat3LG.png',
        'LHCat4LG.png',
        'LHCat5LG.png',
        'LHCat6LG.png',
        'LHCat7LG.png',
        'LHCat8LG.png',
        'LHCat9LG.png',
        'LHCat10LG.png',
        'SHCat1LG.png',
        'SHCat2LG.png',
        'SHCat3LG.png',
        'SHCat4LG.png',
        'SHCat5LG.png',
        'SHCat6LG.png',
        'SHCat7LG.png',
        'SHCat8LG.png',
        'SHCat9LG.png',
        'SHCat10LG.png',
    ];
}