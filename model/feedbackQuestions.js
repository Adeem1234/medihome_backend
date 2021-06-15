const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const feedbackQuestionsSchema = new Schema({
	question: {
		type: String
	},
});

module.exports = mongoose.model('feedbackQuestions', feedbackQuestionsSchema);