let date = new Date();
console.log(date.getTime());
const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

var apiUrl = `https://gateway.marvel.com/v1/public/comics?&ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => console.log(data));