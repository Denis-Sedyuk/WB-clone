function render(products) {
  let container = document.querySelector(".products");
  container.innerHTML = "";
  for (let product in products) {
    container.innerHTML += `
          <div class="products__cart" data-id="${products[product].id}">
            <div class="products__photo">
              <img
                   src="${products[product].image}"
                   alt="clothes"
                   class="photo"
              />
              <div class="overlay">
                <button class="overlay__viewing">Быстрый просмотр</button>
                <span class="overlay__discount">-10%</span>
                <button class="overlay__basket">+</button>
              </div>
              </div>
              <div class="products__info">
              <div class="products__price">
              <span class="products__price-new">${products[product].price}</span>
              <span class="products__price-old"><s>${products[product].prePrice}</s></span>
              </div>
              <p class="products__name">${products[product].name}</p>
            </div>
          </div>
      `;
  }
}

export { render };
