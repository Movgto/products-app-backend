import { Router } from "express";
import { createProduct, deleteProduct, getProductById, updateProduct } from "../handlers/products";
import { body, param } from "express-validator";
import { productValidation } from "../middleware";
import Product from "../models/Product.model";

const productsRouter = Router()

/**
 * @swagger
 * components:
 *    schemas:
 *        Product:
 *            type: object
 *            properties:
 *                id:
 *                    type: integer
 *                    description: The ID of the Product
 *                    example: 1
 *                name:
 *                    type: string
 *                    description: Name of the Product
 *                    example: Soccer ball
 *                price:
 *                    type: float
 *                    description: Price of the Product
 *                    example: 99.99
 *                availability:
 *                    type: boolean
 *                    description: Product availability
 *                    example: true
 */

/**
 * @swagger
 * /products:
 *    get:
 *        summary: Gets a list of Products
 *        tags:
 *            - Products
 *        description: Returns a list of Products
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#/components/schemas/Product'
 * 
 * 
 */

productsRouter.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    res.json({ data: products })
  } catch(err) {
    res.status(400).json({error: err})
  }
})

/**
 * @swagger
 * /products/{id}:
 *    get:
 *        summary: Gets a product by its ID
 *        tags:
 *            - Products
 *        description: Returns a product
 *        parameters:
 *          - in: path
 *            name: id
 *            description: Id of the Product to get
 *            required: true
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            404:
 *                description: The item was not found in the database
 *            400:
 *                description: Bad request - Invalid Product ID            
 */

productsRouter.get('/:id',
  param('id').isInt().withMessage('The id provided is not valid'),
  productValidation,
  getProductById
)

/**
 * @swagger
 * /products:
 *    post:
 *        summary: Creates a new product
 *        tags:
 *            - Products
 *        description: Adds a new product to the database
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: Product name example
 *                            price:
 *                                type: float
 *                                example: 99.99
 *        responses:
 *            201:
 *                description: A new Product was successfully created
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad request - One or more fields were not valid for creating a Product
 *            
 */

productsRouter.post('/',
  body('name')
  .notEmpty().withMessage('Name cannot be empty'),
  body('price')
  .notEmpty().withMessage('Price must not be empty')
  .isNumeric().withMessage('price must be a number')
  .custom(value => value > 0).withMessage('Price must be greater than 0'),
  productValidation,
  createProduct
)

/**
 * @swagger
 * /products/{id}:
 *    put:
 *        summary: Updates a product
 *        tags:
 *            - Products
 *        description: Modifies an existing product from the database
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: Product name example
 *                            price:
 *                                type: float
 *                                example: 99.99
 *                            availability:
 *                                type: boolean
 *                                example: false
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to update
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad Request - Invalid input data
 *            404:
 *                description: Not Found - Could not find a Product with the given ID
 *            
 *            
 */

productsRouter.put('/:id',
  param('id')
  .isInt().withMessage('Provided Id is not valid'),
  body('price')
  .isNumeric().withMessage('Price must be a number')
  .custom(value => value > 0).withMessage('Price must be greater than 0'),
  body('availability')
  .isBoolean().withMessage('This field must be of boolean type'),
  productValidation,
  updateProduct
)

/**
 * @swagger
 * /products/{id}:
 *    delete:
 *        summary: Deletes a Product
 *        tags:
 *            - Products
 *        description: Removes a Product from the database
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            schema:
 *                type: integer
 *        responses:
 *            200:
 *                description: Product deleted successfully
 *            404:
 *                description: Not Found - Product with the given ID was not found in the database
 *            400:
 *                description: Bad Request - Invalid input data
 */

productsRouter.delete('/:id',
  param('id').isInt().withMessage('The provided Id is not valid'),
  productValidation,
  deleteProduct
)

export default productsRouter