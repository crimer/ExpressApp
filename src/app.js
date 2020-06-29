import http from 'http'
import { app } from './server'
import 'dotenv/config'

const server = http.createServer(app)

// Слушаем порт
server.listen(process.env.PORT, () => {
	console.log(`Server start on port http://localhost:${process.env.PORT}/ (¬‿¬)`)
})
