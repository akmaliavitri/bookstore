const {Router} = require('express')
const router = Router()

const Controller = require('../controllers/controller.js')

function requireAdminLogin(req, res, next) {
    if(!req.session.adminId) {
        res.redirect('/admin/login');
    } else {
        next();
    }
}

function requireUserLogin(req, res, next) {
    if(!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}

router.get('/', Controller.home)
router.get('/registrasi', Controller.registrasiForm)
router.post('/registrasi', Controller.registrasi)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/logout', Controller.logout)
router.get('/book', Controller.findBooksCustomer)
router.get('/book/detail/:id', Controller.bookDetailCustomerForm)
router.get('/buy/:id', requireUserLogin, Controller.buyForm)
router.post('/buy/:id', requireUserLogin, Controller.buy)
router.get('/buysuccess', requireUserLogin, Controller.buySuccess)

router.get('/admin/login', Controller.showLoginAdmin)
router.post('/admin/login', Controller.loginAdmin)
router.get('/admin/logout', Controller.logoutAdmin)

router.get('/bookAdmin', requireAdminLogin, Controller.findBooksAdmin)
router.get('/book/add', requireAdminLogin, Controller.addBookAdminForm)
router.post('/book/add', requireAdminLogin, Controller.addBookAdmin)
router.get('/book/edit/:id', requireAdminLogin, Controller.editBookAdminForm)
router.post('/book/edit/:id', requireAdminLogin, Controller.editBookAdmin)
router.get('/book/delete/:id', requireAdminLogin, Controller.deleteBookAdmin)


module.exports = router