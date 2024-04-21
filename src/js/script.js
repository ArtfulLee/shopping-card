import { formValidate } from './forms/formValidate'
import { Sidebar } from './components/sidebar'
import { loadJSON } from './products/productService'
// import { Notification } from './components/notification'

/**
 * Загружает данные при отрисовке страницы страницы.
 */
const init = (() => {
  window.addEventListener('DOMContentLoaded', () => {
    loadJSON()
    formValidate() //  Валидация формы
  })
})()

/**
 * Создает экземпляр сайдбара.
 * @param {string} sidebarComponent - Селектор компонента сайдбара.
 * @param {string} toggleButton - Селектор кнопки, по клику на которую открывается сайдбар.
 * @param {string} [position='left'] - Позиция сайдбара (по умолчанию 'left').
 */
const panel = new Sidebar('#sidebar', '#show-sidebar', 'right')

// Только для примера
// const notification = new Notification({
//   title: 'Добавление товара',
//   subtitle: 'Товар добавлен на страницу',
// })
// const notification1 = new Notification({
//   title: 'Добавление товара 1',
//   subtitle: 'Товар добавлен на страницу 1',
//   variant: 'warning',
// })

// const notification2 = new Notification({
//   title: 'Добавление товара 2',
//   subtitle: 'Товар добавлен на страницу 2',
//   variant: 'error',
// })

// const notification3 = new Notification({
//   title: 'Добавление товара 4',
//   subtitle: 'Товар добавлен на страницу 4',
//   variant: 'success',
// })
