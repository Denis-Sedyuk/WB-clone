import ProductManager from "../blocks/basket/basket.js";
import { render } from "./ui.js";

async function getResponse() {
  let response = await fetch(
    "https://62b4de4cda3017eabb120a85.mockapi.io/Post"
  );
  let products = await response.json();
  products = products.splice(0, 12);

  let container = document.querySelector(".products");
  let basket = document.querySelector(".modal__basket");

  ProductManager.summa(ProductManager.products);

  render(container, products);
  render(basket, ProductManager.products, "overlay__basket_change");

  let search = document.querySelector(".header__search");
  let searchProducts = [];

  search.addEventListener("keydown", (event) => {
    if (search.value === "") return render(container, products);
    if (event.code == "Enter") {
      searchProducts = products.filter((product) =>
        product.name.includes(search.value)
      );
      render(container, searchProducts);
    }
  });

  container.addEventListener("click", (event) => {
    let target = event.target;
    let cart = target.closest(".products__cart");
    let id = cart.getAttribute("data-id");
    let img = cart.querySelector(".photo");
    let link = img.getAttribute("src");
    let name = cart.getAttribute("data-name");
    let price = cart.getAttribute("data-price");
    let prePrice = cart.getAttribute("data-prePrice");

    if (target.className != "overlay__basket") return;
    ProductManager.add(id, link, name, price, prePrice);
    ProductManager.saveToLocalStorage();
    ProductManager.summa(ProductManager.products);
    render(container, products);
    render(basket, ProductManager.products, "overlay__basket_change");
  });

  let containerBasket = document.querySelector(".modal");

  containerBasket.addEventListener("click", (event) => {
    let target = event.target;
    let cart = target.closest(".products__cart");
    let index = cart.getAttribute("data-index");

    if (target.className != "overlay__basket_change") return;
    ProductManager.delete(index);
    ProductManager.summa(ProductManager.products);
    render(container, products);
    render(basket, ProductManager.products, "overlay__basket_change");
  });

  let showAll = document.querySelector(".bestseller");

  showAll.addEventListener("click", () => {
    render(container, products);
  });
}

getResponse();

ProductManager.generateModalContent();
