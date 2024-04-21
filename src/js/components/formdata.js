// Отправка данных при создании нового товара через FormData
form.addEventListener('submit', async (event) => {
  event.preventDefault() // предотвр. отправку данных

  const data = new FormData() // Создаем объект FormData

  // Добавляем данные о товаре в объект FormData
  data.append('id', nanoid())
  data.append('name', document.querySelector('#productName').value)
  data.append('rating', document.querySelector('#productRating').value)
  data.append('price', document.querySelector('#productPrice').value)
  data.append('category', document.querySelector('#productCategory').value)

  // Получаем выбранное изображение
  const imgInput = document.querySelector('#productImgSrc')
  const imgFile = imgInput.files[0]

  console.log('Изображение:', imgFile)

  // Добавляем изображение в объект FormData
  data.append('imgSrc', imgFile)

  console.log('data', data)

  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST', // Здесь так же могут быть GET, PUT, DELETE
      body: data, // Тело запроса в JSON-формате
      headers: {
        // Указываем, что данные отправляются в формате FormData, не JSON
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.ok) {
      console.log('Товар успешно добавлен')

      const newProductCard = `
        <div class="main-card" data-id="">
          <div class="card-image">
            <img src="${data?.imgSrc}" alt="image">
            <div class="card-wishlist">
              <div class="wishlist-rating">
                <div class="rating-img">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6.12414H9.89333L8 0L6.10667 6.12414H0L4.93333 9.90345L3.06667 16L8 12.2207L12.9333 16L11.04 9.87586L16 6.12414Z" fill="#FFCE31" />
                  </svg>
                </div>
                <span class="rating-amount">${data?.rating}</span>
              </div>
              <svg class="whishlist-heart" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
              </svg>
            </div>
          </div>
          <h3 class="card-name">${data?.name}</h3>
          <p class="card-category">${data?.category}</p>
          <p class="card-price">${data?.price}</p>
          <button class="btn btn-primary">Add to cart</button>
        </div>
      `

      // Вставляем новую карточку товара в контейнер productList
      productList.insertAdjacentHTML('beforeend', newProductCard)
    } else {
      console.error('Ошибка при добавлении товара:', response.statusText)
    }
  } catch (error) {
    console.error('Ошибка при отправке данных на сервер:', error)
  }
})
