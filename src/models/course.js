import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

export class Course {
	constructor(title, price, image) {
		this.title = title
		this.price = price
		this.image = image
		this.id = uuidv4()
	}
	toJson() {
		return {
			id: this.id,
			title: this.title,
			price: this.price,
			image: this.image,
		}
	}
	async save() {
    // Получаем все курсы с json файла
    const courses = await Course.getAll()
    console.log(courses);
    
    // Добавляем новый курс ко всем имеющимся
    courses.push(this.toJson())
    // Сохраняем в json
		return new Promise((resolve, reject) => {
			fs.writeFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				JSON.stringify(courses,null,2),
				err => {
					if (err) {
						reject(err)
					} else {
						resolve()
					}
				},
			)
		})
	}
	static getAll() {
		return new Promise((resolve, reject) => {
			fs.readFile(
				path.join(__dirname, '..', 'data', 'courses.json'),
				'utf-8',
				(err, content) => {
					if (err) {
						reject(err)
					} else {
						resolve(JSON.parse(content))
					}
				},
			)
		})
	}
}
