async function getResponse() {
  let response = await fetch(
    "https://62b4de4cda3017eabb120a85.mockapi.io/Post"
  );
  let content = await response.json();
  content = content.splice(0, 12);

  let card = document.querySelector(".products");

  let key;

  for (key in content) {
    card.innerHTML += `
        <div class="products__cart">
          <div class="products__photo">
            <img
                 src="${content[key].image}"
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
            <span class="products__price-new">${content[key].price}</span>
            <span class="products__price-old"><s>${content[key].prePrice}</s></span>
            </div>
            <p class="products__name">${content[key].name}</p>
          </div>
        </div>
    `;
  }
}
getResponse();
