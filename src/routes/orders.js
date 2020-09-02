import express from 'express'
import { Order } from '../models/order'

export const ordersRoutes = express.Router()

// Роуты
// GET /
ordersRoutes.get('/', async (req, res, next) => {
	res.render('orders', {
		title: 'Заказы',
		isOrders: true,
	})
})

// POST /
ordersRoutes.post('/', async (req, res) => {})
