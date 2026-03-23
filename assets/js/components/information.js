import { INFORMATION_CONTENT } from "../data/information-content.js";

let imageLightbox;
let imageLightboxImage;
let imageLightboxCaption;
let imageLightboxClose;
let imageLightboxHideTimer;
let imageLightboxTrigger;

function pickLocalizedValue(value, lang) {
  if (typeof value === "string") {
    return value;
  }

  return value?.[lang] || value?.az || "";
}

function pickLocalizedItems(value, lang) {
  const localizedValue = pickLocalizedValue(value, lang);
  return Array.isArray(localizedValue) ? localizedValue : [];
}

function handleLightboxKeydown(event) {
  if (event.key === "Escape" && imageLightbox && !imageLightbox.hidden) {
    closeImageLightbox();
  }
}

function ensureImageLightbox() {
  if (imageLightbox) {
    return;
  }

  imageLightbox = document.createElement("div");
  imageLightbox.className = "image-lightbox";
  imageLightbox.hidden = true;
  imageLightbox.setAttribute("role", "dialog");
  imageLightbox.setAttribute("aria-modal", "true");
  imageLightbox.setAttribute("aria-hidden", "true");

  const shell = document.createElement("div");
  shell.className = "image-lightbox-shell";

  imageLightboxClose = document.createElement("button");
  imageLightboxClose.type = "button";
  imageLightboxClose.className = "image-lightbox-close";
  imageLightboxClose.addEventListener("click", closeImageLightbox);

  imageLightboxImage = document.createElement("img");
  imageLightboxImage.className = "image-lightbox-image";
  imageLightboxImage.decoding = "async";

  imageLightboxCaption = document.createElement("p");
  imageLightboxCaption.className = "image-lightbox-caption";

  shell.appendChild(imageLightboxClose);
  shell.appendChild(imageLightboxImage);
  shell.appendChild(imageLightboxCaption);
  imageLightbox.appendChild(shell);

  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) {
      closeImageLightbox();
    }
  });

  document.addEventListener("keydown", handleLightboxKeydown);
  document.body.appendChild(imageLightbox);
}

function openImageLightbox(options) {
  ensureImageLightbox();

  const { src, alt, caption, width, height, closeLabel, trigger } = options;

  window.clearTimeout(imageLightboxHideTimer);
  imageLightboxTrigger = trigger || document.activeElement;

  imageLightboxImage.src = src;
  imageLightboxImage.alt = alt;
  imageLightboxImage.width = width;
  imageLightboxImage.height = height;
  imageLightboxCaption.textContent = caption;
  imageLightboxClose.textContent = closeLabel;
  imageLightboxClose.setAttribute("aria-label", closeLabel);

  imageLightbox.hidden = false;
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");

  requestAnimationFrame(() => {
    imageLightbox.classList.add("is-open");
  });

  imageLightboxClose.focus();
}

