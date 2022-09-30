const pool = require('./dbconnection')
const admin_repository = {}

admin_repository.getById = (id) => {
  const context =  pool()
  return context.query('select * from adminuser where id=$1',[id])
}

admin_repository.create = (Admin) => {
    const context =  pool()
    return context.query('insert into adminuser (username,email,password) values ($1,$2,$3) RETURNING id',[Admin.username,Admin.email,Admin.password])
  }

admin_repository.update = (Admin) => {
    const context =  pool()
    return context.query('update adminuser SET username = $2, email = $3, password = $4 where id=$1',[Admin.id,Admin.username,Admin.email,Admin.password])
  }

admin_repository.delete = (id) => {
    const context =  pool()
    return context.query('delete from adminuser where id=$1',[id])
}

  module.exports = admin_repository;