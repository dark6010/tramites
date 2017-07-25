var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
//tipo hace referencia a materias internas y externas ref orig asignaturas
var tramiteSchema = new Schema({
	'fecha' : Date,
	'nombre' : String,
	'carrera' : String,
	'ci' : String,
	'pasaporte' : String,
	'codigoSis' : String,
	'periodo' : String,
	'nacionalidad' : String,
	'sexo' : String,
	'acarrera' : String,
	'materia' : String,
	'ciudadOrigen' : String,
	'estudiante' : String,
	'materiasAprobadas' : Number,
	'materiasReprobadas' : Number,
	'universidad' : String,
	'examen' : String,
	'tipocon' : String,
	'afacultad' : String,
	'tipo' : String,
  'usuario': {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'ttramite' : String,
  'iporigen': String,
  'serial': Number,
});

module.exports = mongoose.model('tramite', tramiteSchema);
