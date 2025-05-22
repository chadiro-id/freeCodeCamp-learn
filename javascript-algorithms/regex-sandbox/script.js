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
  if (matchFound) {
    let textMatched = '';
    if (globalFlag.checked) {
      // If the global flag is set, find all matches
      const matched = testText.matchAll(regex);
      console.log(matched);
      for (const match of matched) {
        textMatched += `${match[0]}, `;
        // Highlight the matched text
        const highlightedText = `<span class="highlight">${match[0]}</span>`;
        testText.replace(match[0], highlightedText);
      }
    } else {
      // If the global flag is not set, find the first match
      const matched = testText.match(regex);
      if (matched) {
        textMatched = matched[0];
        // Highlight the matched text
        const highlightedText = `<span class="highlight">${matched[0]}</span>`;
        testText.replace(matched[0], highlightedText);
      }
    }
    stringToTest.innerHTML = testText;
    testResult.textContent = textMatched;
  } else {
    testResult.textContent = 'no match';
  }
});