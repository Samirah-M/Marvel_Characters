let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
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

input.addEventListener("input", async () => {
  removeElements();
  if (input.value.length < 4) {
    return;
  }

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data.results.forEach((result) => {
    const name = result.name;
    const div = createAutocompleteItem(name);
    listContainer.appendChild(div);
  });
});

button.addEventListener("click", async () => {
  if (input.value.trim().length < 1) {
    alert("Input cannot be blank");
    return;
  }

  showContainer.innerHTML = "";
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data.results.forEach((character) => {
    showContainer.innerHTML = createCharacterCard(character);
  });
});

function createAutocompleteItem(name) {
  const div = document.createElement("div");
  div.style.cursor = "pointer";
  div.classList.add("autocomplete");
  div.setAttribute("onclick", `displayWords('${name}')`);

  const word = createWordElement(name);
  div.appendChild(word);

  return div;
}

function createWordElement(name) {
  const wordLength = input.value.length;
  const word = document.createElement("p");
  word.classList.add("item");
  word.innerHTML = `<b>${name.substr(0, wordLength)}</b>${name.substr(wordLength)}`;

  return word;
}

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

window.onload = () => {
  button.click();
};