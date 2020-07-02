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
user.methods.addToBasket = function (course) {
	// копия basket.items
	const items = [...this.basket.items]
	const index = items.findIndex(
		c => c.courseId.toString() === course._id.toString(),
	)
	if (index >= 0) {
		// в карзине есть такой курс
		items[index].count = this.items[index].count++
	} else {
		// курса нет в карзине (index === -1)
		items.push({
			courseId: course._id,
			count: 1,
		})
	}
	// новая карзина
	this.basket = { items }
	return this.save()
}

export const User = model('User', user)
