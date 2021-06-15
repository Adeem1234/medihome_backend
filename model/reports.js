const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const reportSchema = new Schema({
	from: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
	},
	user: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('reports', reportSchema);