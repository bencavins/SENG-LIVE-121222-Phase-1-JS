//BookStore has been moved to data.js 
console.log(bookStore);

const bookListElem = document.querySelector('#book-list')

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}


function renderHeader(bookStore) {
  const nameElement = document.querySelector('#bookstore-name')
  nameElement.textContent = bookStore.name
}

function renderFooter(bookStore) {
  const storeElement = document.querySelector('#store')
  const numberElement = document.querySelector('#number')
  const addressElement = document.querySelector('#address')
  
  storeElement.textContent = bookStore.name
  numberElement.textContent = bookStore.number
  addressElement.textContent = bookStore.address
}

function renderBook(book) {
  console.log(book)
  const newBookElem = document.createElement('li')
  newBookElem.setAttribute('class', 'list-li')
  bookListElem.appendChild(newBookElem)

  const title = document.createElement('h3')
  title.textContent = book.title
  newBookElem.appendChild(title)

  const author = document.createElement('p')
  author.textContent = book.author
  newBookElem.appendChild(author)

  const price = document.createElement('p')
  price.textContent = formatPrice(book.price)
  newBookElem.appendChild(price)

  const img = document.createElement('img')
  img.setAttribute('src', book.imageUrl)
  newBookElem.appendChild(img)

  const button = document.createElement('button')
  button.textContent = 'Delete'
  newBookElem.appendChild(button)
}

renderHeader(bookStore)
renderFooter(bookStore)

bookStore.inventory.forEach((book) => renderBook(book))


// renderBook({
//   title: 'test',
//   author: 'bob',
//   price: 4.55
// })

// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html struture for rendering 
// that book and insert it into our webpage!

// function renderBook(book) {
// should create an li element that looks something like this:
  // <li class="list-li">
  //   <h3>Eloquent JavaScript : A Modern Introduction to Programming</h3>
  //   <p>Marjin Haverbeke</p>
  //   <p>$10.00</p>
  //   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
  //   <button>Delete</button>
  // </li>

  