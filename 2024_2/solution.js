export const parts = {
    part1: function(input) {
        let iSave = 0;
        // input conversion
        const lines = input.split("\n");
        // convert lines array
        for ( const line of lines) {
            const parts = line.split(/\s+/);
            if (isSave(parts)) {
                ++iSave;
                //console.log('Save: ', line)
            } else {
                //console.log('Not Save: ', line)
            }
        }
        let answer = iSave + '';
        return answer;
    },
    part2: function (input) {
        let iSave = 0;
        // input conversion
        const lines = input.split("\n");
        // convert lines array
        for ( const line of lines) {
            const parts = line.split(/\s+/);
            if (isSave(parts)) {
                ++iSave;
                //console.log('is save!')
            } else {
                //try to remove each single item
                for( let iRemove = 0; iRemove < parts.length; iRemove++ ) {
                    let partsSmall = parts.slice();
                    // remove one element at index iRemove
                    partsSmall.splice(iRemove, 1);
                    if (isSave(partsSmall)) {
                        ++iSave;
                        //console.log(line + ' is save after removing index ' + iRemove + ':', partsSmall.join(" "));
                        break; // reducing for-loop
                    }
                }
            }
        }
        let answer = iSave + '';
        return answer;
    }
};

// check array is save
const isSave = function (parts) {
    //loop starting with the SECOND!
    let iFirstDelta = 0;
    let bIsSave = true;
    for (let i = 1; i < parts.length; i++) {
        const iCurrentDelta = parts[i] - parts[i-1];
        if (i === 1) { iFirstDelta = iCurrentDelta; }
        // check abs(current Delta) between 1 and 3
        if ( Math.abs(iCurrentDelta) < 1 || Math.abs(iCurrentDelta) > 3 ) {
            bIsSave = false;
            break; // for
        } else {
            //check up down rule
            if ( ( iFirstDelta < 0 && iCurrentDelta > 0 ) || ( iFirstDelta > 0 && iCurrentDelta < 0 ) ) {
                bIsSave = false;
                break; //for
            }
        }
    }
    return bIsSave;
}
