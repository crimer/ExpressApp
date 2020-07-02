import { model, Schema } from 'mongoose'

const user = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	basket: {
		items: [
			{
				count: {
					type: Number,
					required: true,
					default: 1,
				},
				courseId: {
					type: Schema.Types.ObjectId,
					ref: 'Course',
					required: true,
				},
			},
		],
	},
})

export const User = model('User', user)
