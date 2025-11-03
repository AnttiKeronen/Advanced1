const breeds = ["beagle", "bulldog", "dalmatian", "husky", "labrador"];
const container = document.getElementById("wiki-container");
async function fetchDogImage(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const data = await response.json();
  return data.message;
}
async function fetchWikiText(breed) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`);
    const data = await response.json();
    return data.extract || "Nothing";
  } catch {
    return "Nothing";
  }
}
async function createWikiItem(breed) {
  const wikiItem = document.createElement("div");
  wikiItem.className = "wiki-item";
  const header = document.createElement("h1");
  header.className = "wiki-header";
  header.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
  const content = document.createElement("div");
  content.className = "wiki-content";
  const text = document.createElement("p");
  text.className = "wiki-text";
  text.textContent = await fetchWikiText(breed);
  const imgContainer = document.createElement("div");
  imgContainer.className = "img-container";
  const img = document.createElement("img");
  img.className = "wiki-img";
  img.src = await fetchDogImage(breed);
  img.alt = breed;
  imgContainer.appendChild(img);
  content.appendChild(text);
  content.appendChild(imgContainer);
  wikiItem.appendChild(header);
  wikiItem.appendChild(content);
  container.appendChild(wikiItem);
}
async function init() {
  for (const breed of breeds) {
    await createWikiItem(breed);
  }
}
init();

