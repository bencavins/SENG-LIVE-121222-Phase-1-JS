const form = document.querySelector('#search')
console.log(apiKey)

form.addEventListener('submit', event => {
    event.preventDefault()
    const pokeName = event.target.name.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(resp => resp.json())
    .then(data => {
      const results = document.querySelector('#results')
      const img = document.createElement('img')
      img.src = data.sprites.front_default
      results.append(img)
    })
    .catch(resp => {
      console.log('error')
    })
})

results.innerHTML = '<h1>HI</h1>'