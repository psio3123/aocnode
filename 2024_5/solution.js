"use strict";
let rules = new Map();

export const parts = {
    part1: function(input) {
        let sum = 0;
        const lines = input.split("\n");
        for (const line of lines) {
            if (line.includes("|")) {
                //Rule Line
                const rule = line.split("|");
                //add rule for this entry
                //my rule is inverted: the rules(key) must come after all pages in the dictionary
                //so i can check all later pages against rule breaks
                rules.set(rule[1], (rules.get(rule[1]) ?? new Set()).add(rule[0]));
                insertRule(rule[0], rule[1]);
            } else 
            if (line.includes(",")) {
                //update line
                const updatePages = line.split(",");
                if (checkUpdates(updatePages) === true ) {
                    //get middle value
                    sum += middleValue(updatePages);
                }
            }
        }
        let answer = sum + "";
        return answer;
    },
    part2: function (input) {
        let sum = 0;
        const lines = input.split("\n");
        for (const line of lines) {
            if (line.includes("|")) {
                //Rule Line
                const rule = line.split("|");
                //add rule for this entry
                //my rule is inverted: the rules(key) must come after all pages in the dictionary
                //so i can check all later pages against rule breaks
                rules.set(rule[1], (rules.get(rule[1]) ?? new Set()).add(rule[0]));
            } else 
            if (line.includes(",")) {
                //update line
                const updatePages = line.split(",");
                if (checkUpdates(updatePages) === false ) {
                    const correctedPages = correctPages(updatePages);
                    //get middle value
                    sum += middleValue(correctedPages);
                }
            }
        }
        let answer = sum + "";
        return answer;
    }
};

const checkUpdates = function (updates) {
    let checkResult = true;
    const len = updates.length;
    for (let x = 0; x < len - 1; x++) {
        const page = updates[x];
        //read rules for page
        const pageRules = rules.get(page);
        //check page against all following pages
        for (let y = x+1; y < len; y++) { 
            const laterpage = updates[y];
            //check if rule is broken
            if (pageRules.has(laterpage)) {
                //console.log("Page " + page + " must not be before " +  laterpage );
                //rule is broken
                checkResult = false;
                break; //for y
            }
        }
        if (checkResult === false) {
            break; // for x
        }
    }
    return checkResult;
}

const middleValue = function (pages) {
    return Number(pages[Math.trunc(pages.length/2)]);
}

const correctPages = function (pages) {
    return pages.sort(function(a, b){return rules.get(b)?.has(a) ? 1 : -1});
}
