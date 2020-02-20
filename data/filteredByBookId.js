const { books } = require("./books");

module.exports.filterById = bookNumber => {
  return books.filter(book => book.id === parseInt(bookNumber));
};
