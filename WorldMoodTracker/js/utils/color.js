import {getScores} from './score';
import {countryCodeConverter} from './index';

export function getColor(score) {
    let p, n, maxP, maxN;
    maxP = p = score.positive;
    maxN = n = score.negative;
    if (score.maxPositive) {
        maxP = score.maxPositive;
    }
    if (score.maxNegative) {
        maxN = score.maxNegative;
    }
    let fraction = getFraction(p, n, maxP, maxN);
    let color = {
        positive: {
            red: 255,
            green: 251,
            blue: 32
        },
        negative: {
            red: 208,
            green: 32,
            blue: 16
        }
    };
    return rgbToHex(getColorForFraction(fraction, color));
}

export function getColorsForCountries(json) {
    let dataMaping = {};
    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            if (key === 'GLOBAL') {
                continue;
            }
            let score = getScores(json[key]);
            let color = getColor(score);
            key = countryCodeConverter(key);
            dataMaping[key] = {
                fillColor: color,
                positiveScore: score.positive,
                negativeScore: score.negative
            };
        }
    }
    return dataMaping;
}

function getFraction(p, n, pMax, nMax) {
    return alpha(p - n, pMax, nMax) / 2 + 0.5;
}

function alpha(diff, p, n) {
    if (diff >= 0) {
        return diff / p;
    }
    return diff / n;
}

function getColorForFraction(fraction, color) {
    return {
        red: Math.floor(color.negative.red + fraction * (color.positive.red - color.negative.red)),
        green: Math.floor(color.negative.green + fraction * (color.positive.green - color.negative.green)),
        blue: Math.floor(color.negative.blue + fraction * (color.positive.blue - color.negative.blue))
    }
}

export function rgbToHex(color) {
    return '#' + ("0" + color.red.toString(16)).slice(-2)
        + ("0" + color.green.toString(16)).slice(-2)
        + ("0" + color.blue.toString(16)).slice(-2);
}
