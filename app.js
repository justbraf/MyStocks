import express from 'express'
import { PORT } from './config.js'
import { getCustomers } from './customers.js'

const app = express()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1><a href="/show">Goodnight Moon, Brad!</a></h1>')
})

app.get('/customers', (req, res) =>{
    getCustomers(res)
})