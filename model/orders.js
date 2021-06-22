const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const ordersSchema = new Schema({
  customerName: {
    type: SchemaTypes.ObjectId,
    ref: 'users'
  },
  rider: {
    type: SchemaTypes.ObjectId,
    ref: 'users'
  },
  pharmacy: {
    type: SchemaTypes.ObjectId,
    ref: 'pharmacies'
  },
  laboratory: {
    type: SchemaTypes.ObjectId,
    ref: 'laboratories'
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('orders', ordersSchema);