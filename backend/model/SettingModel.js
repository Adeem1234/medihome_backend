const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const settingSchema = new Schema({
	limit: {
		type: Number,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('settings', settingSchema);