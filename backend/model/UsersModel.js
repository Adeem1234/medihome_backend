const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const userSchema = new Schema({
	email: String,
	password: String,
	role: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
	},
	deviceId: {
		type: String,
		default: '',
	},
	phoneNumber: {
		type: String,
	},
	type: {
		type: String,
		required: true
	},
	city: {
		type: SchemaTypes.ObjectId,
		ref: 'cities'
	},
	area: {
		type: SchemaTypes.ObjectId,
		ref: 'areas'
	},
	profileUpdated: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('users', userSchema);