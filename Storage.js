const STORAGE_KEY = "BOOK_APPS";
let books = [];

const checkStorage = () => {
  if (typeof Storage == undefined) {
    alert("Your Browser not support web storage");
    return false;
  }
  return true;
};

const saveData = () => {
  const parseData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parseData);
  document.dispatchEvent(new Event("ondatasaved"));
};

const loadDatafromStorage = (title = null) => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);
  if (data !== null) {
    if (title == null) {
      books = data;
    } else {
      books = data.filter((book) => book.bookTitle == title);
    }
  }
  document.dispatchEvent(new Event("ondataloaded"));
};

const updateDataToStorage = () => {
  if (checkStorage()) saveData();
};

const composeBookObject = (bookTitle, bookAuthor, bookYear, isCompleted) => {
  return {
    id: +new Date(),
    bookTitle,
    bookAuthor,
    bookYear,
    isCompleted,
  };
};

const cari = (bookId) => {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
};

const cariIndex = (bookId) => {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;
    index++;
  }
  return -1;
};

const refreshDataFromBooks = () => {
  const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  let bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(
      book.bookTitle,
      book.bookAuthor,
      book.bookYear,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      bookCompleted.append(newBook);
    } else {
      bookUncompleted.append(newBook);
    }
  }
};

const removeAllBooks = () => {
  let bookUncompleted = document
    .getElementById(UNCOMPLETED_BOOK_ID)
    .getElementsByClassName("infobuku");
  let bookCompleted = document
    .getElementById(COMPLETED_BOOK_ID)
    .getElementsByClassName("infobuku");

  while (bookUncompleted.length > 0) {
    bookUncompleted[0].remove();
  }
  while (bookCompleted.length > 0) {
    bookCompleted[0].remove();
  }
};
