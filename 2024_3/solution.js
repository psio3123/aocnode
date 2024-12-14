export const parts = {
    part1: function(input) {
        let answer = getSumOfMul(input) + "";
        return answer;
    },
    part2: function (input) {

        let count = 0;
        let sum = 0;
        //regex: (start or "do()") then everything until "don't()", include newlines with the s flag
        const regex = /(^|[d][o][(][)])(.*?)([d][o][n]['][t][(][)]|$)/gs;
        
        let m;

        while ((m = regex.exec(input)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            sum += getSumOfMul(m[2]);
            count++;
        }
        console.log(count);
        let answer = sum + "";
        return answer;
    }
};

const getSumOfMul = function (input) {

    //regex: "mul($1,$2)"" with $1 and $2 only digits of len 1 - 3
    const regex = /[m][u][l][(](\d{1,3})[,](\d{1,3})[)]/g;

    let sum = 0;
    let m;

    while ((m = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        const result = Number(m[1]) * Number(m[2]);
        sum += result;
    }

    return sum;
}