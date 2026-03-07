import {
  DEFAULT_LANG,
  applyI18n,
  bindLanguageSwitcher,
  setPageMeta
} from "../core/i18n.js";
import { renderServices } from "../components/services.js";

const servicesList = document.getElementById("services-list");

function updateHomePage(lang) {
  const activeLang = applyI18n(lang);
  setPageMeta("home", activeLang);
  renderServices(servicesList, activeLang);
}

const initialLang = bindLanguageSwitcher(updateHomePage, DEFAULT_LANG);
updateHomePage(initialLang);
