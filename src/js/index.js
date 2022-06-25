import { make } from "./utils.js";
let container = document.querySelector(".container"); 
console.log(container);
let cards;

function fetchCards() {
  return fetch("https://62b6b84a6999cce2e8068fa6.mockapi.io/cards").then((response) =>{
    return response.json();
  }).then(json => {return json});
}

fetchCards().then(json => {
  cards = json;
  renderCards(cards);
});

function renderCards(cards) {
   
  let products = make("div","products");
  console.log(container);
   
  for(let card of cards){
    let products__cart = make("div","products__cart");
    let products__photo = make("div", "products__photo");
    let overlay = make("div", "overlay");
    let overlay__viewing = make("button", "overlay__viewing");
    overlay__viewing.innerHTML = "Быстрый просмотр";
    let overlay__discount = make("button", "overlay__discount");
    overlay__discount.innerHTML = "-10%";
    let overlay__basket = make("button", "overlay__basket");
    overlay__basket.innerHTML = "+";
    let products__info = make("div", "products__info");
    let products__price = make("div", "products__price");
    let products__price_old = make("span", "products__price-old");
    let products__price_new = make("span", "products__price-new");
    products__price_old.style.textDecoration = "line-through";
    products__price_old.innerHTML = `${card.priceOld}`;
    products__price_new.innerHTML = `${card.priceNew}`;
    products__price.append(products__price_new, products__price_old);
    let products__name = make("p", "products__name");
    products__name.innerHTML = `${card.product}`;
    products__info.append(products__price, products__name); 

    products__photo.innerHTML = `<img src=https://loremflickr.com/320/240/product?random=${card.id} alt="clothes"
    class="photo"></img>`;
    overlay.append(overlay__viewing, overlay__discount, overlay__basket);
    products__cart.append(products__photo, overlay, products__info);
    products.append(products__cart);
  }

  container.append(products);
}