const ingreso = require('../models/ingreso')
const pool = require('./dbconnection')
const ticket_repository = {}

ticket_repository.getAll = () => {
  const context =  pool()
  return context.query('select * from course')
}

ticket_repository.getById = (id) => {
  const context =  pool()
  return context.query('select * from course where id=$1',[id])
}

ticket_repository.create = (Ingreso) => {
  const context =  pool()
  return context.query('insert into ingreso (placa,fechaentrada,horaentrada,celda,celdadisponible) values ($1,$2,$3,$4,$5) RETURNING placa',[Ingreso.placa,Ingreso.fechaentrada,Ingreso.horaentrada,Ingreso.celda,Ingreso.celdadisponible])
}

ticket_repository.update = (course) => {
  const context =  pool()
  return context.query('update course SET description = $2,teacher=$3 where id=$1',[course.Id,course.Description,course.Teacher])
}

ticket_repository.delete = (id) => {
  const context =  pool()
  return context.query('delete from course where id=$1',[id])
}
module.exports = ticket_repository;