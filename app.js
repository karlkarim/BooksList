const form = document.querySelector('#book-form');
const bookInput = document.querySelector('#book');
const booksList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-books');

loadEventListeners();

function loadEventListeners(){
    //get books from local storage on load
    document.addEventListener('DOMContentLoaded', getBooks);
    //add a task to the UI and local storage
    form.addEventListener('submit', addBook);
    booksList.addEventListener('click', removeBook);
    filter.addEventListener('keyup', filterTasks);
    clearBtn.addEventListener('click', clearTasks);
}

function getBooks(){
    let books;

    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(book => {
        //for each task from books array - create an li element
        const li = document.createElement('li');
        //add class name to the li element
        li.className = 'collection-book';
        //create a text-node and append it to the li
        li.appendChild(document.createTextNode(book));
        //create an anchor tag 
        const removeLink = document.createElement('a');
        //ad a class name to the removeLink element
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML = 'X';
        li.appendChild(removeLink);

        //add li element to the ul collection
        booksList.appendChild(li);
    });

    

}

function addBook(event){
    if(bookInput.value === ''){
        alert('Add a book!');
    } else {
        //create an li element
    const li = document.createElement('li');
    //assign a class name to the html element
    li.className = 'collection-book';
    //add text content to the li element
    li.appendChild(document.createTextNode(bookInput.value));
    //create an anchor tag 
    const removeLink = document.createElement('a');
    //ad a class name to the removeLink element
    removeLink.className = 'delete-item secondary-content';
    removeLink.innerHTML = 'X';
    li.appendChild(removeLink);

    //add li element to the ul collection
    booksList.appendChild(li);
    
    //store the task in local storage
    storeInLocalStorage(bookInput.value);

    bookInput.value = '';
    }
    
    event.preventDefault();
}

function storeInLocalStorage(task){
    //declare an array to read from local storage
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    //add the user's task to the books array
    books.push(task);
    localStorage.setItem('books', JSON.stringify(books));
}


function removeBook(event){
    //check if the area clicked contains a .delete-item element

    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the book?')){
            //remove the entire li element
            event.target.parentElement.remove();

            //Remove from local storage
            removeFromLocalStorage(event.target.parentElement);
        }
    }
}

function removeFromLocalStorage(taskItem){
    let books;
    if(localStorage.getItem('books') === null){
        books =  [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    books.forEach(function(task, index) {
        if(taskItem.textContent.slice(0, -1) === task){
            books.splice(index, 1);
        }
    });

    localStorage.setItem('books', JSON.stringify(books));
}

function filterTasks(event){
    const text = event.target.value.toLowerCase();

    document.querySelectorAll('.collection-book').forEach(task => {
        const taskValue = task.firstChild.textContent;
        if(taskValue.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function clearTasks(){
    //removing elements with while loop and removeChild
    while(booksList.firstChild){
        booksList.removeChild(booksList.firstChild);
    }

    clearBooksFromLocalStorage();
}

function clearBooksFromLocalStorage(){
    localStorage.clear();
}