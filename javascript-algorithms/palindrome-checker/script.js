const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const resultElement = document.getElementById('result');

checkButton.addEventListener('click', () => {
  const inputText = textInput.value;
  if (inputText === '') {
    alert('Please input a value');
  } else {
    resultElement.textContent = isPalindrome(inputText) ? `${inputText} is a palindrome` : `${inputText} is not a palindrome`;
  }
});

const isPalindrome = (str) => {
  // Convert the string to lowercase and remove non-alphanumeric characters
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Check if the string is equal to its reverse
  return str === str.split('').reverse().join('');
}
