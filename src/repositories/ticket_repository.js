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

ticket_repository.create = (course) => {
  const context =  pool()
  return context.query('insert into course (description,teacher) values ($1,$2) RETURNING id',[course.Description,course.Teacher])
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