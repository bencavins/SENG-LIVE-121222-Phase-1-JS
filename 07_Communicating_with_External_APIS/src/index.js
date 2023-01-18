const resultsDiv = document.querySelector('#results');
document.addEventListener('DOMContentLoaded', () => {
  const apiSearchForm = document.querySelector('#api-Search');
  
  apiSearchForm.addEventListener('submit', (event) => {

    event.preventDefault();
    console.log(event.target.search)
    const query = encodeURI(event.target.search.value);

    fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}`)
      .then(resp => resp.json())
      .then(data => console.log(data))
    
    apiSearchForm.reset()
  })
})