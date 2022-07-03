import ProductManager from "../blocks/basket/basket.js";
import {render} from "./ui.js";


async function getResponse() {
  let container = document.querySelector(".products");
  console.log(container);

  let response = await fetch(
    "https://62b4de4cda3017eabb120a85.mockapi.io/Post"
  );
  let products = await response.json();

  let basket = document.querySelector(".modal__basket");
  products = products.splice(0, 12);  
  
  
  function summa(products) {
    let sum = 0;
    for(let product of products){
      sum+= +product.price;
    }

    let result = document.querySelector(".summa");
    result.innerHTML = `<h2>Общая сумма покупок:${sum}</h2>`;    
  }

  summa(ProductManager.products);

  render(container, products);  
  render(basket, ProductManager.products, "false");

  let search = document.querySelector(".header__search");
  let searchProducts =  []; 

  search.addEventListener("keydown", (event) => {    
    if (search.value === "") return;
    if (event.code == "Enter"){
      searchProducts = products.filter(product => (product.name.includes(search.value))); 
      render(container, searchProducts);
    }
  }); 
    
  container.addEventListener("click", (event) => {   
    let target = event.target;
    let cart = target.closest(".products__cart");
    let id = cart.getAttribute("data-id")
    let img = cart.querySelector(".photo");
    let link = img.getAttribute("src");
    let name = cart.getAttribute("data-name");
    let price = cart.getAttribute("data-price");
    let prePrice = cart.getAttribute("data-prePrice");
    
    if (target.className != "overlay__basket") return;    
    basket.append(cart);
    
    ProductManager.add(id, link, name, price, prePrice);
    ProductManager.saveToLocalStorage();
    summa(ProductManager.products);
  }); 
  
  let showAll = document.querySelector(".bestseller");
  
  showAll.addEventListener("click", () => {    
    render(container, products);

  }
  );
}

getResponse();

ProductManager.generateModalContent();

