let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let listContainer = document.querySelector(".list");
let showContainer = document.getElementById("show-container");
let cardsContainer = document.getElementById("cards-container");

let date = new Date();
console.log(date.getTime());
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

// Set input value
function displayWords(value) {
    input.value = value;
    // Remove all existing elements
    removeElements();
  }
// Function to remove all elements
function removeElements() {
     // Set innerHTML of listContainer to empty string
    listContainer.innerHTML = "";
  }

const apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=100&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;

// Fetch data from API
fetch(apiUrl)
  .then(response => response.json())
  // Render characters
  .then(characters => console.log(characters.data.results));

  // Function to render characters
  function renderCharacters(characters) {
    // Clear cards container
    cardsContainer.innerHTML = "";
    // Loop through characters
    characters.forEach(character => {
      // Create a div element  
      const div = document.createElement('div');
      div.classList = 'card'
      // Create image element
      const image = document.createElement('img');
      image.classList = 'card-img'
      image.src = `${character.thumbnail.path}.${character.thumbnail.extension}`
      // Create a name element
      const name = document.createElement('h3');
      name.classList = 'character-name'
      name.innerText = `${character.name}`
      // Create a description element
      const description = document.createElement('p');
      description.classList = 'character-description'
      description.innerText = `${character.description}`
      // Append elements to page
      div.appendChild(image)
      div.appendChild(name)
      div.appendChild(description)
      cardsContainer.appendChild(div)
    });
  };

  // Add click eventlistener to button element
  button.addEventListener('click', () => {
    // Trim input value
    const searchTerm = input.value.trim();
    // If searchTerm is not empty construct API URL
    if (searchTerm) {
      const apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=${searchTerm}&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
      // Fetch from API
      fetch(apiUrl)
        .then(response => response.json())
        .then(characters => {
          // If no results then display message
          if (characters.data.total === 0) {
            displayWords('No results found');
          } else {
            renderCharacters(characters.data.results);
          }
        })
        // Catch errors
        .catch(error => console.error(error));
    } else {
      // Display message
      displayWords('Please enter a character name');
    }
  });