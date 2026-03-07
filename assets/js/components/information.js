import { INFORMATION_CONTENT } from "../data/information-content.js";

function renderTextCards(container, items, lang) {
  if (!container) {
    return;
  }

  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "info-card";

    const title = document.createElement("h3");
    title.className = "info-card-title";
    title.textContent = item.title[lang] || item.title.az;

    const description = document.createElement("p");
    description.className = "info-card-description";
    description.textContent = item.description[lang] || item.description.az;

    card.appendChild(title);
    card.appendChild(description);
    container.appendChild(card);
  });
}

function renderForums(container, lang) {
  if (!container) {
    return;
  }

  container.innerHTML = "";
  INFORMATION_CONTENT.forums.forEach((item) => {
    const card = document.createElement("article");
    card.className = "forum-card";

    const tag = document.createElement("span");
    tag.className = "forum-tag";
    tag.textContent = item.tag;

    const title = document.createElement("h3");
    title.className = "forum-title";
    title.textContent = item.title[lang] || item.title.az;

    const description = document.createElement("p");
    description.className = "forum-description";
    description.textContent = item.description[lang] || item.description.az;

    card.appendChild(tag);
    card.appendChild(title);
    card.appendChild(description);
    container.appendChild(card);
  });
}

function renderInformationPage(options) {
  const { lang, reasonsContainer, downsidesContainer, forumsContainer } = options;
  renderTextCards(reasonsContainer, INFORMATION_CONTENT.reasons, lang);
  renderTextCards(downsidesContainer, INFORMATION_CONTENT.downsides, lang);
  renderForums(forumsContainer, lang);
}

export { renderInformationPage };
