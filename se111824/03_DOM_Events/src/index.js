function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

///////////////////
// render functions
///////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  
  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  const btn = document.createElement('button');
  btn.setAttribute('id', book.id)
  btn.textContent = 'Delete';

  // regsiter a click event on the button
  btn.addEventListener('click', (event) => {
    // this code runs every time the event happens
    console.log('deleting', event.target)
    // remove this li from the page
    li.remove()
  })

  li.append(h3, pAuthor, pPrice, img, btn);

  document.querySelector('#book-list').append(li);
}


////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(renderBook);

// for (let i = 0; i < bookStore.inventory.length; i++) {
//   const book = bookStore.inventory[i]
//   renderBook(book)
// }

// for (let book of bookStore.inventory) {
//   renderBook(book)
// }


// select the new book button
const newBookBtn = document.querySelector('#toggleForm')
// add a click event to the button
newBookBtn.addEventListener('click', (event) => {
  // select the form element
  const form = document.querySelector('#book-form')

  // toggle the form by manipulating the class attribute

  // solution 1
  // replace the class attribute completely
  // if (form.className === 'collapsed') {
  //   form.setAttribute('class', '')  // <form class="">
  //   newBookBtn.textContent = 'Collapse Form'
  // } else {
  //   form.setAttribute('class', 'collapsed')  // <form class="collapsed">
  //   newBookBtn.textContent = 'New Book'
  // }
  
  // solution 2 (a little safer)
  // add/remove the string "collapsed" from the class attribute
  if (form.classList.contains('collapsed')) {
    form.classList.remove('collapsed')
    newBookBtn.textContent = 'Collapse Form'
  } else {
    form.classList.add('collapsed')
    newBookBtn.textContent = 'New Book'
  }
})

// select the form
const bookForm = document.querySelector('#book-form')
// add a submit event to the form
bookForm.addEventListener('submit', (event) => {
  event.preventDefault()  // prevent the page from reloading
  

  // option 1, query select all input elements, grab value
  // const title = document.querySelector('#form-title')
  // console.log(title.value)
  // const author = document.querySelector('#form-author')
  // console.log(author.value)
  // const price = document.querySelector('#form-price')
  // console.log(parseInt(price.value))
  // const img = document.querySelector('#form-imageUrl')
  // console.log(img.value)
  // const inventory = document.querySelector('#form-inventory')
  // console.log(inventory.value)

  // option 2, grab input data from event.target
  console.log(event.target.title.value)
  console.log(event.target.author.value)
  console.log(event.target.price.value)
  console.log(event.target.imageUrl.value)
  console.log(event.target.inventory.value)

  // build a new book object
  const newBook = {
      // id:1,
      title: event.target.title.value,
      author: event.target.author.value,
      price: parseFloat(event.target.price.value),
      // reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
      inventory: event.target.inventory.value,
      imageUrl: event.target.imageUrl.value
  }

  // render the new book on the page
  renderBook(newBook)
  // clear all the inputs from the form
  bookForm.reset()
})
