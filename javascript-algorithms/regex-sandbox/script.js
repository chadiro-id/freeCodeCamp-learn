const regexPattern = document.getElementById('pattern');
const stringToTest = document.getElementById('test-string');
const testButton = document.getElementById('test-btn');
const testResult = document.getElementById('result');

const caseInsensitiveFlag = document.getElementById('i');
const globalFlag = document.getElementById('g');

function getFlags() {
  let flags = '';
  if (caseInsensitiveFlag.checked) {
    flags += 'i';
  }
  if (globalFlag.checked) {
    flags += 'g';
  }
  
  return flags;
}

testButton.addEventListener('click', () => {
  const regex = new RegExp(regexPattern.value, getFlags());
  const testText = stringToTest.innerHTML;
  const matchFound = regex.test(testText);
  let replacedText = '';
  console.log(regex);
  if (matchFound) {
    const matched = testText.match(regex);
    console.log(matched);
    if (globalFlag.checked) {
      replacedText = testText.replaceAll(regex, (match) => {
        return `<span class="highlight">${match}</span>`
      });
      testResult.textContent = matched.join(', ');
    } else {
      console.log(testText);
      replacedText = testText.replace(regex, `<span class="highlight">${matched[0]}</span>`);
      console.log(testText);
      testResult.textContent = matched[0];
    }
    stringToTest.innerHTML = replacedText;
  } else {
    testResult.textContent = 'no match';
  }
});