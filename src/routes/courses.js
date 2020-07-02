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
	const courses = await Course.find()
	res.render('courses', {
		title: 'Все курсы',
		isAll: true,
		courses,
	})
})
// GET /course/:id
coursesRoutes.get('/course/:id', async (req, res) => {
	const course = await Course.findById(req.params.id)
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
	const course = await Course.findById(req.params.id)
	res.render('courseEdit', {
		course,
	})
})
// POST /course/:id/edit
coursesRoutes.post('/course/edit', async (req, res) => {
	const { id } = req.body
	delete req.body.id
	await Course.findByIdAndUpdate(id, req.body)
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
	const course = new Course({
		title: req.body.name,
		price: req.body.price,
		image: req.body.url,
	})
	try {
		await course.save()
		res.redirect('/courses')
	} catch (err) {
		console.log(err)
	}
})
// POST /course/remove
coursesRoutes.post('/course/remove', async (req, res) => {
	try {
    await Course.deleteOne({ _id: req.body.id, })
    res.redirect('/courses')
	} catch (error) {
		console.log('Delete course error: ', error)
	}
})
