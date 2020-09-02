import { model, Schema } from 'mongoose'

const order = new Schema({
	courses: [
		{
			course: {
				type: Object,
				required: true,
			},
			count: {
				type: Number,
				required: true,
			},
		},
	],
	user: {
		name: String,
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	data: {
		type: Date,
		default: Date.now,
	},
})

export const Order = model('Order', order)
