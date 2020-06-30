const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
		currency: 'rub',
		style: 'currency',
	}).format(price)
}

document.querySelectorAll('.price').forEach(el => {
	el.textContent = toCurrency(el.textContent)
})

// Асинхронное удаление курса из карзины
const $basket = document.querySelector('#basket')
if ($basket) {
	$basket.addEventListener('click', e => {
		if (e.target.id === 'deleteBtn') {
			fetch(`/basket/remove/${e.target.dataset.id}`, {
				method: 'delete',
			})
				.then(res => res.json())
				.then(basket => {
          
					if(basket.courses.length){
            const html = basket.courses.map(c => {
              return `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.price}</td>
                  <td>${c.count}</td>
                  <td>
                    <button class="btn btn-small" id="deleteBtn" data-id="${c.id}">Удалить</button>
                  </td>
                </tr>
                `}).join('')
            $basket.querySelector('#basketBody').innerHTML = html
            $basket.querySelector('#totalPrice').innerHTML = `Итоговая цена: ${toCurrency(basket.price)}`
          }else{
            $basket.innerHTML = '<p>Карзина пуста</p>'
          }
				})
		}
	})
}
