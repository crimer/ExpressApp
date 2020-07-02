import http from 'http'
import { app } from './server'
import 'dotenv/config'
import monoose from 'mongoose'
import { User } from './models/user.js'

const server = http.createServer(app)

const start = async () => {
	try {
		// Подключаемся к mongodb
		await monoose.connect(process.env.MONGODB_CONNECT_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		// ищем хотябы одного пользователя
		const condidate = await User.findOne()
		if (!condidate) {
			// нет пользователя -> создаем пользователя
			const user = new User({
				email: 'nikita@mail.ru',
				name: 'Nikita',
				basket: { items: [] },
			})
			await user.save()
		}
		// Слушаем порт
		server.listen(process.env.PORT, () => {
			console.log(
				`Server start on port http://localhost:${process.env.PORT}/ (¬‿¬)`,
			)
		})
	} catch (error) {
		console.log(`MongoDB connect error: ${error}`)
	}
}
start()
