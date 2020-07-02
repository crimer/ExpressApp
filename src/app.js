import http from 'http'
import { app } from './server'
import 'dotenv/config'
import monoose from 'mongoose'

const server = http.createServer(app)

const start = async () => {
	try {
		// Подключаемся к mongodb
		await monoose.connect(process.env.MONGODB_CONNECT_URL, {
			useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
		})
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
