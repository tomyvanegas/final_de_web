const pool = require('./dbconnection')
const admin_repository = {}

admin_repository.create = (Admin) => {
    const context =  pool()
    return context.query('insert into adminuser (username,email,password) values ($1,$2,&3) RETURNING id',[Admin.username,Admin.email,Admin.password])
  }

  module.exports = admin_repository;