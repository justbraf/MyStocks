import express from 'express'
import { PORT } from './config.js'
import { getCustomers } from './customers.js'
import { getTransactions } from './transactions.js'
import { addToFaves, deleteFromFaves, updateMemo } from './myFaves.js'

const app = express()

//middleware to parse JSON bodies in requests
app.use(express.json())

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

app.delete('/faves/remove', (req, res) => {
    const data = req.body
    deleteFromFaves(res, data.cID)
})

app.put('/memo', (req, res) => {
    // const {fID, memo} = req.body
    const data = req.body
    if (!data || !data.fID || !data.memo) {
        res.status(400).json({ error: "Corrupted or missing request data" })
        return
    }
    if (data.memo.length > 160) {
        res.status(400).json({ error: "Memo exceeds 160 characters" })
        return
    }
    updateMemo(res, data.fID, data.memo)
})