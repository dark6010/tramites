var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    calendar: {},
    tramites: [{
      	type: Schema.Types.ObjectId,
	 	    ref: 'tramite'
    }],
    nacimiento: Date,
    direccion: String,
    celular: String,
    telefono: String,
    correo: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
