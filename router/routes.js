const express = require('express')
const { adminLogin, bookAdd, userReg, userLogin, allBooks, viewOneBook, editBooks, deleteBook, searchBooks } = require('../controllers/logic')
const router = new express.Router()

router.get('/admin/login',adminLogin)
router.post('/admin/add/book',bookAdd)
router.put('/admin/edit/book/:id',editBooks)
router.delete('/admin/deleteBook/:id',deleteBook)


router.post('/user/reg',userReg)
router.get('/user/login',userLogin)

router.get('/list/books',allBooks)
router.get('/single/view/book/:id',viewOneBook)
router.get('/book/search/result',searchBooks)

module.exports = router