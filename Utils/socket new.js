'use strict';
const io = require('socket.io')();
const User = require('../model/User');
const Call = require('../model/calls');
const jwt = require('jsonwebtoken');
const { makeCall } = require('../controller/api/calls');

const SECRET_KEY = process.env.JWT_SECRET_KEY;
var allUsers = []
var searchingUsers = []

io.on('connection', (socket) => {
    console.log('socket id ' + socket.id)
    socket.on('authenticate', async (data) => {
        let msg;
        try {
            let token = data.token.split(' ')[1];
            let user = await jwt.verify(token, SECRET_KEY);
            const userCheck = await User.findById(user._id).select('name unique_id emoji avatar bannedUsers');
            if (userCheck) {
                socket.user = userCheck;
                socket.userId = JSON.stringify(userCheck._id);
                var getSocket = allUsers.find(s => s.id === socket.id);
                if (!getSocket) { await allUsers.push(socket); }
                console.log('allUsers length ' + allUsers.length)
                socket.emit('authenticate', { msg: "Authorized User", user: userCheck })
            } else { socket.emit('authenticate', { msg: "Unauthorized User" }) }
        } catch (error) { socket.emit('authenticate', { msg: "Unauthorized User" }) }
    })

    socket.on('searching', async () => {
        try {
            console.log('searching');
            //   get socket from array
            var getSocket = allUsers.find(s => s.id === socket.id);
            var getSocketIndex = allUsers.indexOf(getSocket);
            var found, connectedUser, user2, user, message;
            const loopcheck = 0
            if (getSocketIndex === 0) { searchingUsers.push(socket); }
            else if (searchingUsers.length > 0) {
                do {
                    message = findUser(socket)
                } while (message !== 'Either User is blocked by the other')
                const findUser = async (socket) => {
                    found = Math.floor(Math.random() * searchingUsers.length);
                    connectedUser = searchingUsers.splice(found, 1);
                    user2 = connectedUser[0].user;
                    user = socket.user;

                    if (user.bannedUsers.length !== 0 || user2.bannedUsers.length !== 0) {
                        if (user.bannedUsers.length !== 0 && user.bannedUsers.includes(user2._id)) {
                            let message = 'Either User is blocked by the other'
                            console.log(message)
                            return message;
                        } else if (user2.bannedUsers.length !== 0 && user2.bannedUsers.includes(user._id)) {
                            let message = 'Either User is blocked by the other'
                            console.log(message)
                            return message;
                        } else {
                            makeCall()
                        }
                    }
                    else {
                        makeCall()
                    }
                }

                const makeCall = async () => {
                    let call = new Call({ user: [user._id, user2._id] });
                    await call.save();
                    const channelName = call._id;
                    socket.callId = call._id;
                    connectedUser[0].callId = call._id
                    console.log('my socket other user id ' + socket.user._id)
                    console.log('other user socket my user id ' + connectedUser[0].user._id)
                    const uid1 = 12345678
                    const uid2 = 87654321
                    // console.log('user 1 :' + socket.user.name + '  emoji  ' + socket.user.emoji)
                    // console.log('user 2 :' + connectedUser[0].user.name + '  emoji  ' + connectedUser[0].user.emoji)
                    console.log(socket.user)
                    console.log('emiiting socket')
                    connectedUser[0].emit('searching', { user: socket.user, channelName: channelName, uid: uid1 });
                    socket.emit('searching', { user: connectedUser[0].user, channelName: channelName, uid: uid2 });
                }
                // var found = Math.floor(Math.random() * searchingUsers.length);
                // var connectedUser = searchingUsers.splice(found, 1);
                // if (socket.user.bannedUsers.includes(connectedUser[0].user._id) || connectedUser[0].user.bannedUsers.includes(socket.user._id)) {

                // }
                // // else {
                // // const userId = await User.aggregate([{ $match: { role: false, _id: { $ne: socket.user._id } } }, { $sample: { size: 1 } }])
                // let call = new Call({ user: [socket.user._id, connectedUser[0].user._id] });
                // await call.save();
                // const channelName = call._id;
                // socket.callId = call._id;
                // connectedUser[0].callId = call._id
                // // console.log('my socket other user id ' + socket.user._id)
                // // console.log('other user socket my user id ' + connectedUser[0].user._id)
                // const uid1 = 12345678
                // const uid2 = 87654321
                // // console.log('user 1 :' + socket.user.name + '  emoji  ' + socket.user.emoji)
                // // console.log('user 2 :' + connectedUser[0].user.name + '  emoji  ' + connectedUser[0].user.emoji)
                // connectedUser[0].emit('searching', { user: socket.user, channelName: channelName, uid: uid1 });
                // socket.emit('searching', { user: connectedUser[0].user, channelName: channelName, uid: uid2 });
                // // }
            }
        } catch (error) { socket.emit('searching', { error: error }); }
    })

    socket.on('endSearching', async () => {
        try {
            console.log('endSearching');
            const ActiveSocket = searchingUsers.find(s => s.id === socket.id);
            if (ActiveSocket) { searchingUsers.splice(ActiveSocket, 1) }
            console.log('endSearching' + searchingUsers.length)
            socket.emit('endSearching', { msg: 'Searching Ended Succesfully' })
        } catch (err) { socket.emit('endSearching', { error: error }); }
    })

    socket.on('callEnd', async (data) => {
        console.log('callEnd');
        const user2Id = data.userId;
        const callId = socket.callId;
        console.log("callId " + callId)
        var connectedUser = allUsers.find(s => s.userId === JSON.stringify(user2Id));
        console.log('connectedUser ' + connectedUser)
        const ActiveSocket = searchingUsers.find(s => s.id === socket.id);
        if (ActiveSocket) { searchingUsers.splice(ActiveSocket, 1) }
        const otherSocket = searchingUsers.find(s => s.id === connectedUser.id);
        if (otherSocket) { searchingUsers.splice(otherSocket, 1) }
        const msg = 'Call Ended Successfuly'
        connectedUser.emit('callEnd', { msg, callId })
        socket.emit('callEnd', { msg, callId })
    })

    socket.on('callCancel', async (data) => {
        console.log('callCancel');
        const callId = socket.callId;
        const user2Id = data.userId;
        const a = await Call.findByIdAndRemove(callId);
        var connectedUser = allUsers.find(s => s.userId === JSON.stringify(user2Id));
        // console.log('connectedUser ' + connectedUser)
        const ActiveSocket = searchingUsers.find(s => s.id === socket.id);
        if (ActiveSocket) { searchingUsers.splice(ActiveSocket, 1) }
        const otherSocket = searchingUsers.find(s => s.id === connectedUser.id);
        if (otherSocket) { searchingUsers.splice(otherSocket, 1) }
        connectedUser.emit('callCancel', { msg: 'call Cancel by other user' })
        socket.emit('callCancel', { msg: 'call Cancel' })
    })

    socket.on('disconnect', async () => {
        if (allUsers.length) {
            var activeSocket = allUsers.find(s => s.id === socket.id);
            var ActiveSocket;
            if (searchingUsers.includes(socket.id))
                ActiveSocket = searchingUsers.find(s => s.id === socket.id);
            await allUsers.splice(activeSocket, 1)
            await searchingUsers.splice(ActiveSocket, 1)
            console.log('disconnected')
            // console.log(allUsers.length)
            // console.log(searchingUsers.length)
        }
    });
});




module.exports = io;