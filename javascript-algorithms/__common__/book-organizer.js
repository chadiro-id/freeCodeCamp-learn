
const books = [
  {
    title: "Dune",
    authorName: "Frank Herbert",
    releaseYear: 1965,
  },
  {
    title: "Piranesi",
    authorName: "Susanna Clarke",
    releaseYear: 2020,
  },
  {
    title: "Hamnet",
    authorName: "Maggie O'Farell",
    releaseYear: 2020,
  },
  {
    title: "The Guest List",
    authorName: "Lucy Fokley",
    releaseYear: 2020,
  },
  {
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    authorName: "James Clear",
    releaseYear: 2018,
  }
];

function sortByYear(a, b) {
  if (a.releaseYear - b.releaseYear < 0) return -1;
  if (a.releaseYear - b.releaseYear > 0) return 1;
  return 0;
}

const filteredBooks = books.filter(book => book.releaseYear > 2018);

console.log(filteredBooks);

filteredBooks.sort(sortByYear);

console.log(filteredBooks);