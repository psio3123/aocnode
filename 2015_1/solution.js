export const parts = {
    part1: function(input) {
        let intFloor = 0;
        for (let char of input) {
            if (char === "(") {
                intFloor++;
            } else if (char === ")") {
                intFloor--;
            }
        }
        let answer = String(intFloor);
        return answer;
    },
    part2: function (input) {
        let intFloor = 0;
        let pos = 0;
        for (let char of input) {
            pos++;
            if (char === "(") {
                intFloor++;
            } else if (char === ")") {
                intFloor--;
            }
            if (intFloor < 0) {
                break;
            }
        }
        let answer = String(pos);
        return answer;
    }
};

