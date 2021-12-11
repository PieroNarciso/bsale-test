import './style.css';
import { getCategories, getProducts } from './src/api';

const constructDropdownMenu = () => {
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

const showProductCards = (query = '', categoryId = null) => {
  const containerElement = document.querySelector('#container-products');
  getProducts(query, categoryId).then((products) => {
    containerElement.innerHTML = `
        ${products.length > 0 ? products
          .map(
            (product) =>
              `<div class="card bordered shadow max-w-xs">
                <figure class="aspect-square w-32">
                  <img class="object-contain" src="${
                    product.url_image ? product.url_image : '/no-image.png'
                  }" class="card-img-top" alt="${product.name}">
                </figure>
                <div class="card-body p-4">
                  <h5 class="card-title">${product.name.toUpperCase()}</h5>
                  <div class="border-t-2"></div>
                  <div class="card-actions flex justify-between items-center">
                    <span class="text-lg text-gray-700">$ ${product.price.toFixed(
                      2
                    )}</span>
                    <button class="btn btn-circle shadow">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
          `
          )
          .join('') : '<p class="text-center mx-auto text-gray-700">No se encontraron productos</p>'}
      `;
  });
};

const onSearch = () => {
  const searchInputElement = document.querySelector('#search-input');
  const selectInputElement = document.querySelector('#category-list');

  if (selectInputElement.value === 'all') {
    showProductCards(searchInputElement.value);
  } else {
    showProductCards(searchInputElement.value, selectInputElement.value);
  }
};

window.document.addEventListener('DOMContentLoaded', () => {
  constructDropdownMenu();

  document.querySelector('#category-list').addEventListener('change', onSearch);
  document.querySelector('#search-input').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') onSearch();
  });
  document.querySelector('#search-btn').addEventListener('click', onSearch);
  showProductCards();
});
