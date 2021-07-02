const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('areas', areaSchema);