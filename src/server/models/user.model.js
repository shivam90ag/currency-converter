let mongoose = require('mongoose')
let Schema = mongoose.Schema;

module.exports = mongoose.model('user', new Schema({
    username: { type: String, unique: true, required:true },
    password: { type: String, required:true },
    firstname: { type: String},
    lastname: { type: String}
}));

