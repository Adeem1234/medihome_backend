const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const reviewSchema = new Schema({
	from: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
	},
	to: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
	},
	review: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('reviews', reviewSchema);