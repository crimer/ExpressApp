import express from 'express'
import { Course } from '../models/course'
import { Basket } from '../models/basket'

export const basketRoutes = express.Router()

basketRoutes.post('/add', async (req, res) => {
	const course = await Course.getById(req.body.id)
	await Basket.add(course)
	res.redirect('/basket')
})

basketRoutes.get('/', async (req, res) => {
  const basket = await Basket.fetch()
  
	res.render('basket', {
		title: 'Корзина',
		isBasket: true,
		courses: basket.courses,
		price: basket.price,
	})
})

basketRoutes.delete('/remove/:id', async (req,res) =>{
  const basket = await Basket.remove(req.params.id)
  res.status(200).json(basket)
})