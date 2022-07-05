import { render } from "../../js/ui.js";
import { getResponse } from "../../js/api.js";
import ProductManagerBasket from "../../blocks/basket/basket.js";

export async function generateProducts() {
  let products = await getResponse();
  let container = document.querySelector(".products");
  let basket = document.querySelector(".modal__basket");

  ProductManagerBasket.summa(ProductManagerBasket.products);

  render(container, products);
  render(basket, ProductManagerBasket.products, "overlay__basket_change");

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
    ProductManagerBasket.add(id, link, name, price, prePrice);
    ProductManagerBasket.saveToLocalStorage();
    ProductManagerBasket.summa(ProductManagerBasket.products);
    render(container, products);
    render(basket, ProductManagerBasket.products, "overlay__basket_change");
  });

  let containerBasket = document.querySelector(".modal");

  containerBasket.addEventListener("click", (event) => {
    let target = event.target;
    let cart = target.closest(".products__cart");
    let index = cart.getAttribute("data-index");

    if (target.className != "overlay__basket_change") return;
    ProductManagerBasket.delete(index);
    ProductManagerBasket.summa(ProductManagerBasket.products);
    render(container, products);
    render(basket, ProductManagerBasket.products, "overlay__basket_change");
  });

  let showAll = document.querySelector(".bestseller");

  showAll.addEventListener("click", () => {
    render(container, products);
  });
}
