import { model, Schema } from 'mongoose'

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
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

export const Course = model('Course', course)
