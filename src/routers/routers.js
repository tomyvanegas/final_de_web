const { Router} = require("express");
const router = Router();
const apiRoute = '/api';
const adminController= require('../controllers/admin_controller')
const ticketController = require('../controllers/ticket_controller')

//ticket
router.get(apiRoute+'/ticket',ticketController.getAll)
router.get(apiRoute+'/ticket/:id',ticketController.getById)
router.post(apiRoute+'/ticket',ticketController.create)
router.put(apiRoute+'/ticket/:id',ticketController.update)
router.delete(apiRoute+'/ticket/:id',ticketController.delete)

//admim
router.get(apiRoute+'/admin',adminController.getAll)
router.get(apiRoute+'/admin/:id',adminController.getById)
router.post(apiRoute+'/admin',adminController.create)
router.put(apiRoute+'/admin/:id',adminController.update)
router.delete(apiRoute+'/admin/:id',adminController.delete)

module.exports = router;