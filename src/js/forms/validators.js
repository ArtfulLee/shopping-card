/**
 * Валидаторы для полей формы.
 * @property {function(string): string|null} name - Валидатор для имени.
 * @property {function(string): string|null} category - Валидатор для категории.
 * @property {function(string): string|null} rating - Валидатор для рейтинга.
 * @property {function(string): string|null} price - Валидатор для цены.
 */
const validators = {
  /**
   * Валидатор для названия.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  name: (value) => {
    if (!value) return 'Name is required'

    const regexName = /^[a-zA-Zа-яА-Я0-9\s_-]{1,50}$/

    if (!regexName.test(value)) return 'Invalid product name'

    return null
  },
  /**
   * Валидатор для категории.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  category: (value) => {
    if (!value) return 'Category is required'

    return null
  },
  /**
   * Валидатор для рейтинга.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  rating: (value) => {
    if (!value) return 'Rating is required'

    const regexRating = /^[0-9]+$/

    if (!regexRating.test(value)) return 'Invalid product rating'

    return null
  },
  /**
   * Валидатор для цены.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  price: (value) => {
    if (!value) return 'Price is required'

    const regexPrice = /^\d+(\.\d{1,2})?$/

    if (!regexPrice.test(value)) return 'Invalid product price'

    return null
  },
}

/**
 * Функция для валидации формы на основе предоставленных валидаторов.
 *
 * @param {Object} formData - Данные формы, представленные в виде объекта.
 * @returns {Object} - Объект с сообщениями об ошибках для каждого поля формы.
 */
export function validateForm(formData) {
  // Объект для хранения сообщений об ошибках
  const validationErrors = {}

  // Итерация по каждому полю формы
  Object.entries(formData).forEach(([fieldName, value]) => {
    // Получение валидатора для текущего поля
    const validator = validators[fieldName]

    // Если валидатор существует, выполняем проверку
    if (validator) {
      // Вызов валидатора для текущего значения поля
      const errorMessage = validator(value, fieldName)

      // Если есть сообщение об ошибке, добавляем его в объект ошибок
      if (errorMessage) {
        validationErrors[fieldName] = errorMessage
      }
    }
  })

  // Возвращаем объект с сообщениями об ошибках
  return validationErrors
}
