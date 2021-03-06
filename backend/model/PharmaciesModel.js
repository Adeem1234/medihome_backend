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
		medicine: {
			type: SchemaTypes.ObjectId,
			ref: 'medicines'
		},
		quantity: {
			type: Number,
			required: true
		}
	}],
	orders: [{
		type: SchemaTypes.ObjectId,
		ref: 'orders'
	}]
});

module.exports = mongoose.model('pharmacies', pharmaciesSchema);