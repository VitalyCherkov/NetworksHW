import generatorPolinoms from '../config/generatingPolinoms';
import getNullsLine from './getNullsLine';
import divide from './xorDivide';

export default (inputCode, generatorLen) => {
    try {
        const shiftCode = inputCode + getNullsLine(generatorLen);
        const result = divide(shiftCode, generatorPolinoms[generatorLen]);
        return inputCode + getNullsLine(generatorLen - result.length) + result;
    }
    catch (e) {
        return 'error';
    }
}