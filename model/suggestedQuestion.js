const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const suggestedQuestionSchema = new Schema({
	question: {
		type: String
	},
});

module.exports = mongoose.model('suggestedQuestions', suggestedQuestionSchema);