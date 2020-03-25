const {Router} = require('express')
const router = Router()

const Controller = require('../controllers/controller.js')

router.get('/', Controller.home)
router.get('/registrasi', Controller.registrasiForm)
router.post('/registrasi', Controller.registrasi)
router.get('/book', Controller.findBooksCustomer)

router.get('/bookAdmin', Controller.findBooksAdmin)
router.get('/book/add', Controller.addBookAdminForm)
router.post('/book/add', Controller.addBookAdmin)
router.get('/book/edit/:id', Controller.editBookAdminForm)
router.post('/book/edit/:id', Controller.editBookAdmin)
router.get('/book/delete/:id', Controller.deleteBookAdmin)

module.exports = router