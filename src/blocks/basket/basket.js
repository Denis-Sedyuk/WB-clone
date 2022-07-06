const json = localStorage.getItem("products") || "[]";
const products = JSON.parse(json);

const btn = document.getElementById("myBtn");
const modal = document.getElementById("myModal");

const ProductManagerBasket = {
  products: products,
  generateModalContent() {
    modal.innerHTML = `
    <div class="modal__content">
      <h2>Корзина товаров</h2>
      <div id="cart_content"></div>
      <p class="summa">Итого:</p>
      <button id="clear_cart">Очистить корзину</button>
      <div class="modal__basket"></div>
    </div>`;
    btn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    const clear = document.getElementById("clear_cart");

    clear.addEventListener("click", () => {
      let cartCont = document.getElementById("cart_content");
      let basket = document.querySelector(".modal__basket");
      let result = document.querySelector(".summa");
      localStorage.clear();
      ProductManagerBasket.products = [];
      basket.innerHTML = "";
      result.innerHTML = "";
      cartCont.innerHTML = "Корзина очищена.";
    });
  },

  add(id, link, name, price, prePrice) {
    let product = {
      index: this.products.length + 1,
      id: id,
      image: link,
      name: name,
      price: price,
      prePrice: prePrice,
    };

    this.products.push(product);
    this.saveToLocalStorage();
  },

  delete(currentIndex) {
    this.products = this.products.filter(
      (product) => +currentIndex !== product.index
    );
    this.saveToLocalStorage();
  },

  saveToLocalStorage() {
    const json = JSON.stringify(this.products);
    localStorage.setItem("products", json);
  },

  summa(products) {
    let sum = 0;
    for (let product of products) {
      sum += +product.price;
    }

    let result = document.querySelector(".summa");
    result.innerHTML = `<h2>Общая сумма покупок:${sum}</h2>`;
  },
};

export default ProductManagerBasket;
