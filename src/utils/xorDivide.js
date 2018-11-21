'use strict';

export default (dividend, divider) => {
    let line1 = dividend;
    let line2 = divider;
    while(line1.length >= line2.length) {
        console.log(line1, line2);
        let resStr = '';
        for (let i = 0; i < line1.length; i++) {
            if (i < line2.length) {
                resStr = resStr + (line1[i] === line2[i] ? '0' : '1');
            }
            else {
                resStr = resStr + line1[i];
            }
        }
        const notNullIndex = resStr.indexOf('1');
        if (notNullIndex < 0) {
            line1 = '';
        }
        else {
            line1 = resStr.slice(notNullIndex);
        }
    }
    return line1;
}
