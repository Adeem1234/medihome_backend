const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const laboratoriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: SchemaTypes.ObjectId,
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

module.exports = mongoose.model('laboratories', laboratoriesSchema);