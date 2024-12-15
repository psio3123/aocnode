let field = [];
let posX = 0;
let posY = 0;
let head = 0; //N=0; E=1; S=2; W=3;
let maxX = 0;
let maxY = 0;
let startPos = {x: undefined, y: undefined, head: undefined };
let sumMarkedFields = 0;
let gardIsStillHere = true;
let sumPossibleObstructions = 0;
let edgePoints = undefined;
let obstructions = new Set();

export const parts = {
    part1: function(input) {
        let step = 0;
        field = input.split("\n").map((line) => [...line]);//convert string into array of array of characters
        maxX = field[0].length - 1;
        maxY = field.length - 1;
        //find start position
        findStartPos();
        //let the guard run
        while(gardIsStillHere) {
            step++;
            doOneStep();
        }
        let answer = sumMarkedFields + "";
        return answer;
    },
    part2: function (input) {
        let endlessLoopFound = false;
        field = input.split("\n").map((line) => [...line]);//convert string into array of array of characters
        maxX = field[0].length - 1;
        maxY = field.length - 1;
        //find start position
        findStartPos();

        for (let y = 0; y<=maxY; y++) {
            //console.log("Checking line y="+y);
            for (let x=0; x<=maxX; x++) {
                endlessLoopFound = tryObstruction(x,y);
                if (endlessLoopFound) { 
                    sumPossibleObstructions++;
                    //console.log("New obstr found at x="+x+" y="+y)
                }
            }
        }

        let answer = sumPossibleObstructions + "";
        return answer;
    }
};

const findStartPos = function () {
    let found = false;
    for (let y = 0; y<maxY; y++) {
        for (let x=0; x<maxX; x++) {
             if (getField(x,y) === '^') {
                setStartPos(x,y,0);
                found = true;
             }
        }
        if (found === true) {
            break;
        }
    }
}

const getField = function(x,y) {
    return field[y][x];
}

const setStartPos = function(x,y,heading) {
    //remember start pos
    startPos.x = x;
    startPos.y = y;
    startPos.head = heading;
    resetToStartPos();
}

const resetToStartPos = function() {
    //set current pos to start pos
    posX = startPos.x;
    posY = startPos.y;
    head = startPos.head;
}

const doOneStep = function(part1 = true) {
    let turnStep = false;
    //get field in front
    const {x,y} = getPosInFront();
    //decide what to do
    if ( x === undefined || y === undefined ) {
        //we are leaving the area
        if (part1) markCurrentPos();
        //finish moves
        gardIsStillHere = false;
    } else {
        const fieldInFront = getField(x, y);
        if (fieldInFront === "#" ) {
            turnRight();
            turnStep = true;
        } else {
            if (part1) markCurrentPos();
            moveToPos(x,y);
        }
    }
    return turnStep;
}

const saveEdgePoint = function () {
    edgePoints.add(posX+"."+posY+"."+head);
}

const loopFound = function () {
    if (edgePoints.has(posX+"."+posY+"."+head)) return true;
    else return false; 
}


const isAtStartPostition = function () {
    if ( startPos.x === posX && startPos.y === posY && startPos.head === head ) return true;
    else return false;
}

const getPosInFront = function () {
    let x = 0;
    let y = 0;
    switch (head) {
        case 0: //N
            x = posX;
            y = posY - 1;
            break;
        case 1: //E
            x = posX + 1;
            y = posY;
            break;
        case 2: //S
            x = posX;
            y = posY + 1;
            break;
        case 3: //W
            x = posX - 1;
            y = posY;
            break;
        default:
            console.log('Error, heading wrong!!!');
    }
    if (x < 0 || x > maxX) x = undefined;
    if (y < 0 || y > maxY) y = undefined;
    return {x: x, y: y };
}

const markCurrentPos = function () {
    const myField = getField(posX, posY);
    if (myField !== "X") {
        //we need to mark this field with X
        field[posY][posX] = 'X';
        sumMarkedFields++; //we marked one more
    }
}

const turnRight = function() {
    head++;
    if (head > 3) head = 0;
    //console.log("Turn right: " + posX + "." + posY );
    //console.log(edgePoints);
}

const moveToPos = function(x,y) {
    posX = x;
    posY = y;
}

const tryObstruction = function(obX,obY) {
    let endlessLoopFound = false;
    let step = 0;

    const oldField = getField(obX,obY);
    if (oldField === '#') {
        //there is already an obstruction, nothing to do
        return false;
    }

    //here we can try out the point with a new obstruction
    field[obY][obX] = '#';

    //reset game to start position
    resetToStartPos();
    gardIsStillHere = true;
    edgePoints = new Set();

    //now play the game until either guard leaves or he returns to start
    while(gardIsStillHere) {
        //displayGame();
        step++;
        if (doOneStep(false)) {
            //we have turned right now => check loop condition here
            if (loopFound()) {
                endlessLoopFound = true;
                break;
            } else { 
                // we need to remember the turning point
                saveEdgePoint();
            }
        } 
        if (step >= 100000) {
            console.log("CirquitBreak after "+step+" steps.");
            endlessLoopFound = false;
            break;
        }
    }

    //make sure to take back the new obstruction
    field[obY][obX] = '.';

    if (endlessLoopFound) {obstructions.add(obX+"."+obY);}

    //return the result
    return endlessLoopFound;
}

const displayGame = function() {
    const oldField = getField(posX, posY);
    let headIcon = "";
    switch (head) {
        case 0: //N
            headIcon = "^";
            break;
        case 1: //E
            headIcon = ">";
            break;
        case 2: //S
            headIcon = "v";
            break;
        case 3: //W
            headIcon = "<";
            break;
    }
    //paint Gard into field
    field[posY][posX] = headIcon;
    
    //output field to console
    console.clear();
    console.log( field.map((line) => line.join("")).join("\n"));

    //reset field to old value
    field[posY][posX] = oldField;
    
}
