import { SITE_CONTENT } from "../data/site-content.js";

const DEFAULT_LANG = "az";

function getByPath(source, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, source);
}

function resolveLanguage(lang) {
  if (SITE_CONTENT[lang]) {
    return lang;
  }
  return DEFAULT_LANG;
}

function applyI18n(lang) {
  const selectedLang = resolveLanguage(lang);
  const dict = SITE_CONTENT[selectedLang];

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const value = getByPath(dict, key);
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.documentElement.lang = selectedLang;
  return selectedLang;
}

function updateLanguageButtons(activeLang) {
  document.querySelectorAll(".lang-switcher button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === activeLang);
  });
}

function bindLanguageSwitcher(onChange, initialLang = DEFAULT_LANG) {
  const selectedLang = resolveLanguage(initialLang);
  updateLanguageButtons(selectedLang);

  document.querySelectorAll(".lang-switcher button").forEach((button) => {
    button.addEventListener("click", function () {
      const nextLang = resolveLanguage(button.dataset.lang);
      updateLanguageButtons(nextLang);
      onChange(nextLang);
    });
  });

  return selectedLang;
}

function setPageMeta(metaKey, lang) {
  const selectedLang = resolveLanguage(lang);
  const meta = SITE_CONTENT[selectedLang].meta;
  const titleKey = `${metaKey}Title`;
  const descriptionKey = `${metaKey}Description`;

  if (meta[titleKey]) {
    document.title = meta[titleKey];
  }

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta && meta[descriptionKey]) {
    descriptionMeta.setAttribute("content", meta[descriptionKey]);
  }
}

export {
  DEFAULT_LANG,
  SITE_CONTENT,
  applyI18n,
  bindLanguageSwitcher,
  resolveLanguage,
  setPageMeta
};
