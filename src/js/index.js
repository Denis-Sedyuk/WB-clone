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

  let showAll = document.querySelector(".bestseller");

  showAll.addEventListener("click", () => {    
    render(products);
  }
  );
}

getResponse();
