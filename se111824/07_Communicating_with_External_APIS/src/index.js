const resultsDiv = document.querySelector('#results');
const apiSearchForm = document.querySelector('#api-Search');

apiSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = encodeURI(e.target.search.value);
  console.log(query);
})
