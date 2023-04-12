var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new Schema
({

    names: { type: String, lowercase: true, required: true, unique: true},
    email: { type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true}

});

// mongoose middleware for encrypt the password

UserSchema.pre('save', function (next)
{
    var user = this;
    // implementing bcrypt for data encryption
    bcrypt.hash(user.password, null, null, function (err, hash)
    {
        if (err) return next(err);
        user.password = hash;
        next();
    });

});

module.exports = mongoose.model('User', UserSchema);