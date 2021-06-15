const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const convoStarterSchema = new Schema({
	question: {
		type: String
	},
});

module.exports = mongoose.model('convoStarters', convoStarterSchema);