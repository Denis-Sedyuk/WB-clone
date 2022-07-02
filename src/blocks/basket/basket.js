const btn = document.getElementById("myBtn");
const modal = document.getElementById("myModal");
modal.innerHTML = `
<div class="modal__content">
<h2>Корзина товаров</h2>
<div id="cart_content"></div>
<p class="summa">Итого:</p>
<button id="clear_cart">Очистить корзину</button>
<div class="modal__basket"></div>
</div>`;
let d = document,
  itemBox = d.querySelectorAll(".products__cart"),
  cartCont = d.getElementById("cart_content");

btn.onclick = function () {
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function addEvent(elem, type, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent("on" + type, function () {
      handler.call(elem);
    });
  }
  return false;
}

function getCartData() {
  return JSON.parse(localStorage.getItem("cart"));
}

function setCartData(o) {
  localStorage.setItem("cart", JSON.stringify(o));
  return false;
}

function addToCart(e) {
  this.disabled = true;
  let cartData = getCartData() || {},
    parentBox = this.parentNode,
    itemId = this.getAttribute("data-id"),
    itemTitle = parentBox.querySelector(".products__name").innerHTML,
    itemPrice = parentBox.querySelector(".products__price-new").innerHTML;
  if (cartData.hasOwnProperty(itemId)) {
    cartData[itemId][2] += 1;
  } else {
    cartData[itemId] = [itemTitle, itemPrice, 1];
  }
  if (!setCartData(cartData)) {
    this.disabled = false;
  }
  return false;
}
for (let i = 0; i < itemBox.length; i++) {
  addEvent(itemBox[i].querySelector(".overlay__basket"), "click", addToCart);
}

function openCart(e) {
  let cartData = getCartData(),
    totalItems = "";
  if (cartData !== null) {
    totalItems =
      '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
    for (let items in cartData) {
      totalItems += "<tr>";
      for (let i = 0; i < cartData[items].length; i++) {
        totalItems += "<td>" + cartData[items][i] + "</td>";
      }
      totalItems += "</tr>";
    }
    totalItems += "</table>";
    cartCont.innerHTML = totalItems;
  } else {
    cartCont.innerHTML = "В корзине пусто!";
  }
  return false;
}

addEvent(d.getElementById("myBtn"), "click", openCart);
addEvent(d.getElementById("clear_cart"), "click", function (e) {
  localStorage.removeItem("cart");
  let basket = document.querySelector(".modal__basket");
  console.log(basket);
  console.log('ура');
  basket.innerHTML ="";
  cartCont.innerHTML = "Корзина очищена.";
});
