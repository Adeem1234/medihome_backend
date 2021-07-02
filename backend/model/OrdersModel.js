const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const ordersSchema = new Schema({
  customer: {
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
  city: {
    type: SchemaTypes.ObjectId,
    ref: 'cities',
  },
  area: {
    type: SchemaTypes.ObjectId,
    ref: 'areas'
  },
  date: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('orders', ordersSchema);