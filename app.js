class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const addBookForm = document.getElementById('addBookForm');
const addBookBtn = document.getElementById('addBookBtn');
const addBook = document.getElementById('addBook');
const overlay = document.querySelector('.overlay');
const cardGrid = document.querySelector('.card-grid');

const openAddBookForm = () => {
    addBook.classList.add('active');
    overlay.classList.add('active');
    addBookForm.reset();
}

const closeAddBookForm = () => {
    addBook.classList.remove('active');
    overlay.classList.remove('active');
}

addBookBtn.onclick = openAddBookForm;
overlay.onclick = closeAddBookForm;

let myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
    renderLibrary();
}

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = e.target['title'].value;
    const author = e.target['author'].value;
    const pages = e.target['pages'].value;
    const read = e.target['read'].checked;

    let newBook = new Book(title, author, pages, read);

    addBookToLibrary(newBook);

    closeAddBookForm();
})

function createCard(book) {
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('p');
    const cardFooter = document.createElement('div');
    const readBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    card.classList.add('card');
    card.setAttribute('id', myLibrary.indexOf(book));
    cardGrid.appendChild(card);

    cardHeader.classList.add('card-header');
    cardHeader.innerText = ('Title: ' + book.title);
    card.appendChild(cardHeader);

    cardBody.innerText = ('Author: ' + book.author + '\nPages: ' + book.pages);
    card.appendChild(cardBody);

    cardFooter.classList.add('card-footer');
    card.appendChild(cardFooter);

    readBtn.classList.add('card-btn', 'btn-read');
    cardFooter.appendChild(readBtn);
    if (book.read == true) {
        readBtn.innerText = 'Read';
    } else {
        readBtn.innerText = 'Not Read';
    }
    readBtn.addEventListener('click', () => {
        book.read = !book.read;
        renderLibrary();
    })

    deleteBtn.classList.add('card-btn', 'btn-delete');
    deleteBtn.innerText = 'Delete';
    cardFooter.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        renderLibrary();
    })
}

function renderLibrary() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => cardGrid.removeChild(card));

    for (let i = 0; i < myLibrary.length; i++) {
        createCard(myLibrary[i]);
    }
}

renderLibrary();