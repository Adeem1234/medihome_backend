const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const pharmaciesSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	longitude: {

	},
	latitude: {

	},
	manager: {
		type: SchemaTypes.ObjectId,
		ref: 'users'
	},
	phoneNumber: {
		type: String,
		require: true
	}
});

module.exports = mongoose.model('pharmacies', pharmaciesSchema);