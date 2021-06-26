const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const medicinesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  formula: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('medicines', medicinesSchema);