function closeImageLightbox(immediate = false) {
  if (!imageLightbox || imageLightbox.hidden) {
    return;
  }

  const restoreFocusTarget = imageLightboxTrigger;

  imageLightbox.classList.remove("is-open");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  imageLightboxTrigger = null;

  const hide = () => {
    imageLightbox.hidden = true;
  };

  if (immediate) {
    window.clearTimeout(imageLightboxHideTimer);
    hide();
  } else {
    window.clearTimeout(imageLightboxHideTimer);
    imageLightboxHideTimer = window.setTimeout(hide, 180);
  }

  if (restoreFocusTarget instanceof HTMLElement && restoreFocusTarget.isConnected) {
    restoreFocusTarget.focus();
  }
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
  const highlights = pickLocalizedItems(article.highlights, lang);
  const sections = pickLocalizedItems(article.sections, lang);
  const viewLabel = pickLocalizedValue(article.viewLabel, lang);
  const closeLabel = pickLocalizedValue(article.closeLabel, lang);
  const zoomHint = pickLocalizedValue(article.zoomHint, lang);
  const figureAlt = pickLocalizedValue(article.figure.alt, lang);
  const figureCaption = pickLocalizedValue(article.figure.caption, lang);
  container.innerHTML = "";
  closeImageLightbox(true);

  const wrapper = document.createElement("div");
  wrapper.className = "feature-article";

  const header = document.createElement("div");
  header.className = "feature-article-header";

  const title = document.createElement("h2");
  title.className = "section-title feature-article-title";
  title.textContent = pickLocalizedValue(article.title, lang);

  const intro = document.createElement("p");
  intro.className = "feature-article-intro";
  intro.textContent = pickLocalizedValue(article.intro, lang);

  header.appendChild(title);
  header.appendChild(intro);

  const highlightGrid = document.createElement("div");
  highlightGrid.className = "article-highlights";

  highlights.forEach((item) => {
    const card = document.createElement("article");
    card.className = "article-highlight";

    const value = document.createElement("strong");
    value.className = "article-highlight-value";
    value.textContent = item.value;

    const label = document.createElement("p");
    label.className = "article-highlight-label";
    label.textContent = item.label;

    card.appendChild(value);
    card.appendChild(label);
    highlightGrid.appendChild(card);
  });

  const contentGrid = document.createElement("div");
  contentGrid.className = "feature-article-content";

  const body = document.createElement("div");
  body.className = "feature-article-body";

  sections.forEach((section) => {
    const sectionNode = document.createElement("section");
    sectionNode.className = "article-section";

    const heading = document.createElement("h3");
    heading.className = "article-section-title";
    heading.textContent = section.heading;

    sectionNode.appendChild(heading);

    section.paragraphs.forEach((content) => {
      const paragraph = document.createElement("p");
      paragraph.className = "feature-article-text";
      paragraph.textContent = content;
      sectionNode.appendChild(paragraph);
    });

    body.appendChild(sectionNode);
  });

  const actions = document.createElement("div");
  actions.className = "feature-article-actions";

  const jumpLink = document.createElement("a");
  jumpLink.className = "btn btn-primary";
  jumpLink.href = `#${article.figure.id}`;
  jumpLink.textContent = pickLocalizedValue(article.jumpLabel, lang);

  const viewButton = document.createElement("button");
  viewButton.type = "button";
  viewButton.className = "btn btn-light article-view-button";
  viewButton.textContent = viewLabel;
  viewButton.addEventListener("click", () => {
    openImageLightbox({
      src: article.figure.src,
      alt: figureAlt,
      caption: figureCaption,
      width: article.figure.width,
      height: article.figure.height,
      closeLabel,
      trigger: viewButton
    });
  });

  actions.appendChild(jumpLink);
  actions.appendChild(viewButton);

  const side = document.createElement("aside");
  side.className = "feature-article-side";

  const figure = document.createElement("figure");
  figure.className = "article-figure";
  figure.id = article.figure.id;

  const imageButton = document.createElement("button");
  imageButton.type = "button";
  imageButton.className = "article-image-button";
  imageButton.setAttribute("aria-label", viewLabel);
  imageButton.title = viewLabel;
  imageButton.addEventListener("click", () => {
    openImageLightbox({
      src: article.figure.src,
      alt: figureAlt,
      caption: figureCaption,
      width: article.figure.width,
      height: article.figure.height,
      closeLabel,
      trigger: imageButton
    });
  });

  const image = document.createElement("img");
  image.className = "article-image";
  image.src = article.figure.src;
  image.alt = figureAlt;
  image.loading = "lazy";
  image.decoding = "async";
  image.width = article.figure.width;
  image.height = article.figure.height;

  const imageHint = document.createElement("span");
  imageHint.className = "article-image-hint";
  imageHint.textContent = zoomHint;

  const caption = document.createElement("figcaption");
  caption.className = "article-caption";
  caption.textContent = figureCaption;

  imageButton.appendChild(image);
  imageButton.appendChild(imageHint);
  figure.appendChild(imageButton);
  figure.appendChild(caption);

  side.appendChild(actions);
  side.appendChild(figure);

  const note = document.createElement("aside");
  note.className = "article-note";

  const noteTitle = document.createElement("h3");
  noteTitle.className = "article-note-title";
  noteTitle.textContent = pickLocalizedValue(article.noteTitle, lang);

  const noteText = document.createElement("p");
  noteText.className = "article-note-text";
  noteText.textContent = pickLocalizedValue(article.note, lang);

  note.appendChild(noteTitle);
  note.appendChild(noteText);

  contentGrid.appendChild(body);
  contentGrid.appendChild(side);

  wrapper.appendChild(header);
  wrapper.appendChild(highlightGrid);
  wrapper.appendChild(contentGrid);
  wrapper.appendChild(note);
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
