let mongoose = require('mongoose')
let Schema = mongoose.Schema;

module.exports = mongoose.model('history', new Schema({
    from: { type: String, required:true },
    to: { type: String, required:true },
    value: { type: Number, default:0,required:true},
    convertedvalue: { type: Number, default:0,required:true},
    querydate:{type:Date}
}));

