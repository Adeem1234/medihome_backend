const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;


const doctorsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  diploma: {
    type: String,
    reuired: true
  }
});

module.exports = mongoose.model('doctors', doctorsSchema);