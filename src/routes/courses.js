import express from 'express'
export const coursesRoutes = express.Router()

// Роуты
coursesRoutes.get('/', (req, res, next) => {  
  res.render('index',{
    title: 'Главная',
    isHome: true
  })
	// return res.status(200).json({ message: 'hi from express' })
})
coursesRoutes.get('/courses', (req, res, next) => {  
  res.render('courses',{
    title: 'Все курсы',
    isAll: true
  })
	// return res.status(200).json({ message: 'hi from express' })
})
coursesRoutes.get('/add', (req, res, next) => {  
  res.render('addCourse',{
    title: 'Добавить курс',
    isAdd: true
  })
	// return res.status(200).json({ message: 'hi from express' })
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

