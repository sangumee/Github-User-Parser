/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
YOU NEED TO USE ENVIRONMENT VARS TO HIDE PERSONAL INFORMATION.
FIX .env FILE AND USE IT.

CHECK THIS DOCUMENT `https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa`
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

You don't need to fix this file. Check .env file to fix some variables.
*/

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected');  // Connect Success
});

module.exports = db;