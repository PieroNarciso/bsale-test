import './style.css';
import state from './src/state';
import { getCategories, getProducts } from './src/api';

const constructDropdownCategoryList = () => {
  const categoryListElement = document.querySelector('#category-list');
  getCategories().then((categories) => {
    categories.forEach((category) => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', category.id);
      optionElement.textContent = category.name.toUpperCase();
      categoryListElement.appendChild(optionElement);
    });
  });
};

const showDiscountIfExists = (product) => {
  const newPrice = product.price - (product.price * product.discount) / 100;
  const result =
    product.discount > 0
      ? `
      <span class="text-sm text-gray-500 line-through">$ ${product.price.toFixed(
        2
      )}</span>
      <span class="text-lg text-gray-700">$ ${newPrice.toFixed(2)}</span>
    `
      : `<span class="text-lg text-gray-700">$ ${product.price.toFixed(
          2
        )}</span>`;

  return result;
};

const showProductCards = (products) => {
  const containerElement = document.querySelector('#container-products');
  containerElement.innerHTML = '';
  if (products.length > 0) {
    products.forEach((product) => {
      const divElement = document.createElement('div');
      divElement.className = 'card bordered shadow max-w-xs';
      divElement.innerHTML = `<figure class="aspect-square w-32">
                  <img class="object-contain" src="${
                    product.url_image ? product.url_image : '/no-image.png'
                  }" class="card-img-top" alt="${product.name}">
                </figure>
                <div class="card-body p-4">
                  <h5 class="card-title">${product.name.toUpperCase()}</h5>
                  <div class="border-t-2"></div>
                  <div class="card-actions flex justify-between items-center">
                  <div class="flex flex-col">
                    ${showDiscountIfExists(product)}
                  </div>
                    <button class="btn btn-circle shadow btn-cart">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                `;
      divElement
        .querySelector('.btn-cart')
        .addEventListener('click', () => state.addProduct(product));
      containerElement.appendChild(divElement);
    });
  } else {
    containerElement.innerHTML =
      '<p class="text-center mx-auto text-gray-700">No se encontraron productos</p>';
  }
};

const onSearch = async () => {
  const searchInputElement = document.querySelector('#search-input');
  const selectInputElement = document.querySelector('#category-list');

  let products = [];

  if (selectInputElement.value === 'all') {
    products = await getProducts(searchInputElement.value);
  } else {
    products = await getProducts(
      searchInputElement.value,
      selectInputElement.value
    );
  }
  showProductCards(products);
};

window.document.addEventListener('DOMContentLoaded', () => {
  constructDropdownCategoryList();

  document.querySelector('#category-list').addEventListener('change', onSearch);
  document.querySelector('#search-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') onSearch();
  });
  document.querySelector('#search-btn').addEventListener('click', onSearch);
  getProducts().then((products) => showProductCards(products));
});
