import express from 'express'
import { PORT } from './config.js'
import { getCustomers } from './customers.js'
import { getTransactions } from './transactions.js'
import { addToFaves, deleteFromFaves, updateMemo } from './myFaves.js'
import cors from 'cors'

const app = express()

//middleware to parse JSON bodies in requests
app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('<h1>Refer to documentation for API endpoints.</h1>')
})

// Function is redundant and slated for removal
// app.get('/customers', (req, res) => {
//     getCustomers(res)
// })

// function reutrns customers listed by a set page size
app.get('/customers/pg:page', (req, res) => {
    // set page size
    const pageSize = 12

    // retrieve page requested from URL
    const page = parseInt(req.params.page)

    // check if retireved page number is a valid value, 1 or greater. Send an error message if it is invalid
    if (!page || isNaN(page) || page < 1) {
        res.status(400).json({ "error": "Invalid URI" })
        return
    }
    
    // pass response object, page number, and pageSize data to function
    getCustomers(res, page, pageSize)
})

app.get('/transactions/:acctID', (req, res) => {
    const aID = req.params.acctID
    if (isNaN(aID)) {
        res.status(400).json({ "error": "Customer ID must be a number" })
        return
    }
    getTransactions(res, aID)
})

app.post('/faves/add/:acctID', (req, res) => {
    const aID = req.params.acctID
    if (isNaN(aID)) {
        res.status(400).json({ "error": "Account ID must be a number" })
        return
    }
    addToFaves(res, parseInt(aID))
})

app.delete('/faves/remove', (req, res) => {
    const data = req.body
    deleteFromFaves(res, data.aID)
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