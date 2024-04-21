/**
 * Компонент степпер.
 */
const stepper = () => {
  // Получаем элементы компонента
  const counterInput = document.querySelector('.counter__input')
  const counterBtnUp = document.querySelector('.counter__btn--up')
  const counterBtnDown = document.querySelector('.counter__btn--down')

  // Инициализируем начальное значение степпера
  let count = Number.parseInt(counterInput?.value, 10)

  /**
   * Обновляет состояние кнопок счетчика.
   */
  const updateButtonState = () => {
    counterBtnUp.disabled = count >= 10
    counterBtnDown.disabled = count <= 1
  }

  /**
   * Обработчик события клика на кнопку увеличения значения.
   */
  const handleBtnUpClick = () => {
    count++
    counterInput.value = count
    updateButtonState()
  }

  /**
   * Обработчик события клика на кнопку уменьшения значения.
   */
  const handleBtnDownClick = () => {
    count--
    counterInput.value = count
    updateButtonState()
  }

  // Добавляем обработчики событий для кнопок степпера
  counterBtnUp.addEventListener('click', handleBtnUpClick)
  counterBtnDown.addEventListener('click', handleBtnDownClick)

  // Инициализируем состояние кнопок при загрузке страницы
  updateButtonState()
}

stepper()
