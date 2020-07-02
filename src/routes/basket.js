import express from 'express'
import { Course } from '../models/course'

export const basketRoutes = express.Router()

const toCurrency = price =>
	new Intl.NumberFormat('ru-RU', {
		currency: 'rub',
		style: 'currency',
	}).format(price)

const mapBasketItems = basket =>
	basket.items.map(c => ({
		...c.courseId._doc,
		count: c.count,
	}))

// итоговая цена всех курсов в карзине
const computePrice = courses =>
	courses.reduce((total, course) => (total += course.price * course.count), 0)

basketRoutes.post('/add', async (req, res) => {
	const course = await Course.findById(req.body.id)
	await req.user.addToBasket(course)
	res.redirect('/basket')
})

basketRoutes.get('/', async (req, res) => {
	// получаем карзину через модель пользователя
	const user = await req.user.populate('basket.items.courseId').execPopulate()
	const courses = mapBasketItems(user.basket)
	res.render('basket', {
		title: 'Корзина',
		isBasket: true,
		courses,
		price: toCurrency(computePrice(courses)),
	})
})

basketRoutes.delete('/remove/:id', async (req, res) => {
	const basket = await Basket.remove(req.params.id)
	res.status(200).json(basket)
})
