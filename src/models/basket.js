import fs from 'fs'
import path from 'path'

const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'basket.json',
)

export class Basket {
	static async add(course) {
		// получаем всю корзину
		const allBasket = await Basket.fetch()
		// index того курса который уже есть в карзине
		const index = allBasket.courses.findIndex(c => c.id === course.id)
		// берем курс из карзину по index
		const candidate = allBasket.courses[index]
		if (candidate) {
			// курс уже есть
			candidate.count++
			// заменяем тот курс что в карзине на новый
			allBasket.courses[index] = candidate
		} else {
			// курс надо добавить
			course.count = 1
			// добавляем в карзину
			allBasket.courses.push(course)
		}
		// увеличиваем общую цену карзины
		allBasket.price += +course.price
		// сохраняем
		return new Promise((resolve, reject) => {
			fs.writeFile(p, JSON.stringify(allBasket, null, 2), err => {
				if (err) reject(err)
				else resolve()
			})
		})
	}

	static async remove(id) {
		// получаем всю корзину
		const allBasket = await Basket.fetch()
		// index того курса который уже есть в карзине
		const index = allBasket.courses.findIndex(c => c.id === id)
		// берем курс из карзину по index
		const course = allBasket.courses[index]
		if (course.count <= 1) {
			// удаляем
      allBasket.courses.splice(index, 1)
		} else {
			// уменьшить на 1
			allBasket.courses[index].count--
		}
		// перерасчет цены
    allBasket.price -= course.price
		// сохраняем
		return new Promise((resolve, reject) => {
			fs.writeFile(p, JSON.stringify(allBasket, null, 2), err => {
				if (err) reject(err)
				else resolve(allBasket)
			})
		})
	}

	static async fetch() {
		return new Promise((resolve, reject) => {
			fs.readFile(p, 'utf-8', (err, content) => {
				if (err) {
					reject(err)
				} else {
					resolve(JSON.parse(content))
				}
			})
		})
	}
}
