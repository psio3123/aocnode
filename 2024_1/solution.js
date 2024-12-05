export const parts = {
    part1: function(input) {
        // input conversion
        let lefties = [];
        let righties = [];
        const lines = input.split("\n");
        // convert lines into left and right array
        for ( const line of lines) {
            const parts = line.split(/\s+/);
            const nLeft = Number(parts[0]);
            const nRight = Number(parts[1]);
            lefties.push(nLeft);
            righties.push(nRight);
        }
        // sort arrays
        lefties.sort();
        righties.sort();
        // calc distance
        let nDistance = 0;
        const nLen = Math.min(lefties.length, righties.length);
        for (let i = 0; i < nLen; i++) {
            nDistance += Math.abs(lefties[i] - righties[i]);
        }
        let answer = nDistance.toString();
        return answer;
    },
    part2: function (input) {
        // input conversion
        let lefties = [];
        const righties = new Map();
        const lines = input.split("\n");
        // convert lines into left and right array
        for ( const line of lines) {
            const parts = line.split(/\s+/);
            const nLeft = Number(parts[0]);
            const nRight = Number(parts[1]);
            lefties.push(nLeft);
            // add to counter in Map for this number
            righties.set(nRight, (righties.get(nRight) ?? 0 ) + 1);
        }
        // calc simularity
        let nSimularity = 0;
        const nLen = lefties.length;
        for (let i = 0; i < nLen; i++) {
            nSimularity += lefties[i] * (righties.get(lefties[i]) ?? 0 );
        }
        let answer = nSimularity.toString();
        return answer;
    }
};