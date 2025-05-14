
const inventory = [];

function findProductIndex(productName) {
  const product = inventory.find(product => product.name.toLowerCase() === productName.toLowerCase());
  return inventory.indexOf(product);
}

function addProduct(product) {
  const index = findProductIndex(product.name);
  if (index > -1) {
    inventory[index].quantity += product.quantity;
    console.log(`${product.name.toLowerCase()} quantity updated`);
  } else {
    inventory.push({
      name: product.name.toLowerCase(),
      quantity: product.quantity
    });
    console.log(`${product.name.toLowerCase()} added to inventory`);
  }
}

function removeProduct(name, quantity) {
  const index = findProductIndex(name);
  if (index !== -1) {
    const qty = inventory[index].quantity;
    if (qty - quantity < 0) {
      console.log(`Not enough ${name.toLowerCase()} available, remaining pieces: ${qty}`);
    } else {
      inventory[index].quantity -= quantity;
    console.log(`Remaining ${name.toLowerCase()} pieces: ${inventory[index].quantity}`);
    if (inventory[index].quantity === 0) {
      inventory.splice(index, 1);
    }
    }
  } else {
    console.log(`${name.toLowerCase()} not found`);
  }
}

console.log(addProduct({name: "FLOUR", quantity: 5}));
console.log(addProduct({name: "FLOUR", quantity: 5}));
console.log(addProduct({name: "FLOUR", quantity: 5}));
console.log(addProduct({name: "FLOUR", quantity: 5}));
console.log(removeProduct("FLOUR", 5));
console.log(removeProduct("FLOUR", 5));
console.log(removeProduct("FLOUR", 5));
console.log(removeProduct("FLOUR", 10));
