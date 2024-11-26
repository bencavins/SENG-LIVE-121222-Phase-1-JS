const resultsDiv = document.querySelector('#results');
const apiSearchForm = document.querySelector('#api-Search');
const tvList = document.querySelector('#tv-list')

/* 
<li>
  <h3>Title</h3>
  <img />
</li>
*/
function renderShow(showObj) {
  const li = document.createElement('li')
  
  const h3 = document.createElement('h3')
  h3.textContent = showObj.show.name

  const img = document.createElement('img')
  img.src = showObj.show.image.medium

  li.append(h3, img)
  tvList.appendChild(li)
}


apiSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = encodeURI(e.target.search.value);
  console.log(query)

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
  .then(resp => resp.json())
  .then(jsonData => {
    tvList.innerHTML = ''
    jsonData.forEach(element => {
      renderShow(element)
    });
  })
})
