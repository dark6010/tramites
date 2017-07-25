*{
  "serial": "numero",
  "date": "fecha",
  "string":["nombre", "carrera", "ci"]
},
certificacion_de_estudios{
  "string": ["pasaporte", "codigoSis", "periodo", "nacionalidad", "sexo"]
},
admision especial{
  "string": ["sexo"]
},
reincorporacion{
  "string": ["periodo", "sexo"]
},
suspencion temporal{
  "string": ["pasaporte", "periodo"]
},
estudio simultaneo{
  "string": ["acarrera", "sexo"]
},
cambio de carrera{
  "string": ["acarrera"]
},
traspaso a otra universidad{
  "string": ["pasaporte", "universidad", "acarrera", "ciudad de origen", "estudiante:[antiguo, nuevo]", "sexo"]
  "number": ["materias aprobadas", "materias reprobadas"]
},
  cuidado campo carrera 
traspaso de otra universidad{
  "string": ["pasaporte", "universidad", "acarrera", "ciudad de origen", "estudiante:[antiguo, nuevo]", "sexo"]
  "number": "materias aprobadas"
},
traspaso del exterior{
  "string": ["pasaporte","acarrera", "ciudad de origen", "estudiante:[antiguo, nuevo]"]
},
examen de gracia{
  "string": ["materia", "examen:[teorico, practico]", "sexo"]
},
convalidacion{
  "string": ["universidad", "acarrera", "ciudad de origen", "sexo", "facultad","tipo:[otra carrera de la misma facultad, otra facultad de la misma universidad, otra carrera y facultad del sistema universitario, universidad extranjera, interna]"]
},
  
  sin poder{suspencion temporal, cambio de carrera, }
natural de ciudad origen
que es informe de facultad
teorico o practico o teorico y practico
tipo de convalidacion
carreras nombre de las carreras y si los mismos deben estar completos o simplificados
3 codigos el del formulario facil para personal
  numero de formulario
  coddigo de verficacion{podria ser el mismo si no importa que las personas vean}