import express from 'express'
import { Course } from '../models/course'

export const coursesRoutes = express.Router()

// Роуты
coursesRoutes.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Главная',
		isHome: true,
	})
})
coursesRoutes.get('/courses', async (req, res, next) => {
	const courses = await Course.getAll()
	res.render('courses', {
		title: 'Все курсы',
		isAll: true,
		courses,
	})
})
coursesRoutes.get('/add', (req, res, next) => {
	res.render('addCourse', {
		title: 'Добавить курс',
		isAdd: true,
	})
})
coursesRoutes.post('/add', async (req, res) => {
	const course = new Course(req.body.name, req.body.price, req.body.url)
	await course.save()
	res.redirect('/courses')
})
// usersRoutes.get('/users/:userId', (req, res) => {
// 	return res.send(`GET HTTP method on user ${req.params.userId} resource`)
// })

// usersRoutes.post('/users', (req, res) => {
// 	return res.send('POST HTTP method on user resource')
// })

// usersRoutes.put('/users', (req, res) => {
// 	return res.send('PUT HTTP method on user resource')
// })

// usersRoutes.delete('/users', (req, res) => {
// 	return res.send('DELETE HTTP method on user resource')
// })
