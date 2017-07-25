certificacion de estudios{
  serial: "numero",
  date: "fecha",
  string: ["nombre", "pasaporte", "carrera", "codigoSis", "periodo", "nacionalidad"]
}
inscripcion especial{
  serial: "numero",
  date: "fecha",
  string: ["nombre", "carrera"]
}
reincorporacion{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "carrera", "periodo"]
}
suspencion temporal{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "pasaporte", "carrera", "periodo"]
}
estudio simultaneo{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "carrera", "acarrera"]
}
cambio de carrera{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "carrera", "acarrera"]
}
traspaso a otra universidad{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "pasaporte", "carrera", "universidad", "acarrera", "natural de", "antiguo o nuevo"]
  number: "materias aprobadas"
}
traspaso del exterior{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "pasaporte", "carrera", "acarrera", "natural", "nuevo", "antiguo"]
}
examen de gracia{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "carrera", "materia", "teorico", "practico"]
}
convalidacion{
  serial: "numero"
  date: "fecha"
  string: ["nombre", "carrera", "universidad", "informe de facultad", "natural", "tipo"]
}