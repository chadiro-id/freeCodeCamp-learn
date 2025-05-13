
function generatePassword(length) {
  const pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let count = 0;
  let password = '';
  do {
    const rand = Math.floor(Math.random() * pattern.length);
    password += pattern[rand];
    count++;
  } while (count < length);
  return password;
}

let password = generatePassword(8);
console.log(`Generated password: ${password}`);