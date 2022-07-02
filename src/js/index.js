import {render} from "./ui.js"

async function getResponse() {
  let response = await fetch(
    "https://62b4de4cda3017eabb120a85.mockapi.io/Post"
  );
  let products = await response.json();
  products = products.splice(0, 12);
  
  render(products);
 
  let search = document.querySelector(".header__search");
  
  let searchProducts =  [];  
  
  search.addEventListener("keydown", (event) => {    
    if (search.value === "") return;
    if (event.code == "Enter"){
      searchProducts = products.filter(product => (product.name.includes(search.value))); 
      console.log(searchProducts);
      render(searchProducts);
      console.log(render(searchProducts));
    }
  }); 

  let container = document.querySelector(".products");
  
  let basket = document.querySelector(".modal__basket");
  
  container.addEventListener("click", (event) => {   
    let target = event.target;
    let cart = target.closest('.products__cart');
    if (target.className != "overlay__basket") return;    
    let overlay = target.closest(".overlay");
    overlay.style.display = "none";
    console.log(cart);
    basket.append(cart);
    }); 

  
  let showAll = document.querySelector(".bestseller");
  console.log(showAll);

  showAll.addEventListener("click", () => {    
    render(products);
  }
  );
}

getResponse();
