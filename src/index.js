let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let listContainer = document.querySelector(".list");
let showContainer = document.getElementById("show-container");
let cardsContainer = document.getElementById("cards-container");

let date = new Date();
console.log(date.getTime());
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
    input.value = value;
    removeElements();
  }

function removeElements() {
    listContainer.innerHTML = "";
  }

var apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=100&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(characters => console.log(characters.data.results));

  function renderCharacters(characters) {
    cardsContainer.innerHTML = "";
    characters.forEach(character => { 
      const div = document.createElement('div');
      const image = document.createElement('img');
      const name = document.createElement('h3');
      const description = document.createElement('p');
      const comics = document.createElement('p');
      const like = document.createElement('button');
      div.classList = 'card'
      image.classList = 'card-img'
      like.classList = 'empty'
      image.src = `${character.thumbnail.path}.${character.thumbnail.extension}`
      name.innerText = `${character.name}`
      description.innerText = `${character.description}`
      like.textContent = 'like'
      div.appendChild(image)
      div.appendChild(name)
      div.appendChild(description)
      div.appendChild(like)
      cardsContainer.appendChild(div)
    });
  };

  button.addEventListener('click', () => {
    const searchTerm = input.value.trim();
    if (searchTerm) {
      const apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=${searchTerm}&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.data.total === 0) {
            displayWords('No results found');
          } else {
            renderCharacters(data.data.results);
          }
        })
        .catch(error => console.error(error));
    } else {
      displayWords('Please enter a character name');
    }
  });