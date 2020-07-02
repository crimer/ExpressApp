import { Schema, model } from 'mongoose'

const course = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: String,
})

export const Course = model('Course', course)