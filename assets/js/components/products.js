import { PRODUCT_CATALOG } from "../data/catalog.js";
import { SITE_CONTENT } from "../data/site-content.js";

function createFilterButton(category, label, activeCategory, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "filter-btn";
  button.textContent = label;
  button.classList.toggle("active", category === activeCategory);
  button.addEventListener("click", function () {
    onClick(category);
  });
  return button;
}

function renderProductCard(product, lang) {
  const card = document.createElement("article");
  card.className = "product-card";

  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image;
  image.alt = product.title[lang] || product.title.az;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "product-body";

  const badge = document.createElement("span");
  badge.className = "product-code";
  badge.textContent = product.id;

  const title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.title[lang] || product.title.az;

  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description[lang] || product.description.az;

  const footer = document.createElement("div");
  footer.className = "product-footer";

  const price = document.createElement("strong");
  price.className = "product-price";
  price.textContent = product.price;

  const orderLink = document.createElement("a");
  orderLink.className = "btn btn-light";
  orderLink.href = "mailto:zensuazerbaijan@gmail.com";
  orderLink.textContent = SITE_CONTENT[lang].common.orderBtn;

  footer.appendChild(price);
  footer.appendChild(orderLink);

  body.appendChild(badge);
  body.appendChild(title);
  body.appendChild(description);
  body.appendChild(footer);

  card.appendChild(image);
  card.appendChild(body);

  return card;
}

function renderProductCatalog(options) {
  const {
    listContainer,
    filterContainer,
    lang,
    activeCategory,
    onCategoryChange
  } = options;

  if (!listContainer || !filterContainer) {
    return;
  }

  const categories = SITE_CONTENT[lang].products.categories;
  const categoryOrder = ["all", "home", "office", "premium"];

  filterContainer.innerHTML = "";
  categoryOrder.forEach((category) => {
    filterContainer.appendChild(
      createFilterButton(
        category,
        categories[category],
        activeCategory,
        onCategoryChange
      )
    );
  });

  const visibleProducts = PRODUCT_CATALOG.filter((product) => {
    return activeCategory === "all" ? true : product.category === activeCategory;
  });

  listContainer.innerHTML = "";
  if (!visibleProducts.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = SITE_CONTENT[lang].products.emptyState;
    listContainer.appendChild(empty);
    return;
  }

  visibleProducts.forEach((product) => {
    listContainer.appendChild(renderProductCard(product, lang));
  });
}

export { renderProductCatalog };
