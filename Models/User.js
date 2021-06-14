const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        default: '',
    },
    deviceId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);