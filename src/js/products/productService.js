import { nanoid } from 'nanoid'
import { generateProductCardHTML } from './productCard'
import { form } from '../selectors/selectors'

let PRODDUCTS = [] // Переменная для хранения данных о продуктах.

// Функция подгрузки данных из db.json
export async function loadJSON() {
  try {
    const response = await fetch('http://localhost:3000/products')
    PRODDUCTS = await response.json()

    console.log('Данные из db.json:', PRODDUCTS)

    if (Array.isArray(PRODDUCTS)) PRODDUCTS.forEach((product) => generateProductCardHTML(product))
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

/**
 * Функция обработки кликов и добавления товара в корзину по его ID
 * @param {MouseEvent} event - Событие клика
 */
export function addProductToBasket(event) {
  // Получаем id карточки
  const id = event.currentTarget.parentElement?.dataset?.id

  // Находим товар по его ID в PRODDUCTS
  const product = findProductById(id, PRODDUCTS)

  if (product) {
    // Добавляем товар в корзину и т.д.
    console.log(product)

    // Получаем секцию корзины для вставки выбраных товаров
    const basketList = document.querySelector('#basket-list')

    // Проверяем, был ли данный товар ранее добавлен в корзину
    if (basketList.querySelector(`data-id\\:${product?.id}`)) {
      // Добавить нотиф, что товар уже есть в корзине
      // Пока тут алерт для загрушки
      alert('Вы уже добавляли этот товар в корзину')
    } else {
      // добавляем товар в корзину
      basketList.insertAdjacentHTML(
        'beforeend',
        `
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
      )
    }
  } else {
    console.error(`Товар с ID ${id} не найден`)
  }
}

/**
 * Функция для поиска товара по его ID в базе данных
 * @param {string} id - Идентификатор товара
 * @param {Array<Object>} products - Массив товаров
 * @returns {Object|null} - Найденный товар или null, если товар не найден
 */
export function findProductById(id, products) {
  // Находим товар по его ID в переданном массиве
  const foundProduct = products.find((product) => product.id === id)

  return foundProduct || null
}

/**
 * Обработчик отправки формы для добавления нового товара.
 * @param {Event} event - Событие отправки формы.
 * @returns {Promise<void>} - Промис.
 */
export const handleFormSubmit = async (event) => {
  event.preventDefault() // предотвр. отправку данных

  // Целевой элемент, на к-ом произошел клик (форма)
  const form = event.target

  // Получаем все инпуты внутри формы
  const inputLists = form.querySelectorAll('input')

  // Объект для отправки на бек
  const newProduct = {
    id: nanoid(),
  }

  // пополняем объект по атрибуту name инпутов
  inputLists.forEach((input) => (newProduct[input?.name] = input?.value))

  // добавляем категорию товара в объект newProduct
  newProduct.category = document.querySelector('#productCategory')?.value

  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST', // Здесь так же могут быть GET, PUT, DELETE
      body: JSON.stringify(newProduct), // Тело запроса в JSON-формате
      headers: {
        // Добавляем необходимые заголовки
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    if (response.ok) {
      // Показ компонента уведомления
      const notificationInfo = new Notification({
        variant: 'green',
        title: 'Добавление товара',
        subtitle: 'Товар добавлен на страницу',
      })

      // Обновляем полученные ранее данные
      PRODDUCTS.push(newProduct)

      // Вставляем новую карточку товара в HTML
      generateProductCardHTML(newProduct)
    } else {
      console.error('Ошибка при добавлении товара:', response.statusText)
    }
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error)
  }
}

// Привязываем обработчик submit к форме
form.addEventListener('submit', handleFormSubmit)
