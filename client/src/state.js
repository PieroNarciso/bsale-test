class State {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
    const countIndicatorElement = document.querySelector('#count-indicator');
    if (this.products.length > 0) {
      countIndicatorElement.classList.remove('hidden');
      countIndicatorElement.innerHTML = this.products.length;
    } else {
      countIndicatorElement.classList.add('hidden');
      countIndicatorElement.innerHTML = '';
    }
  }
}

const state = new State();
export default state;
