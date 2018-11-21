const generatorPolinoms = [
    "0", "0",
    "111",        // 2
    "1011",       // 3
    "10011",      // 4
    "100101",     // 5
    "1000011",    // 6
    "10001001",   // 7
    "111100111",  // 8
];

export const syndroms = {
    4: {
        [parseInt('1', 2)]: 0,
        [parseInt('10', 2)]: 1,
        [parseInt('100', 2)]: 2,
        [parseInt('1000', 2)]: 3,
        [parseInt('11', 2)]: 4,
        [parseInt('110', 2)]: 5,
        [parseInt('1100', 2)]: 6,
        [parseInt('1011', 2)]: 7,
        [parseInt('101', 2)]: 8,
        [parseInt('1010', 2)]: 9,
        [parseInt('111', 2)]: 10,
        [parseInt('1110', 2)]: 11,
        [parseInt('1111', 2)]: 12,
        [parseInt('1101', 2)]: 13,
        [parseInt('1001', 2)]: 14,
    }
};

export default generatorPolinoms;
