const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=\S]*)/g.test(v);
      },
      message: 'Ошибка валидации url адреса',
    },
  }
})

module.exports = mongoose.model('user', userSchema);