import { INFORMATION_CONTENT } from "../data/information-content.js";

function pickLocalizedValue(value, lang) {
  if (typeof value === "string") {
    return value;
  }

  return value?.[lang] || value?.az || "";
}

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
    title.textContent = pickLocalizedValue(item.title, lang);

    const description = document.createElement("p");
    description.className = "info-card-description";
    description.textContent = pickLocalizedValue(item.description, lang);

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
    title.textContent = pickLocalizedValue(item.title, lang);

    const description = document.createElement("p");
    description.className = "forum-description";
    description.textContent = pickLocalizedValue(item.description, lang);

    card.appendChild(tag);
    card.appendChild(title);
    card.appendChild(description);
    container.appendChild(card);
  });
}

function renderFeaturedArticle(container, lang) {
  if (!container) {
    return;
  }

  const article = INFORMATION_CONTENT.featuredArticle;
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "feature-article";

  const title = document.createElement("h2");
  title.className = "section-title";
  title.textContent = pickLocalizedValue(article.title, lang);

  const paragraph = document.createElement("p");
  paragraph.className = "section-sub info-sub feature-article-text";
  paragraph.textContent = pickLocalizedValue(article.body, lang);

  const actions = document.createElement("div");
  actions.className = "feature-article-actions";

  const jumpLink = document.createElement("a");
  jumpLink.className = "btn btn-primary";
  jumpLink.href = `#${article.figure.id}`;
  jumpLink.textContent = pickLocalizedValue(article.jumpLabel, lang);

  actions.appendChild(jumpLink);

  const figure = document.createElement("figure");
  figure.className = "article-figure";
  figure.id = article.figure.id;

  const image = document.createElement("img");
  image.className = "article-image";
  image.src = article.figure.src;
  image.alt = pickLocalizedValue(article.figure.alt, lang);
  image.loading = "lazy";
  image.decoding = "async";
  image.width = article.figure.width;
  image.height = article.figure.height;

  const caption = document.createElement("figcaption");
  caption.className = "article-caption";
  caption.textContent = pickLocalizedValue(article.figure.caption, lang);

  figure.appendChild(image);
  figure.appendChild(caption);

  wrapper.appendChild(title);
  wrapper.appendChild(paragraph);
  wrapper.appendChild(actions);
  wrapper.appendChild(figure);
  container.appendChild(wrapper);
}

function renderInformationPage(options) {
  const {
    lang,
    reasonsContainer,
    downsidesContainer,
    featuredArticleContainer,
    forumsContainer
  } = options;
  renderTextCards(reasonsContainer, INFORMATION_CONTENT.reasons, lang);
  renderTextCards(downsidesContainer, INFORMATION_CONTENT.downsides, lang);
  renderFeaturedArticle(featuredArticleContainer, lang);
  renderForums(forumsContainer, lang);
}

export { renderInformationPage };
