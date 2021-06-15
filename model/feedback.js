const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const feedbackSchema = new Schema({
	feedback: [
		{
			question: { type: Array },
			answer: { type: Array },
		},
	],
	user: {
		type: SchemaTypes.ObjectId,
		ref: 'users',
	},
	call: {
		type: SchemaTypes.ObjectId,
		ref: 'calls',
	},
});

module.exports = mongoose.model('feedbacks', feedbackSchema);
