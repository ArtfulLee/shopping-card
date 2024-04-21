import { validateForm } from './validators'
import { form } from '../selectors/selectors'

/**
 * Функция для валидации полей формы.
 * @returns {void}
 */
export const formValidate = () => {
  // Проверяем, что форма существует
  if (form) {
    // Получаем все input, select
    const allInputs = form.querySelectorAll('input, select')

    // Обработчик изменения каждого поля ввода
    allInputs.forEach((input) => {
      input.addEventListener('change', () => {
        const userData = {}

        // Собираем данные только из текущего поля формы
        userData[input.name] = input.value

        // Валидация только для текущего поля
        const errors = validateForm(userData)

        // Обновление сообщения об ошибке только для текущего поля
        const errorElement = document.querySelector(`#${input.name}-error`)

        if (errorElement) {
          errorElement.textContent = errors[input.name] || ''
        }
      })
    })
  }
}
