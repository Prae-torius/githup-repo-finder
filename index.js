'use strict'

const rootURL = 'https://api.github.com'

function getRepos(userHandle){

  const fetchURL = `${rootURL}/users/${userHandle}/repos`

  fetch(fetchURL) 
    .then(response => {
      if (response.ok) {
        return response.json();
      } 
      else {
        throw new Error(response.statusText);
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#error').text('Something went wrong');
    })
}

function displayResults(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
      $('#results-list').append(`<li><a href="${responseJson[i].html_url}" target="_blank"><h2>REPO: ${responseJson[i].name}</h2>`)
    }
    $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userHandle = $('#name').val();
    getRepos(userHandle);
  })
}

$(watchForm)