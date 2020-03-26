const {Admin, Book, Customer, Transaction} = require('../models')
const {checkPassword} = require('../helpers/checkPassword')
const {hashPassword} = require('../helpers/hashPassword')

class Controller {
    static home(req, res){
        Book.findAll().then(books => {
            res.render('home.ejs', {books, username: req.session.username})
        })
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

    static loginForm(req, res) {
        res.render('loginUser.ejs')
    }

    static login(req, res) {
        let fields = req.body
        let foundData = null
        Customer.findOne({
            where: {
                username: fields.username
            }
        })
        .then(data => {
            if(data) {
                foundData = data
                return checkPassword(fields.password, data.password)
            }
        })
        .then(success => {
            if(success) {
                req.session.userId = foundData.id
                req.session.username = foundData.username
                res.redirect('/')
            } else {
                res.send('Invalid Username/Password')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static registrasiForm(req, res){
        res.render('registrasi.ejs')
    }

    static registrasi(req, res){
        hashPassword(req.body.password).then(hash => {
            req.body.password = hash
            return Customer.create(req.body)
        })
        .then(data => {
            req.session.userId = data.id
            req.session.username = data.username
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if(err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
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
            res.render('bookAdminList.ejs', {data, username: req.session.adminUsername})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static addBookAdminForm(req, res){
        res.render('addBookAdminForm.ejs', {username: req.session.adminUsername})
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
            res.render('editBookAdmin.ejs', {data, username: req.session.adminUsername})
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
                foundData = data
                return checkPassword(fields.password, data.password)
            }
        })
        .then(success => {
            if(success) {
                req.session.adminId = foundData.id
                req.session.adminUsername = foundData.username
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
                res.send(err)
            } else {
                res.redirect('/admin/login')
            }
        })
    }
}

module.exports = Controller