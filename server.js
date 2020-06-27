import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'dotenv/config'
import { usersRoutes } from './api/routes/users.js'

// Сервер
export const app = express()

// Мидлвары
// Парсим application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Парсим application/json
app.use(bodyParser.json())
// Лигорование запросов
app.use(morgan(':status :method :url'))
// Роуты для пользоватлелей под общим url /users
app.use('/users', usersRoutes)

// Отлов роута 404
app.use((req, res, next) => {
	const error = new Error('Not found')
	error.status = 404
	next(error)
})
app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({ error: error.message, status: error.status })
})
