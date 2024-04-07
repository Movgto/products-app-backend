import request from 'supertest'
import server from '../../server'
import colors from 'colors'

describe('POST /products request', () => {
  it('returns errors when the request body data is empty', async () => {
    const res = await request(server).post('/products').send({})
    console.log(colors.yellow('Product data validation console log'))
    console.log(res.body)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toHaveLength(4)
  })

  it('returns an error when the name is empty', async () => {
    const res = await request(server).post('/products').send({
      name: '',
      price: 10
    })
    console.log(colors.yellow('Product data validation console log'))
    console.log(res.body)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toHaveLength(1)
    expect(res.body.error[0].msg).toBe('Name cannot be empty')
  })

  it('returns errors when the price is empty', async () => {
    const res = await request(server).post('/products').send({
      name: 'Test item'
    })
    console.log(colors.yellow('Product data validation console log'))
    console.log(res.body)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toHaveLength(3)
  })

  it('returns an errors when the price is less or equal 0', async () => {
    const res = await request(server).post('/products').send({
      name: 'Test item',
      price: -1
    })
    console.log(colors.yellow('Product data validation console log'))
    console.log(res.body)
    expect(res.body).toHaveProperty('error')
    expect(res.body.error).toHaveLength(1)
    expect(res.body.error[0].msg).toBe('Price must be greater than 0')
  })

  it('creates a new product', async () => {
    const testItem = {
      name: 'Test item',
      price: 10
    }
    const res = await request(server).post('/products').send(testItem)

    expect(res.status).toBe(201)    
    expect(res.body.data.name).toBe(testItem.name)
    expect(res.status).not.toBe(200)
    expect(res.status).not.toBe(400)
  })
})

describe('GET /products request', () => {
  it('gets the products data', async () => {
    const response = await request(server).get('/products')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')
    expect(response.body).not.toHaveProperty('error')
  })
})