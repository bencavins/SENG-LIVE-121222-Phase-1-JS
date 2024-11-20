// variables (let, const, var)
const x = 1  // create a constant called x, give it the value 1
let y = 0  // create a variable called y, give it the value 0
y = 99  // we can change y 
// x = 99  // we are not allowed to change x

// common data types
const myNumber = 123
// console.log(typeof myNumber)
const myString = "hello"
// console.log(typeof myString)
const myBoolean = true
// console.log(typeof myBoolean)
const myArray = [1, 2, 3]
// console.log(typeof myArray)
const myObject = {"name": "bob", "age": 50}
// console.log(typeof myObject)

// conditionals
let weather = 'snow'
if (weather === 'sunny') {  // this condition is checked first
  console.log("nice day")
} else if (weather === 'rain') {  // this is checked next
  console.log("bring an umbrella")
} else {  // this only runs if all the above conditions are false
  console.log("I don't know")
}


//Data 
const inventory = [
  {
    id: 1,
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marjin Haverbeke',
    price: 10.00,
    reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
    inventory: 10,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: 2,
    title: 'JavaScript & JQuery: Interactive Front-End Web Development',
    author: 'Jon Duckett',
    price: 45.75,
    reviews: [{userID: 15, content:'good way to learn JQuery'}],
    inventory: 2,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31SRWF+LkKL._SX398_BO1,204,203,200_.jpg'
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 36.00,
    reviews: [{userID: 25, content:'I disagree with everything in this book'}, {userID: 250, content:'Only JS book anyone needs'}],
    inventory: 8,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: 4,
    title: 'JavaScript: The Definitive Guide',
    author: 'David Flanagan',
    price: 25.50,
    reviews: [{userID: 44, content:'Great intro to js book'}, {userID: 350, content:'It really is the Definitive guide'}],
    inventory: 0,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51wijnc-Y8L._SX379_BO1,204,203,200_.jpg"
  },
  {
    id: 5,
    title: 'You Don’t Know JS',
    author: 'Kyle Simpson',
    price: 6.00,
    reviews: [{userID: 76, content:'You can find this for free online, no need to pay for it!'}],
    inventory: 7,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41T5H8u7fUL._SX331_BO1,204,203,200_.jpg'
  }, 
  {
    id: 6,
    title: 'Learn Enough JavaScript to Be Dangerous',
    author: 'Michael Hartl',
    price: 24.00,
    reviews: [{userID: 50, content:'pretty good'}],
    inventory: 5,
    imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQyf6xSyTHc7a8mx17ikh6GeTohc88Hn0UgkN-RNF-h4iOwVlkW'
  },
  {
    id: 7,
    title: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    price: 49.95,
    reviews: [{userID: 99, content:'One of the most helpful books for taking on the tech interview'}, {userID: 20, content: 'Great but I just wish it was in JavaScript instead of Java' }],
    inventory: 20,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SY344_BO1,204,203,200_.jpg'
  }
]

// a function has 3 parts:
// - name (optional for arrow functions)
// - parameters (or arguments)
// - body (code block)

// defining a function
function helloWorld() {
  console.log('Hello, world!')
}
helloWorld()  // functions don't run until you call them

// example of an arrow function
const helloWorldArrow = () => {
  console.log('Hello, arrow world!')
}

// handy formatPrice function
function formatPrice(price) {
  return "$" + price.toFixed(2)
}

let myGlobal = 'hi'  // global variables can be accessed from anywhere
const formatPriceArrow = (price) => {
  const formattedPrice = "$" + price.toFixed(2)
  myGlobal = formattedPrice  // allowed to change global variable in function
  return formattedPrice
}
// we cannot access formattedPrice outside of function


// a function that summarizes some info for a book
function blurb(book) {
  return `${book.title} by ${book.author}, ${formatPrice(book.price)}`
}
// console.log(blurb(inventory[0]))
// console.log(blurb(inventory[1]))
// console.log(blurb(inventory[2]))


// we can pass functions into other functions as arguments
// these are called callback functions
function execFunc(func, arg1, arg2) {
  console.log(`calling func with ${arg1}, ${arg2}`)
  return func(arg1, arg2)
}

const myFunc = (x, y) => {return x + y + z}
console.log(execFunc(myFunc, 5, 3))


const nums = [1, 2, 3, 4]
// .forEach() can be used to run some code for every item in an array
nums.forEach((x) => {console.log(x)})
// .map() can be used to transform each item in an array
// and put it inside a new one
const doubles = nums.map((x) => {return x*2})
console.log(doubles)  // [2, 4, 6, 8]

// create an array that only contains the prices for the books
const prices = inventory.map((book) => {return book.price})

// use .forEach() to iterate over all prices and calcuate an average
let total = 0
let count = 0
prices.forEach(price => {
  total = total + price // total += price
  count = count + 1  // count += 1
})
const avg = total / count

// create an array of blurbs for each book in inventory
const blurbs = inventory.map((book) => {return blurb(book)})

// 💡 When do I use forEach vs map?
// .forEach() is useful if we want to run a function for each
// item in an array

// .map() is useful if we want to transform everything in the
// original array and put it inside a new one