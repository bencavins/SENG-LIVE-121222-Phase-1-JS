const resultsDiv = document.querySelector('#results');
const apiSearchForm = document.querySelector('#api-Search');
const tvList = document.querySelector('#tv-list')

function renderShow(show) {
  // console.log(show)
  const li = document.createElement('li')
  const h3 = document.createElement('h3')
  const img = document.createElement('img')
  img.src = show.show.image.medium
  h3.textContent = show.show.name
  li.appendChild(h3)
  li.appendChild(img)
  tvList.append(li)
}

apiSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = encodeURI(e.target.search.value);
  console.log(query);

  tvList.innerHTML = ""

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
  .then(resp => resp.json())
  .then(data => data.forEach(renderShow))
})
