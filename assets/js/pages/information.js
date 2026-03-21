import {
  DEFAULT_LANG,
  applyI18n,
  bindLanguageSwitcher,
  setPageMeta
} from "../core/i18n.js";
import { renderInformationPage } from "../components/information.js";

const reasonsList = document.getElementById("reasons-list");
const downsidesList = document.getElementById("downsides-list");
const technologyArticle = document.getElementById("technology-article");
const forumsList = document.getElementById("forums-list");

function updateInformationPage(lang) {
  const activeLang = applyI18n(lang);
  setPageMeta("information", activeLang);

  renderInformationPage({
    lang: activeLang,
    reasonsContainer: reasonsList,
    downsidesContainer: downsidesList,
    featuredArticleContainer: technologyArticle,
    forumsContainer: forumsList
  });
}

const initialLang = bindLanguageSwitcher(updateInformationPage, DEFAULT_LANG);
updateInformationPage(initialLang);
