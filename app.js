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
let myLibrary = [];

function saveBooks () {
    localStorage.setItem('books', JSON.stringify(myLibrary));
}

function restoreBooks (myLibrary) {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) {
        books.map((book) => {
            myLibrary.push(book);
        });
    } {
        myLibrary = [];
    }

    renderLibrary();
}

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

function addBookToLibrary(book) {
    myLibrary.push(book);
    renderLibrary();
    saveBooks();
}

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    validateForm(e);
})

function validateForm (e) {
    let allow = false;
    const title = e.target['title'];
    const author = e.target['author'];
    const pages = e.target['pages'];
    const read = e.target['read'].checked;

    if (title.value.trim() === '') {
        setError(title);
    } else {
        setSuccess(title);
    }

    if (author.value.trim() === '') {
        setError(author);
    } else {
        setSuccess(author);
    }

    if (pages.value === '') {
        setError(pages);
    } else {
        setSuccess(pages);
    }

    if (title.value.trim() !== '' && author.value.trim() !== '' && pages.value !== '') {
        let newBook = new Book(title.value, author.value, pages.value, read);

        addBookToLibrary(newBook);
        
        title.classList.remove('success');
        author.classList.remove('success');
        pages.classList.remove('success');

        closeAddBookForm();
    }
}

const setError = (element) => {
    const inputControl = element.parentElement;
    const errorText = inputControl.querySelector('.error-text');

    element.classList.add('error');
    errorText.classList.add('error');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorText = inputControl.querySelector('.error-text');

    if (element.value !== '') {
        element.setAttribute('class', 'input success');
        errorText.classList.remove('error');
    }
}

function createCard (book) {
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
    if (book.read === true) {
        readBtn.innerText = 'Read';
        readBtn.classList.add('read');
        saveBooks();

    } else {
        readBtn.innerText = 'Not Read';
        readBtn.classList.remove('read');
        saveBooks();
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
        saveBooks();
    })
}

function renderLibrary () {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => cardGrid.removeChild(card));

    for (let i = 0; i < myLibrary.length; i++) {
        createCard(myLibrary[i]);
    }
}

restoreBooks(myLibrary);