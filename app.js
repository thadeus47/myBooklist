//book class:reps a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn =isbn;
    }
}
//UI class:handle UI tasks
class UI {
    static displayBooks() {
        
        const books = Store.getBooks();
    
        //looping through the book and calling a method addBookToList
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row  = document.createElement('tr');//create element "default tag to create DOM elements"

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;
        //append(putting something) row to list
        list.appendChild(row);
    }

    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();//remove the table elements in UI
        }
    }

    static showAlert(message, className) {
        //creating div and adding it to the UI
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        //creating container div
        const container = document.querySelector('.container');
        //creating form
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);//inserting div before form
        //vanish alert in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }
    //clearing text fields in UI  after input of user
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
      }
}
//Store class:Handles storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books =[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
   static addBook(book) {
       const books = Store.getBooks();

       books.push(book);

       localStorage.setItem('books',JSON.stringify(books));
    }
   static removeBooks(isbn) {
       const books = Store.getBooks();

       books.forEach((book, index) =>{
           if (book.isbn === isbn){
               books.splice(index, 1);
           }
       });

       localStorage.setItem('books',JSON.stringify(books));
    }
}



//Event:Display books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event:Add a book
document.querySelector('#book-form').addEventListener('submit',(e) => {

//prevent actual  submit default values
e.preventDefault();

//get form values
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const isbn = document.querySelector('#isbn').value;

//Validate 
if (title ==='' || author === ''  || isbn === ''){
    UI.showAlert('Please fill in all fields','danger');
}else {
   //instatiate book from book class
const book = new Book(title, author, isbn);


//Add book to UI
UI.addBookToList(book); 

//Add book to loacal Store
Store.addBook(book);


//show success message
UI.showAlert('Book Added', 'success');

//clear  text fields  in UI
UI.clearFields();
}
});

//Event:Remove a book
document.querySelector('#book-list').addEventListener('click', (e =>{
    UI.deleteBook(e.target);

    //Remove book from store
    Store.removeBooks(e.target,parentElement.previousElemenSibling.textContent);   


    //show book deleted
    UI.showAlert('Book Removed', 'success')
}));