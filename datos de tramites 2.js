*{
  "serial": "numero",
  "date": "fecha",
  "string":["nombre", "carrera", "ci"]
},
certificacion_de_estudios{
  "string": ["pasaporte", "codigoSis", "periodo", "nacionalidad"]
},
inscripcion especial{
},
reincorporacion{
  "string": ["periodo"]
},
suspencion temporal{
  "string": ["pasaporte", "periodo"]
},
estudio simultaneo{
  "string": ["acarrera"]
},
cambio de carrera{
  "string": ["acarrera"]
},
traspaso a otra universidad{
  "string": ["pasaporte", "universidad", "acarrera", "natural de", "antiguo o nuevo"]
  "number": "materias aprobadas"
},
traspaso de otra universidad{
  "string": ["pasaporte", "materia", "acarrera", "natural de", "antiguo o nuevo"]
  "number": "materias aprobadas"
},
traspaso del exterior{
  "string": ["pasaporte","acarrera", "natural", "nuevo", "antiguo"]
},
examen de gracia{
  "string": ["materia", "teorico", "practico"]
},
convalidacion{
  "string": ["universidad", "informe de facultad", "natural", "tipo"]
},
natural de ciudad origen