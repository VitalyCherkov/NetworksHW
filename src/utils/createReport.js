import getNullsLine from './getNullsLine';
import decrypt from './decrypt';

const getDiffsCount = (line1, line2) => {
    let ans = 0;
    for (let i = 0; i < Math.max(line1.length, line2.length); i++) {
        if (i >= line1.length || i >= line2.length) {
            ans++;
        }
        else if (line1[i] !== line2[i]) {
            ans++;
        }
    }
    return ans;
};

export default (encryptedLine, generatorLen) => {
    if (encryptedLine === 'error' || isNaN(generatorLen)) {
        return {};
    }
    try {
        const maxVal = 1 << encryptedLine.length;
        const res = {};
        for (let i = 0; i < maxVal; i++) {
            // debugger;
            let number = i.toString(2);
            const lenDiff = encryptedLine.length - number.length;
            number = getNullsLine(lenDiff) + number;
            const diffsCount = getDiffsCount(number, encryptedLine);
            if (diffsCount > 1) {
                continue;
            }
            const decrypted = decrypt(number, generatorLen);
            if (!res[diffsCount]) {
                res[diffsCount] = {
                    success: 0,
                    error: 0,
                };
            }
            if (decrypted !== encryptedLine) {
                res[diffsCount].error++;
            }
            else {
                res[diffsCount].success++;
            }
        }
        return res;
    }
    catch (e) {
        return {};
    }
}
