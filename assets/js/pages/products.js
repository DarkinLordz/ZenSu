import {
  DEFAULT_LANG,
  applyI18n,
  bindLanguageSwitcher,
  setPageMeta
} from "../core/i18n.js";
import { renderProductCatalog } from "../components/products.js";

const productsList = document.getElementById("products-list");
const filterContainer = document.getElementById("products-filter");

const state = {
  lang: DEFAULT_LANG,
  activeCategory: "all"
};

function rerenderProducts() {
  const activeLang = applyI18n(state.lang);
  setPageMeta("products", activeLang);

  renderProductCatalog({
    listContainer: productsList,
    filterContainer,
    lang: activeLang,
    activeCategory: state.activeCategory,
    onCategoryChange: function (category) {
      state.activeCategory = category;
      rerenderProducts();
    }
  });
}

function onLanguageChange(lang) {
  state.lang = lang;
  rerenderProducts();
}

const initialLang = bindLanguageSwitcher(onLanguageChange, DEFAULT_LANG);
state.lang = initialLang;
rerenderProducts();
