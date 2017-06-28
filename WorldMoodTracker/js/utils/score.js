import {containsObject} from './index';

const positiveClasses = [
    "trust",
    "joy"
];

const negativeClasses = [
    "sadness",
    "disgust",
    "anger",
    "fear"
];

export function getScores(aggregations) {
    let score = {
        positive: 0,
        negative: 0
    };
    aggregations.forEach((i) => {
        let count = i.count;
        if (containsObject(i.class, positiveClasses)) {
            score.positive += count;
        } else if (containsObject(i.class, negativeClasses)) {
            score.negative += count;
        }
    });
    return score;
}
