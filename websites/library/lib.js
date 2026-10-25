// 1. Load books from Local Storage or start with an empty array
let books = JSON.parse(localStorage.getItem("books")) || [];

const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");

// 2. Add a new book
function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    alert("Please enter both a title and an author!");
    return;
  }

  const newBook = {
    id: Date.now(),
    title: title,
    author: author,
    status: "Available",
  };

  books.push(newBook);
  saveAndRender();

  titleInput.value = "";
  authorInput.value = "";
}

// 3. Delete a book
function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  saveAndRender();
}

// 4. Toggle Borrow / Return status
function toggleStatus(id) {
  books = books.map((book) => {
    if (book.id === id) {
      book.status = book.status === "Available" ? "Borrowed" : "Available";
    }
    return book;
  });
  saveAndRender();
}

// 5. Search books by title or author
function searchBooks() {
  const query = searchInput.value.toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query),
  );
  renderBooks(filteredBooks);
}

// 6. Save to Local Storage & Refresh the screen
function saveAndRender() {
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks(books);
}

// 7. Render books to the DOM
function renderBooks(booksToRender) {
  bookList.innerHTML = "";

  if (booksToRender.length === 0) {
    bookList.innerHTML =
      "<p style='text-align:center; color:#777;'>No books found.</p>";
    return;
  }

  booksToRender.forEach((book) => {
    const li = document.createElement("li");
    const statusClass = book.status === "Available" ? "available" : "borrowed";

    li.innerHTML = `
            <div>
                <strong>${book.title}</strong> by ${book.author}
                <br><small class="${statusClass}">Status: ${book.status}</small>
            </div>
            <div class="actions">
                <button onclick="toggleStatus(${book.id})">
                    ${book.status === "Available" ? "Borrow" : "Return"}
                </button>
                <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
            </div>
        `;
    bookList.appendChild(li);
  });
}

// Initial render when the page loads
renderBooks(books);
