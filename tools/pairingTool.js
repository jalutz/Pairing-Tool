const _ = require('lodash');

const PAIR_NAMES = ["JLIN", "JM", "MT", "SC", "RS", "GV", "RV", "BD", "GB", "JL", "BH", "IV"];

const NUM_PAIRS = 6;

var iterations = 1;

let pairsForWeek = [
        [
            ['BD', 'MT'],       // Installation
            ['RV', 'SC'],       // Installation
            ['BH', 'GV'],       // Selenium
            ['IV', 'RS'],       // Installation
            ['JLIN', 'JM'],     // Installation
            ['GB', 'JL']        // Installation
        ],
        [
            ['JLIN', 'MT'],     // Installation
            ['JL', 'SC'],       // Installation
            ['BD', 'GB'],       // Installation
            ['BH', 'RV'],       // Selenium
            ['GV', 'RS'],       // USAWD
            ['IV', 'JM'],       // Pixil Issues, Installation
        ],
        [
            ['BH', 'MT'],       // Selenium
            ['BD', 'RS'],       // USAWD
            ['GV', 'JM'],       // Installation
            ['GB', 'JLIN'],     // Installation
            ['IV', 'SC'],       // Installation
            ['JL', 'RV']        // Installation
        ]
    ]
;
//let pairs = fetch("pairs.txt");
//console.log(pairs.split(";"));R
//let pairNames = PAIRS.slice(0, 1);R

function switchPairs(pairs, pairMatch = false, newPairs = []) {

    iterations++;

    if (iterations >= 4000) {
        console.log("iterations: ", iterations);
        console.log("4000 iterations reached. Likely no pairs left! Ending program.");
        return;
    }

    if (pairMatch === false && newPairs.length > 0) {
        return newPairs;
    }

    let f = PAIR_NAMES.reduce(function (a, b) {
        return a.concat(b);
    }, []);


    newPairs = [];

    for (let i = 0; i < NUM_PAIRS; i++) {
        let newPair = getNewPair(pairs, f);

        let sortedPair = _.sortBy(newPair, (o) => {
            return o
        });

        newPairs.push(sortedPair)
    }

    pairMatch = checkPairs(newPairs, pairsForWeek);

    if (pairMatch == true) {
        return switchPairs(pairs, pairMatch, newPairs)
    } else {
        return newPairs
    }
}

function checkPairs(newPairs, oldPairsList) {
    let pairMatch = false;
    _.forEach(oldPairsList, (pArr) => {

        newPairs.forEach(pair => { //for each pair in the newly created pair list
            if (pairMatch == true) {
                return pairMatch;
            }

            pArr.forEach(oldPair => { //and each pair in the old pair list
                if (pairMatch == true) {
                    return true;
                }

                pairMatch = (oldPair[0] == pair[0] && oldPair[1] == pair[1]) ||
                    (oldPair[0] == pair[1] && oldPair[1] == pair[0]);

                if (pairMatch == true) {

                }
            })
        })
    });

    return pairMatch
}

function getNewPair(pairs, f) {
    let ran1 = f[getRandomInt(0, f.length - 1)];

    f.splice(f.indexOf(ran1), 1);

    let ran2 = f.length == 1 ? f[0] : f[getRandomInt(0, f.length - 1)];

    f.splice(f.indexOf(ran2), 1);

    let newPair = [ran1, ran2];

    return newPair;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("-------");
console.log("STARTING PAIRING");
console.log("");

let newPairs = switchPairs(pairsForWeek);

console.log("final new pairs: ");

newPairs.forEach(pair => {
    console.log("['" + pair[0] + "','" + pair[1] + "'], ")
});

console.log("");
console.log("FINISHED PAIRING");
console.log("-------");
