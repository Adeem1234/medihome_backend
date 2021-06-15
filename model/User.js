const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const userSchema = new Schema({
	email: String,
	password: String,
	avatar: String,
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
		required: true
	}
});

module.exports = mongoose.model('users', userSchema);