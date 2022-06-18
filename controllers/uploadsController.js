const path = require('path')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary')
const fs = require('fs')

const uploadProductImageLocal = async (request, response) => {
    // console.log(request.files)
    if(!request.files) {
        throw new CustomError.BadRequestError('no file uploaded')
    }
    const productImage = request.files.image

    if(!productImage.mimetype.startWith('image')){
        throw new CustomError.BadRequestError('please upload an image')
    }

    const maxSize = 1024 * 1024

    if(productImage.size > maxSize) {
        throw new CustomError.BadRequestError('please upload image smaller than 1KB')
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)
    return response.status(StatusCodes.OK).json({ image: {src: `/uploads/${productImage.name}`} })
    // response.send('upload product image')
}

const uploadProductImage = async(request, response) => {
    const result = await cloudinary.uploader.upload(request.files.image.tempFilePath, {use_filename: true, folder: 'file-upload'})
    fs.unlinkSync(request.files.image.tempFilePath)
    return response.status(StatusCodes.OK).json({image: {src: result.secure_url}})
}

module.exports = {uploadProductImage}