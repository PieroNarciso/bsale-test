import './style.css';
import { getCategories, getProducts } from './src/api';

const constructInitialDropdownMenu = () => {
  const categoryListElement = document.querySelector('#category-list');
  getCategories().then((categories) => {
    categoryListElement.innerHTML = `
          ${categories
            .map(
              (category) =>
                `<li><a class="dropdown-item" href="#">${category.name.toUpperCase()}</a></li>`
            )
            .join('')}
      `;
  });
};

const showProductCards = () => {
  const containerElement = document.querySelector('#container-products');
  getProducts().then((products) => {
    containerElement.innerHTML = `
        ${products.map(
          (product) => (
            `<div class="card" style="width: 18rem;">
              <img src="${product.url_image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name.toUpperCase()}</h5>
              </div>
              <div class="card-footer">
                <span class="">$ ${product.price.toFixed(2)}</span>
                <button>
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </i>
                </button>
              </div>
            </div>
          `
        )).join('')}
      `;
  });
};

window.document.addEventListener('DOMContentLoaded', () => {
  // constructInitialDropdownMenu();
  // showProductCards();
});