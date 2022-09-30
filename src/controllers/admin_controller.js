const adminController = {};
const admin = require('../models/admin')
const admin_repository = require('../repositories/admin_repository')


adminController.getAll = (req, res) => {
    //logica para listar todos los cursos
    admin_repository.getAll()
        .then((admin) => {
            //si devuelve mas de un registro
            if (admins.rows.length == 0) {
                res.status(400).send('Not Found');
            }
            res.json(admin.rows);
        })
        .catch((error) => {
            res.status(500).send(error.stack);
        })
}

adminController.getById = (req, res) => {
    const id = req.params['id']
    admin_repository.getById(id)
        .then((admin) => {
            if (admin.rows.length == 0) {
                res.status(400).send({});
            }
            res.json(admin.rows);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

adminController.create = (req, res) => {
    //capturar body request
    const newAdmin = req.body;
    //crear modelo tipo admin
    let Admin = new admin(newAdmin.username,newAdmin.email,newAdmin.password)
    //llamar metodo del repository y enviamos objeto modelo
    admin_repository.create(Admin)
        .then((resp) => {
            if (resp.rows.length == 0) {
                res.status(400).send({});
            }
            //si inserto correctamente
            Admin.Id = resp.rows[0].id
            res.status(201).send(Admin);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
adminController.update = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    //capturamos body request
    const newadmin = req.body;
    //crear modelo tipo course
    let Admin = new admin(id,newadmin.username,newadmin.email,newadmin.password)
    admin_repository.update(Admin)
        .then((res) => {
            //si actualizo correctamente
            res.status(200).send(course);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
adminController.delete = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    admin_repository.delete(id)
        .then((res) => {
            //si elimino correctamente
            res.status(200);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

module.exports = adminController