const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const pharmaciesSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	city: {
		type: SchemaTypes.ObjectId,
		ref: 'cities'
	},
	area: {
		type: SchemaTypes.ObjectId,
		ref: 'areas'
	},
	manager: {
		type: SchemaTypes.ObjectId,
		ref: 'users'
	},
	phoneNumber: {
		type: String,
		require: true
	},
	medicines: [{
		type: SchemaTypes.ObjectId,
		ref: 'medicines'
	}]
});

module.exports = mongoose.model('pharmacies', pharmaciesSchema);