import express from 'express'
import { PORT } from './config.js'
import { getCustomers } from './customers.js'
import { getTransactions } from './transactions.js'
import { addToFaves } from './myFaves.js'

const app = express()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Refer to documentation for API endpoints.</h1>')
})

app.get('/customers', (req, res) => {
    getCustomers(res)
})

app.get('/transactions/:custID', (req, res) => {
    const cID = req.params.custID
    if (isNaN(cID)) {
        res.status(400).json({ "error": "Customer ID must be a number" })
        return
    }
    getTransactions(res, cID)
})

app.post('/customers/add/:custID', (req, res) => {
    const cID = req.params.custID
    if (isNaN(cID)) {
        res.status(400).json({ "error": "Customer ID must be a number" })
        return
    }
    addToFaves(res, parseInt(cID))
})