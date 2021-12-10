import './style.css';
import { getCategories, getProducts } from './src/api';

const constructDropdownMenu = () => {
  const categoryListElement = document.querySelector('#category-list');
  getCategories().then((categories) => {
    categories.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', category.id);
      optionElement.textContent = category.name.toUpperCase();
      categoryListElement.appendChild(optionElement);
    })
  });
};



const showProductCards = (query = '', categoryId = null) => {
  const containerElement = document.querySelector('#container-products');
  getProducts(query, categoryId).then((products) => {
    containerElement.innerHTML = `
        ${products.map(
          (product) => (
            `<div class="card bordered shadow">
              <figure class="aspect-square">
                <img class="object-contain" src="${product.url_image}" class="card-img-top" alt="${product.name}">
              </figure>
              <div class="card-body">
                <h5 class="card-title">${product.name.toUpperCase()}</h5>
                <div class="border-t-2"></div>
                <div class="card-actions flex justify-between items-center">
                  <span class="text-lg text-gray-700">$ ${product.price.toFixed(2)}</span>
                  <button class="btn btn-circle shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `
        )).join('')}
      `;
  });
};

window.document.addEventListener('DOMContentLoaded', () => {
  constructDropdownMenu();
  document.querySelector('#category-list').addEventListener('change', (event) => {
    if (event.target.value === "all") {
      showProductCards();
    } else {
      showProductCards('', event.target.value);
    }
  });
  showProductCards();
});
