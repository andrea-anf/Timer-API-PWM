const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  t_start: {type: Date, required: true},
  t_end: {type: Date, required: true},
  finished: {type: Boolean, required: true},
  date: {type: Date, required: true},
  
  tag: {type: String, required: false, default: 'None'},
  note: {type: String, required: false, maxlength: 200}
});

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sessions: {type: [sessionSchema]}
});

module.exports = mongoose.model('User', userSchema);


