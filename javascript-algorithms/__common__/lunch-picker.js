/**
 * Lunch Picker Program.
 */

const lunches = [];

function addLunchToEnd(arr, item) {
  arr.push(item);
  console.log(`${item} added to the end of the lunch menu.`);
  return arr;
}

function addLunchToStart(arr, item) {
  arr.unshift(item);
  console.log(`${item} added to the start of the lunch menu.`);
  return arr;
}

function removeLastLunch(arr) {
  const poppedItem = arr.pop();
  if (poppedItem) {
    console.log(`${poppedItem} removed from the end of the lunch menu.`);
  }
  else {
    console.log("No lunches to remove.");
  }
  return arr;
}

function removeFirstLunch(arr) {
  const shiftedItem = arr.shift();
  if (shiftedItem) {
    console.log(`${shiftedItem} removed from the start of the lunch menu.`);
  } else {
    console.log("No lunches to remove.");
  }
  return arr;
}

function getRandomLunch(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  if (arr[rand]) {
    console.log(`Randomly selected lunch: ${arr[rand]}`);
  } else {
    console.log("No lunches available.");
  }
  return arr[rand];
}

function showLunchMenu(arr) {
  let items = arr.join(", ");
  let msg;
  if (items) {
    msg = `Menu items: ${items}`;
  } else {
    msg = "The menu is empty.";
  }
  console.log(msg);
  return msg;
}

console.log(showLunchMenu([]));