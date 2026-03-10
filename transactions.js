import { transCollection } from "./myMongo.js"

const getTransactions = (res, custID) => {
    transCollection
        .findOne({ account_id: parseInt(custID) })
        .then(results => {
            if (!results)
                results = { error: `No transactions found for account id: ${custID}` }
            res.status(200).json(results)
        })
}

export { getTransactions }