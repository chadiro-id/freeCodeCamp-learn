function pyramid(pattern, rowNum, downwards) {
  const colNum = 1 + 2 * (rowNum - 1);

  let pyramid = '\n';

  for (let i = 0; i < rowNum; i++) {
    const colArr = new Array(colNum).fill(' ');
    // for (let j = 0; j < i; j++) {
    //   colArr[i] = ' ';
    //   colArr[colArr.length - 1 - i] = ' ';
    // }
    colArr.splice(i, colArr.length - i, ...new Array(colArr.length - i * 2).fill(pattern))
    const colString = colArr.join('') + '\n';
    pyramid += colString;
  }
  if (downwards === false) {
    const reversedPyramid = Array.from(pyramid);
    return reversedPyramid.reverse().join('');
  }
  return pyramid;
}

console.log(pyramid('A', 1, true));
console.log(pyramid('B', 2, true));
console.log(pyramid('C', 3, true));
console.log(pyramid('D', 4, true));
console.log(pyramid('E', 5, false));