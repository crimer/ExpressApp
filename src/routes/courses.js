import express from 'express'
import { Course } from '../models/course'

export const coursesRoutes = express.Router()

// Роуты
// GET /
coursesRoutes.get('/', async (req, res, next) => {
	res.render('index', {
		title: 'Главная',
		isHome: true,
	})
})
// GET /courses
coursesRoutes.get('/courses', async (req, res, next) => {
	const courses = await Course.getAll()
	res.render('courses', {
		title: 'Все курсы',
		isAll: true,
		courses,
	})
})
// GET /course/:id
coursesRoutes.get('/course/:id', async (req, res) => {
	const course = await Course.getById(req.params.id)
	res.render('course', {
		layout: 'empty',
		title: `Курс ${course.title}`,
		course,
	})
})
// GET /course/:id/edit
coursesRoutes.get('/course/:id/edit', async (req, res) => {
	if (!req.query.allow) {
		return res.redirect('/')
	}
	const course = await Course.getById(req.params.id)
	res.render('courseEdit', {
		course,
	})
})
coursesRoutes.post('/course/edit', async (req, res) => {
  await Course.update(req.body)
	res.redirect('/courses')
})

// GET /add
coursesRoutes.get('/add', async (req, res, next) => {
	res.render('addCourse', {
		title: 'Добавить курс',
		isAdd: true,
	})
})
// POST /add
coursesRoutes.post('/add', async (req, res) => {
	const course = new Course(req.body.name, req.body.price, req.body.url)
	await course.save()
	res.redirect('/courses')
})
