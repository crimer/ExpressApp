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
coursesRoutes.get('/course/:id', async (req, res) => {
	const course = await Course.getById(req.params.id)
	res.render('course', {
		layout: 'empty',
		title: `Курс ${course.title}`,
		course,
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
