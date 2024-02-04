// Get references to the input box, submit button, and container for displaying characters
let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

// Get the current timestamp, API key, and hash value from the constants at the top
let date = new Date();
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

// Function to display the words in the input box
function displayWords(value) {
  input.value = value;
  removeElements();
}

// Function to remove all elements from the list container
function removeElements() {
  listContainer.innerHTML = "";
}

// Add an event listener to the input box that listens for input events
input.addEventListener("input", async () => {
  // If the input value is less than 4 characters, return early
  if (input.value.length < 4) {
    return;
  }

  // Construct the URL for the API request
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  // Make the API request
  const response = await fetch(url);
  const jsonData = await response.json();

  // Loop through the results and create a new div for each one
  jsonData.data.results.forEach((result) => {
    const name = result.name;
    const div = createAutocompleteItem(name);
    listContainer.appendChild(div);
  });
});

// Add an event listener to the submit button that listens for click events
button.addEventListener("click", async () => {
  // If the input value is blank, show an alert and return early
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
    return;
  }

  // Clear the show container
  showContainer.innerHTML = "";

  // Construct the URL for the API request
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

  // Make the API request
  const response = await fetch(url);
  const jsonData = await response.json();

  // Loop through the results and create a new character card for each one
  jsonData.data.results.forEach((character) => {
    showContainer.innerHTML = createCharacterCard(character);
  });
});

// Function to create a new div for an autocomplete item
function createAutocompleteItem(name) {
  const div = document.createElement("div");
  div.style.cursor = "pointer";
  div.classList.add("autocomplete");
  div.setAttribute("onclick", `displayWords('${name}')`);

  // Create a new p element for the word
  const word = createWordElement(name);
  div.appendChild(word);

  return div;
}

// Function to create a new p element for a word
function createWordElement(name) {
  const wordLength = input.value.length;
  const word = document.createElement("p");
  word.classList.add("item");

  // Highlight the portion of the word that matches the input value
  word.innerHTML = `<b>${name.substr(0, wordLength)}</b>${name.substr(wordLength)}`;

  return word;
}

// Function to create a new character card
function createCharacterCard(character) {
  return `
    <div class="card-container">
      <div class="character-image">
        <img src="${character.thumbnail.path}.${character.thumbnail.extension}"/>
      </div>
      <div class="character-name">${character.name}</div>
      <div class="character-description">${character.description}</div>
    </div>
  `;
}

// When the window loads, simulate a click on the submit button
window.onload = () => {
  button.click();
};