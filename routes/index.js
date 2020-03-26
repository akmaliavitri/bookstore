const {Router} = require('express')
const router = Router()

const Controller = require('../controllers/controller.js')

router.get('/', Controller.home)
router.get('/registrasi', Controller.registrasiForm)
router.post('/registrasi', Controller.registrasi)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/logout', Controller.logout)
router.get('/book', Controller.findBooksCustomer)
router.get('/book/detail/:id', Controller.bookDetailCustomerForm)

router.get('/admin/login', Controller.showLoginAdmin)
router.post('/admin/login', Controller.loginAdmin)
router.get('/admin/logout', Controller.logoutAdmin)

router.use((req, res, next) => {
    if(!req.session.adminId) {
        res.redirect('/admin/login');
    } else {
        next();
    }
});
router.get('/bookAdmin', Controller.findBooksAdmin)
router.get('/book/add', Controller.addBookAdminForm)
router.post('/book/add', Controller.addBookAdmin)
router.get('/book/edit/:id', Controller.editBookAdminForm)
router.post('/book/edit/:id', Controller.editBookAdmin)
router.get('/book/delete/:id', Controller.deleteBookAdmin)


module.exports = router