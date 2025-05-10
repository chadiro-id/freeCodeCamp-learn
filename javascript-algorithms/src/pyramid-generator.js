function pyramid(pattern, rowNum, downwards) {
  const colNum = 1 + 2 * (rowNum - 1);

  const pyramid = [];

  for (let i = 0; i < rowNum; i++) {
    const colArr = new Array(colNum).fill(' ');
    colArr.splice(i, colArr.length - i, ...new Array(colArr.length - i * 2).fill(pattern))
    const colString = colArr.join('') + '\n';
    pyramid.push(colString);
  }

  if (!downwards) {
    pyramid.reverse();
  }

  return '\n' + pyramid.join('');
}

console.log(pyramid('A', 1, true));
console.log(pyramid('B', 2, true));
console.log(pyramid('C', 3, true));
console.log(pyramid('D', 4, true));
console.log(pyramid('E', 5, true));
console.log(pyramid('E', 5, false));
console.log(pyramid('D', 4, false));
console.log(pyramid('C', 3, false));
console.log(pyramid('B', 2, false));
console.log(pyramid('A', 1, false));