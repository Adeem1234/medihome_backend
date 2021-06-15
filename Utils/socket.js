'use strict';
const io = require('socket.io')();
const User = require('../model/User');
const Call = require('../model/calls');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;
var allUsers = [];
var searchingUsers = [];

io.on('connection', (socket) => {
});

module.exports = io;
