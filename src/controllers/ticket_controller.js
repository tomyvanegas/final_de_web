const ticketController = {};
const ingreso = require('../models/ingreso');
const factura = require('../models/factura')
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
        .then((ingreso) => {
            if (ingreso.rows.length == 0) {
                //llamar funcion 
                res.status(400).send({});
            } else {
                let data = ingreso.map((ingreso) => {
                    placa = ingreso.placa,
                    fechaingreso = ingreso.fechaingreso,
                    horaingreso = ingreso.horaingreso,
                    celda = ingreso.celda

                    console.log(data)
                    /*function calcularGarduar(data) {
                    
                        // consultar como obtener la fecha del sistema y restar horas en nodejs 
                    
                        //get horaSistema - FechaHora * Const valorH;
                    
                        //llamar metdo create -> Guardar en la tabla Facturacion Parametros -> Placa(Relacion Con tala Vehico), FechaHoraIni, FechaHoraF, valor
                    
                        // Get Facturacion
                    
                    }*/
                })

            }
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

ticketController.create = (req, res) => {
    //capturar body request
    const newIngreso = req.body;
    //crear modelo tipo course
    let Ingreso = new ingreso(newIngreso.placa, newIngreso.fechaingreso, newIngreso.horaingreso, newIngreso.celda, newIngreso.celdadisponible)
    //llamar metodo del repository y enviamos objeto modelo
    ticket_repository.create(Ingreso)
        .then((resp) => {
            if (resp.rows.length == 0) {
                res.status(400).send({});
            }
            //si inserto correctamente
            Ingreso.placa = resp.rows[0].id
            res.status(201).send(Ingreso);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
ticketController.update = (req, res) => {
    //capturamos queryParams
    const placa = req.params['placa']
    //capturamos body request
    const newIngreso = req.body;
    //crear modelo tipo course
    let Ingreso = new ingreso(null)
    ticket_repository.update(Ingreso)
        .then((resp) => {
            //si actualizo correctamente
            resp.status(200).send(Ingreso);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}
ticketController.delete = (req, res) => {
    //capturamos queryParams
    const placa = req.params['placa']
    ticket_repository.delete(placa)
        .then((resp) => {
            //si elimino correctamente
            res.status(200);
        })
        .catch((error) => {
            res.status(500).send('Not Found' + error.stack);
        })
}

module.exports = ticketController
