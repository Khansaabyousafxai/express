const app = require('express')
const router = app.Router()
const {getAllProducts,addproduct} = require('./Controller')
//getallproduct
router.get('/products', getAllProducts)

//addproducts
router.post('/addproduct', addproduct)


module.exports = router