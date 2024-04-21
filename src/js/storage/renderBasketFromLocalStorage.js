import { basketList } from '../selectors/selectors'

export function renderBasketFromLocalStorage(getBasketsProductFromLocalStorage) {
  getBasketsProductFromLocalStorage.forEach((product) => {
    const cardContainerForBasketsProduct = `
    <div class="item-card" data-id="${product?.id}">
      <div class="item-image">
        <img class="" src="${product?.imgSrc}" alt="image">
      </div>
      <div class="item-card-description">
        <h3 class="card-name">${product?.name}</h3>
        <p class="card-category">${product?.category}</p>
        <p class="card-price">${product?.price}</p>
      </div>
    </?div>
  `

    // добавляем товар в корзину
    basketList.insertAdjacentHTML('beforeend', cardContainerForBasketsProduct)
  })
}
