const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const createProduct = async (request, response) => {
    // response.send('create product')
    console.log(request.body)
    const product = await Product.create(request.body)
    response.status(StatusCodes.CREATED).json({product})
}

const getAllProducts = async (request, response) => {
    const products = await Product.find({})
    response.status(StatusCodes.OK).json({products})
    // response.send('list of products')
}

module.exports = {
    createProduct,
    getAllProducts
}
