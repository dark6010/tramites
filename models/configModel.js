var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
//tipo hace referencia a materias internas y externas ref orig asignaturas
var configSchema = new Schema({
	'serial' : Number,
  'name' : String,
  'calendar': {}
});
module.exports = mongoose.model('config', configSchema);
