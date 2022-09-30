const ticketController = {};
const ticket = require('../models/ticket');
const ticket_repository = require('../repositories/ticket_repository')


ticketController.getAll = (req, res) => {
    //logica para listar todos los cursos
    ticket_repository.getAll()
        .then((ticket) => {
            //si devuelve mas de un registro
            if (ticket.rows.length == 0) {
                res.status(400).send('Not Found');
            }
            res.json(ticket.rows);
        })
        .catch((error) => {
            res.status(500).send(error.stack);
        })
}

//consultamos la plaa jks560 Retorna fechaHora y celda
ticketController.getById = (req, res) => {
    const id = req.params['id']
    ticket_repository.getById(id)
        .then((ticket) => {
            if (ticket.rows.length == 0) {
                //llamar funcion 
                 res.status(400).send({});
            }

            let var1, var2, var3;
            for (let index = 0; index < ticket.rows.length; index++) {
                //consultar como obtener valores de una consulta sql
                var1 = ticket.rows[index].fechaInicio;
                
                
            }
            consultarCalcular(var1, id);
            res.json(ticket.rows);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

function calcularGarduar(FechaHora, placa) {

    // consultar como obtener la fecha del sistema y restar horas en nodejs 

    //get horaSistema - FechaHora * Const valorH;

    //llamar metdo create -> Guardar en la tabla Facturacion Parametros -> Placa(Relacion Con tala Vehico), FechaHoraIni, FechaHoraF, valor

    // Get Facturacion

}
ticketController.create = (req, res) => {
    //capturar body request
    const newTicket = req.body;
    //crear modelo tipo course
    let Ticket = new ticket(null,newTicket.horafechaingreso,newTicket.horafechasalida,newTicket.preciohora,newTicket.total)
    //llamar metodo del repository y enviamos objeto modelo
    ticket_repository.create(Ticket)
        .then((resp) => {
            if (resp.rows.length == 0) {
                res.status(400).send({});
            }
            //si inserto correctamente
            Ticket.Id = resp.rows[0].id
            res.status(201).send(Ticket);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
ticketController.update = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    //capturamos body request
    const newTicket = req.body;
    //crear modelo tipo course
    let Ticket = new ticket(id,newTicket.fechahorasalida,newTicket.total)
    ticket_repository.update(Ticket)
        .then((resp) => {
            //si actualizo correctamente
            resp.status(200).send(Ticket);
        })
        .catch((error) => {
            resp.status(500).send('Not Found' + error.stack);
        })
}
ticketController.delete = (req, res) => {
    //capturamos queryParams
    const id = req.params['id']
    ticket_repository.delete(id)
        .then((resp) => {
            //si elimino correctamente
            resp.status(200);
        })
        .catch((error) => {
            resp.status(500).send('Not Found' + error.stack);
        })
}

module.exports = ticketController
