const breeds = ["beagle", "bulldog", "dalmatian", "husky", "labrador"];
const container = document.getElementById("wikicontaineri");
async function fetchimage(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const data = await response.json();
  return data.message;
}
async function fetchtext(breed) {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`);
    const data = await response.json();
    return data.extract || "No description";
  } catch {
    return "No description";
  }
}
async function createWikiItem(breed) {
  const wikiItem = document.createElement("div");
  wikiItem.className = "Itemi";
  const header = document.createElement("h1");
  header.className = "headeriItemii";
  header.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
  const content = document.createElement("div");
  content.className = "Iteminsisalto";
  const text = document.createElement("p");
  text.className = "Iteminteksti";
  text.textContent = await fetchtext(breed);
  const imgContainer = document.createElement("div");
  imgContainer.className = "imgcontaineri";
  const img = document.createElement("img");
  img.className = "ItemiImg";
  img.src = await fetchimage(breed);
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
