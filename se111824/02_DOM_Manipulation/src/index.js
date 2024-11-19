//BookStore has been moved to data.js 
console.log(bookStore);

// global vars
const bookList = document.querySelector('#book-list')

// functions
function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

function renderHeader(bookStore) {
  // select an element on the page
  const storeNameH1 = document.querySelector("#store-name")
  // set textContent to the bookstore's name
  storeNameH1.textContent = bookStore.name
}

function renderFooter(bookStore) {
  const storeDiv = document.querySelector('#store')
  const numberDiv = document.querySelector('#number')
  const addressDiv = document.querySelector('#address')

  storeDiv.textContent = bookStore.name
  numberDiv.textContent = bookStore.number
  addressDiv.textContent = bookStore.address
}

function renderBook(book) {
  // create new <li>
  const newLi = document.createElement('li')
  newLi.setAttribute('class', 'list-li')

  // create new <h3>
  const titleH3 = document.createElement('h3')
  titleH3.textContent = book.title
  newLi.appendChild(titleH3) // add h3 under li

  // create <p> for author
  const authorP = document.createElement('p')
  authorP.textContent = book.author
  newLi.appendChild(authorP)

  // create <p> for price
  const priceP = document.createElement('p')
  priceP.textContent = formatPrice(book.price)
  newLi.appendChild(priceP)

  // create <img>
  const img = document.createElement('img')
  img.setAttribute('src', book.imageUrl)
  newLi.appendChild(img)

  // create <button>
  const button = document.createElement('button')
  button.textContent = 'Delete'
  newLi.appendChild(button)

  // append the while <li> to the book list
  bookList.appendChild(newLi)
}


// driver code
renderHeader(bookStore)
renderFooter(bookStore)

// const newLi = document.createElement('li')  // <li></li>
// newLi.textContent = 'text'  // <li>text</li>
// newLi.setAttribute('class', 'list-li')  // <li class="list-li">text</li>
// bookList.appendChild(newLi)  // add to <ul> as child

// be careful with innerHTML!
// can make you vulnerable to cross-site scripting attacks!
// bookList.innerHTML = "<li class='list-li'>text</li><li class='list-li'>text2</li>"

// using .forEach
bookStore.inventory.forEach((book) => {
  renderBook(book)
})

// for of loop
for (let book of bookStore.inventory) {
  renderBook(book)
}

// for loop with index
for (let i = 0; i < bookStore.inventory.length; i++) {
  renderBook(bookStore.inventory[i])
}

// can remove elements
// bookList.remove()

  