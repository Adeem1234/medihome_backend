const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;


const citiesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  areas: [{
    type: SchemaTypes.ObjectId,
    ref: 'areas'
  }]
});

module.exports = mongoose.model('cities', citiesSchema);