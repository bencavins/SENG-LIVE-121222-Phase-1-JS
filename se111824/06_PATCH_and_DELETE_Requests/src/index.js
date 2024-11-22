// Rendering functions
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// adds options to a select tag that allows swapping between different stores
function renderStoreSelectionOptions(stores) {
  // target the select tag
  const storeSelector = document.querySelector('#store-selector');
  // clear out any currently visible options
  storeSelector.innerHTML = "";
  // add an option to the select tag for each store
  stores.forEach(addSelectOptionForStore)
  // add a listener so that when the selection changes, we fetch that store's data from the server and load it into the DOM
  storeSelector.addEventListener('change', (e) => {
    fetch(`http://localhost:4000/stores/${e.target.value}`)
    .then(resp => resp.json())
    .then(store => {
      renderHeader(store)
      renderFooter(store)
    })
  })
}

const storeSelector = document.querySelector('#store-selector');

function addSelectOptionForStore(store) {
  const option = document.createElement('option');
  // the option value will appear within e.target.value
  option.value = store.id;
  // the options textContent will be what the user sees when choosing an option
  option.textContent = store.name;
  storeSelector.append(option);
}

function renderBook(book) {
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  
  const pPrice = document.createElement('p');
  pPrice.textContent = `${formatPrice(book.price)}`;
  
  // TODO convert this to an input
  // add change handler
  // send patch request
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  const btn = document.createElement('button');
  btn.textContent = 'Delete';

  // TODO send a DELETE request when clicking a book
  btn.addEventListener('click', (e) => {
    li.remove();
  })

  li.append(h3, pAuthor, pPrice, pStock, img, btn);
  document.querySelector('#book-list').append(li);
}

function renderError(error) {
  const main = document.querySelector('main');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  if (error.message === "Failed to fetch") {
    errorDiv.textContent = "Whoops! Looks like you forgot to start your JSON-server!"
  } else {
    errorDiv.textContent = error;
  }
  main.prepend(errorDiv);
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      errorDiv.remove();
    }
  })
}

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

// Event Handlers
const toggleBookFormBtn = document.querySelector('#toggleBookForm');
const bookForm = document.querySelector('#book-form');
const toggleStoreFormBtn = document.querySelector('#toggleStoreForm');
const storeForm = document.querySelector('#store-form');

// hide and show the new book form when toggle buton is clicked
toggleBookFormBtn.addEventListener('click', (e) => {
  const formHidden = bookForm.classList.toggle('collapsed')
  toggleBookFormBtn.textContent = formHidden ?  "New Book" : "Hide Book Form";
});

toggleStoreFormBtn.addEventListener('click', (e) => {
  const formHidden = storeForm.classList.toggle('collapsed');
  toggleStoreFormBtn.textContent = formHidden ? " New Store" : "Hide Store Form";
});

// also hide both form when they're visible and the escape key is pressed
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!bookForm.classList.contains('collapsed')) {
      bookForm.classList.add('collapsed')
      toggleBookFormBtn.textContent = "New Book";
    };
    if (!storeForm.classList.contains('collapsed')) {
      storeForm.classList.add('collapsed')
      toggleStoreFormBtn.textContent = "New Store";
    };
  }
})

// event handler for book form
bookForm.addEventListener('submit', (e) => { 
  e.preventDefault();  // prevent page from refreshing
  
  const newBook = { // pull the info for the new book out of the form
    title: e.target.title.value,
    author: e.target.author.value,
    price: Number.parseFloat(e.target.price.value),
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  }

  // optimisic rendering
  // assume the POST request will succeed, render the book regardless
  renderBook(newBook);

  // POST the new book to the database (json-server)
  fetch('http://localhost:4000/books', {
    method: 'POST',  // tell the server this is a POST request (need to create new data)
    headers: {
      "Content-Type": "application/json"  // tell the server we are sending it JSON data
    },
    body: JSON.stringify(newBook)  // converting our newBook obj to text, setting the body of the request
  })
  .then((resp) => resp.json())
  .then((data) => {
    // pessimistic rendering
    // wait for a success response from the server before rendering
    renderBook(data)
  })
  .catch(error => {  // This only runs if there is an error in the fetch
    renderError('Failed to POST new book')
  })

  e.target.reset();  // clear the inputs on the form
})


// fetch the store data from the server and render it
fetch('http://localhost:4000/stores')  // send the request
.then((resp) => resp.json())  // get the json data from the request
.then((stores) => {
  // do something with the data
  renderStoreSelectionOptions(stores)
  renderHeader(stores[0])
  renderFooter(stores[0])
})
  .catch(err => {
    console.error(err);
    renderError('Make sure to start json-server!') // I'm skipping this so we only see this error message once if JSON-server is actually not running
  });

// load all the books and render them
fetch('http://localhost:4000/books')
.then((resp) => resp.json())
.then((books) => {
  // loop over book objects
  for (let book of books) {
    renderBook(book)  // render book on the page
  }
})
