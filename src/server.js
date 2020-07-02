import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'dotenv/config'
import { coursesRoutes } from './routes/courses.js'
import { basketRoutes } from './routes/basket.js'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import path from 'path'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import { User } from './models/user.js'

// Сервер
export const app = express()

// handlebars настройки
const hbs = exphbs.create({
	handlebars: allowInsecurePrototypeAccess(Handlebars),
	defaultLayout: 'main',
	extname: 'hbs',
})

// handlebars как движок отображения express
app.engine('hbs', hbs.engine)
// Регистрируем handlebars как view engine
app.set('view engine', 'hbs')
// Указываем папку где лежат страницы
app.set('views', path.join(__dirname, 'views'))

// Мидлвары
app.use(async (req, res, next) => {
	try {
		const user = await User.findById('5efd7628515e936bb89ea8b1')
    req.user = user
    next()
	} catch (error) {
		console.log(error)
	}
})
// Папка статики (общедоступная)
app.use(express.static(path.join(__dirname, '../public/')))
// Парсим application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Парсим application/json
app.use(bodyParser.json())
// Лигорование запросов
app.use(morgan(':status :method :url'))
// Роуты для пользоватлелей под общим url /
app.use('/', coursesRoutes)
app.use('/basket', basketRoutes)

// Отлов роута 404 и ошибок
app.use((req, res, next) => {
	const error = new Error('Not found')
	error.status = 404
	next(error)
})
app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({ error: error.message, status: error.status })
})
