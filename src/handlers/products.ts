import { Request, Response } from "express"
import Product from "../models/Product.model"

const createProduct = async (req: Request, res: Response) => {
  console.log('Create product!')
  try {
    const product = await Product.create(req.body)
    res.status(201).json({ data: product })
  } catch(err) {
    res.status(400).json({error: err})
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) return res.status(404)
                            .json({error: 'An item with the provided id does not exist in the database'}) 
    res.json({ data: product })
  } catch(err) {
    res.status(400).json({error: err})
  }
}

const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id)

  if (!product) return res.status(404).json({error: 'The item doesn\'t exist'})

  await product.update(req.body)

  res.json({data: product})
}

const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id)

  if (!product) return res.status(404).json({error: 'Item doesn\'t exist'})

  await product.destroy()
  const products = await Product.findAll()
  
  res.json({message: 'Item deleted successfully!', data: products})
}

export { createProduct, getProductById, updateProduct, deleteProduct }