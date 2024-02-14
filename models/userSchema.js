const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true,
    default: ''
  },
  votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vote'
  }]
},
{
  timestamps: true
});

// Hash the password before saving the user model
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Remove password from user object before sending it to the client
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;