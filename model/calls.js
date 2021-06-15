const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const callSchema = new Schema({
	user: [{
		type: SchemaTypes.ObjectId,
		ref: 'users',
	}, ],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('calls', callSchema);