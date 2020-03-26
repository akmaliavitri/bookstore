const {Admin, Book, Customer, Transaction} = require('../models')
const {checkPassword} = require('../helpers/checkPassword');

class Controller {
    static home(req, res){
        res.render('home.ejs')
    }

    static findBooksCustomer(req, res){
        Book.findAll({})
        .then(data => {
            res.render('bookCustomer.ejs', {data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static registrasiForm(req, res){
        res.render('registrasi.ejs')
    }

    static registrasi(req, res){

        req.body.createdAt = new Date()
        req.body.updateAt = new Date()

        Customer.create(req.body)
        .then(data => {
            res.redirect('/book')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static bookDetailCustomerForm(req, res){
        const id = Number(req.params.id)

        Book.findByPk(id)
        .then(data => {
            res.render('detailBookCustomer.ejs', {data})
        }) 
        .catch(err => {
            res.send('err')
        })
    }

    // ADMIN

    static findBooksAdmin(req, res){
        Book.findAll({})
        .then(data => {
            res.render('bookAdminList.ejs', {data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static addBookAdminForm(req, res){
        res.render('addBookAdminForm.ejs')
    }

    static addBookAdmin(req, res){
        req.body.createdAt = new Date()
        req.body.updateAt = new Date()

        Book.create(req.body)
        .then(data => {
            res.redirect('/bookAdmin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editBookAdminForm(req, res){

        const id = Number(req.params.id)

        Book.findByPk(id)
        .then(data => {
            res.render('editBookAdmin.ejs', {data})
        })
        .catch(err => {
            res.send('err')
        })
    }

    static editBookAdmin(req, res){
        const id = req.params.id

        Book.update(req.body, {where : {id}})
        .then(() => {
            res.redirect('/bookAdmin')
        })
        .catch(err => {
            res.send('err')
        })
    }

    static deleteBookAdmin(req, res){
        const id = req.params.id

        Book.destroy({where : {id}})
        .then(data => {
            res.redirect('/bookAdmin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showLoginAdmin(req, res) {
        res.render('loginAdmin')
    }

    static loginAdmin(req, res) {
        let fields = req.body
        let foundData = null
        Admin.findOne({
            where: {
                username: fields.username
            }
        })
        .then(data => {
            if(data) {
                foundData = data;
                return checkPassword(fields.password, data.password)
            }
        })
        .then(success => {
            if(success) {
                req.session.adminId = foundData.id;
                res.redirect('/bookAdmin')
            } else {
                res.send('Invalid Username/Password')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logoutAdmin(req, res) {
        req.session.destroy((err) => {
            if(err) {
                res.send(err);
            } else {
                res.redirect('/admin/login');
            }
        })
    }
}

module.exports = Controller