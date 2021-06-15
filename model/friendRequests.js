const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const friendRequestSchema = new Schema({
	from: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
	},
	to: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('friendRequests', friendRequestSchema);