let lenx = 0;
let leny = 0;
let arr = [];

export const parts = {
    part1: function(input) {
        arr = input.split("\n");
        // set max indices
        lenx = arr[0].length;
        leny = arr.length;
        let sum = 0;
        for (let y = 0; y < leny; y++) {
            for (let x = 0; x < lenx; x++) {
                sum += check(x, y);
            }
        }
        let answer = sum + "";
        return answer;
    },
    part2: function (input) {
        arr = input.split("\n");
        arr = arr.filter(line => line.length > 2);
        // set max indices
        lenx = arr[0].length;
        leny = arr.length;
        let sum = 0;
        for (let y = 1; y < leny - 1; y++) {
            for (let x = 1; x < lenx - 1; x++) {
                sum += checkxmas(x, y);
            }
        }
        let answer = sum + "";
        return answer;
    }
};

const check = function (x, y) {
    let sum = 0;
    sum += check_e(x, y);
    sum += check_s(x, y);
    sum += check_ne(x, y);
    sum += check_se(x, y);
    return sum;
}

const check_e = function (x, y) {
    if (x >= (lenx - 3)) return 0;
    const test = arr[y][x] + arr[y][x+1] + arr[y][x+2] + arr[y][x+3];
    if ( test === 'XMAS' || test === 'SAMX' ) {
        return 1;
    } else {
        return 0;
    }
}

const check_s = function (x, y) {
    if (y >= (leny - 3)) return 0;
    const test = arr[y][x] + arr[y+1][x] + arr[y+2][x] + arr[y+3][x];
    if ( test === 'XMAS' || test === 'SAMX' ) {
        return 1;
    } else {
        return 0;
    }
}

const check_ne = function (x, y) {
    if (y < 3) return 0;
    if (x >= (lenx - 3)) return 0;
    const test = arr[y][x] + arr[y-1][x+1] + arr[y-2][x+2] + arr[y-3][x+3];
    if ( test === 'XMAS' || test === 'SAMX' ) {
        return 1;
    } else {
        return 0;
    }
}

const check_se = function (x, y) {
    if (y >= (leny - 3)) return 0;
    if (x >= (lenx - 3)) return 0;
    const test = arr[y][x] + arr[y+1][x+1] + arr[y+2][x+2] + arr[y+3][x+3];
    if ( test === 'XMAS' || test === 'SAMX' ) {
        return 1;
    } else {
        return 0;
    }
}

const checkxmas = function (x, y) {
    if (checkmas_ne(x,y) === 1 && checkmas_se(x,y) === 1 ) {
        return 1;
    } else {
        return 0;
    }
}

const checkmas_ne = function (x, y) {
    const test = arr[y-1][x-1] + arr[y][x] + arr[y+1][x+1];
    if ( test === 'MAS' || test === 'SAM' ) {
        return 1;
    } else {
        return 0;
    }
}

const checkmas_se = function (x, y) {
    const test = arr[y-1][x+1] + arr[y][x] + arr[y+1][x-1];
    if ( test === 'MAS' || test === 'SAM' ) {
        return 1;
    } else {
        return 0;
    }
}