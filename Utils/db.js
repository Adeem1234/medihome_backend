const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const dbString = `mongodb+srv://${dbUser}:${dbPass}@cluster0.nqrej.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (!err) console.log('Connected to DB');
    else {
        console.error(err);
        process.exit(0);
    }
});

module.exports = mongoose.connection;