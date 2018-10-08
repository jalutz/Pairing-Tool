const moment = require("moment");

const _ = require('lodash');

// const PAIR_NAMES = ["JLIN", "JM", "MT", "SC", "RS", "RV", "GV", "TR", "JL", "IV", "WA", ""];

// Pod 1
// const PAIR_NAMES = ["SC", "JM", "IV", "RS", "TR", "JLIN"];

// Pod 2
// const PAIR_NAMES = ["MT", "RV", "JL", "WA", "GV", ""];


const NUM_PAIRS = 3;

const NUM_DAYS = 4;

var iterations = 1;

let pairsForWeek = [];

function switchPairs(pairs, pairMatch = false, newPairs = []) {

    iterations++;

    if (iterations >= 8000) {
        console.log("iterations: ", iterations);
        console.log("7000 iterations reached. Likely no pairs left! Ending program.");
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

    if (pairMatch === true) {
        return switchPairs(pairs, pairMatch, newPairs)
    } else {
        return newPairs
    }
}

function checkPairs(newPairs, oldPairsList) {
    let pairMatch = false;
    _.forEach(oldPairsList, (pArr) => {

        newPairs.forEach(pair => { //for each pair in the newly created pair list
            if (pairMatch === true) {
                return pairMatch;
            }

            pArr.forEach(oldPair => { //and each pair in the old pair list
                if (pairMatch === true) {
                    return true;
                }

                pairMatch = (oldPair[0] === pair[0] && oldPair[1] === pair[1]) ||
                    (oldPair[0] === pair[1] && oldPair[1] === pair[0]);

                if (pairMatch === true) {

                }
            })
        })
    });

    return pairMatch
}

function getNewPair(pairs, f) {
    let ran1 = f[getRandomInt(0, f.length - 1)];

    f.splice(f.indexOf(ran1), 1);

    let ran2 = f.length === 1 ? f[0] : f[getRandomInt(0, f.length - 1)];

    f.splice(f.indexOf(ran2), 1);

    let newPair = [ran1, ran2];

    return newPair;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function format(pairs) {
    return pairs.map(pair => {
        return [pair[0], pair[1]];
    });
}

function getPairs() {
    for (let i = 0; i <= NUM_DAYS; i++) {
        pairsForWeek.push(format(switchPairs(pairsForWeek)));
    }

    return pairsForWeek;
}

console.log("-------");
console.log("STARTING PAIRING");
console.log("");

getPairs();

let pairsList = "";
let date = moment();

pairsForWeek.forEach(pairList => {
    console.log(date.format("dddd, MMMM Do YYYY"));
    console.log("---------------");
    console.log(pairList);
    pairsList += pairList + "  ";
    console.log(" ");
    console.log(" ");

    if (date.day() === 4) {
        date.add(4, 'days')
    } else {
        date.add(1, 'days');
    }
});

// console.log("pairs for week: ", pairsForWeek);

// let newPairs = switchPairs(pairsForWeek);

// console.log("final new pairs: ");
// pairsForWeek.forEach(pairList=>{
//     pairList.forEach(pair => {
//         console.log("['" + pair[0] + "','" + pair[1] + "'], ")
//     });
// });

console.log("");
console.log("FINISHED PAIRING");
console.log("-------");
