import request from 'supertest'
import server from '../server'

describe('Server connection', () => {
  it('checks the the root API endpoint', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
  })
})