import divide from './xorDivide';
import generatorPolinoms, { syndroms } from '../config/generatingPolinoms';
import getNullsLine from './getNullsLine';

const inverseBits = (inversing, mask) => {
    let res = '';
    for (let i = 0; i < inversing.length; i++) {
        if (i < mask.length && mask[i] === '1') {
            res = res + (inversing[i] === '1' ? '0' : '1');
        }
        else {
            res = res + inversing[i];
        }
    }
    return res;
};

export default (encryptedLine, generatorLen) => {
    try {
        const divider = generatorPolinoms[generatorLen];
        let remainder = divide(encryptedLine, divider);

        if (remainder === '') {
            return encryptedLine;
        }

        remainder = parseInt(remainder, 2);
        if (isNaN(remainder)) {
            return 'REMAINDER_IS_NAN';
        }
        if (syndroms[generatorLen]) {
            const syndrom = syndroms[generatorLen][remainder];
            if (syndrom === undefined) {
                return 'SYNDROM_DOES_NOT_EXIST';
            }
            const nulls_count = encryptedLine.length - 1 - syndroms[generatorLen][remainder];
            const errVec = getNullsLine(nulls_count) + '1';
            return inverseBits(encryptedLine, errVec);
        }

        let mask = getNullsLine(encryptedLine.length - 1) + '1';
        let curLine = encryptedLine;
        while (mask.length) {
            curLine = inverseBits(encryptedLine, mask);
            const curRemainder = divide(curLine, divider);
            if (curRemainder === '') {
                return curLine;
            }
            mask = mask.substr(1);
        }
    }
    catch (e) {
        return 'NOT_DECRYPTED_UNEXPECTED_ERROR';
    }
    return 'NOT_DECRYPTED';
}
