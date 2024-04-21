import { productList } from '../selectors/selectors.js'
import { addProductToBasket } from './productService'

/**
 * Функция для генерации HTML-кода карточки товара
 * @param {Object} product - Объект товара
 * @param {string} product.id - ID товара
 * @param {string} product.name - Название товара
 * @param {string} product.rating - Рейтинг товара
 * @param {string} product.price - Цена товара
 * @param {string} product.imgSrc - Ссылка на изображение товара
 * @param {string} product.category - Категория товара
 */
export const generateProductCardHTML = (product) => {
  if (productList) {
    const cardHTML = `
    <div class="main-card" data-id="${product?.id}">
      <div class="card-image">
        <img src="${product?.imgSrc}" alt="image">
        <div class="card-wishlist">
          <div class="wishlist-rating">
            <div class="rating-img">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6.12414H9.89333L8 0L6.10667 6.12414H0L4.93333 9.90345L3.06667 16L8 12.2207L12.9333 16L11.04 9.87586L16 6.12414Z" fill="#FFCE31" />
              </svg>
            </div>
            <span class="rating-amount">${product?.rating}</span>
          </div>
          <svg class="whishlist-heart" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
          </svg>
        </div>
      </div>
      <h3 class="card-name">${product?.name}</h3>
      <p class="card-category">${product?.category}</p>
      <p class="card-price">${product?.price}</p>
      <button class="btn btn-primary">Add to cart</button>
    </div>
  `
    // Вставка шаблона
    productList.insertAdjacentHTML('beforeend', cardHTML)

    // Получение всех кнопок
    const addProductToBasketBtns = document.querySelectorAll('.btn-primary')

    addProductToBasketBtns.forEach((button) => button.addEventListener('click', addProductToBasket))
  }
}
