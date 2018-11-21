export default count => count === 0 ? '' :
    (Array.from(Array(count).keys())).map(() => '0').join('');
