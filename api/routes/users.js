import express from 'express'
export const usersRoutes = express.Router()

// Роуты
usersRoutes.get('/', (req, res, next) => {
	return res.status(200).json({ message: 'hi from express' })
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

