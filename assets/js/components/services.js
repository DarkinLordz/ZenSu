import { SERVICE_CATALOG } from "../data/catalog.js";

function renderServices(container, lang) {
  if (!container) {
    return;
  }

  container.innerHTML = "";
  SERVICE_CATALOG.forEach((service) => {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h3");
    title.textContent = service.title[lang] || service.title.az;

    const description = document.createElement("p");
    description.textContent = service.description[lang] || service.description.az;

    card.appendChild(title);
    card.appendChild(description);
    container.appendChild(card);
  });
}

export { renderServices };
