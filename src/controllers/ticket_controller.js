const ticketController = {};
const ticket = require('../models/ticket');
const ticket_repository = require('../repositories/ticket_repository')


ticketController.getAll = (req, res) => {
    //logica para listar todos los cursos
    ticket_repository.getAll()
        .then((tickets) => {
            //si devuelve mas de un registro
            if (tickets.rows.length == 0) {
                res.status(400).send('Not Found');
            }
            res.json(tickets.rows);
        })
        .catch((error) => {
            res.status(500).send(error.stack);
        })
}

ticketController.getById = (req, res) => {
    const id = req.params['id']
    ticket_repository.getById(id)
        .then((tickets) => {
            if (tickets.rows.length == 0) {
                res.status(400).send({});
            }
            res.json(tickets.rows);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

ticketController.create = (req, res) => {
    //capturar body request
    const newCourse = req.body;
    //crear modelo tipo course
    let course = new Course(null,newCourse.description,newCourse.teacher)
    //llamar metodo del repository y enviamos objeto modelo
    ticket_repository.create(course)
        .then((resp) => {
            if (resp.rows.length == 0) {
                res.status(400).send({});
            }
            //si inserto correctamente
            course.Id = resp.rows[0].id
            res.status(201).send(course);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
ticketController.update = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    //capturamos body request
    const newCourse = req.body;
    //crear modelo tipo course
    let course = new Course(id,newCourse.
         description,newCourse.teacher)
    ticket_repository.update(course)
        .then((resp) => {
            //si actualizo correctamente
            res.status(200).send(course);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
ticketController.delete = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    ticket_repository.delete(id)
        .then((resp) => {
            //si elimino correctamente
            res.status(200);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

module.exports = ticketController
