import { favesCollection } from "./myMongo.js"


const addToFaves = (res, custID) => {
    favesCollection
        .countDocuments({ customerID: custID })
        .then(counted => {
            if (counted > 0) {
                res.status(200).json({ message: `Customer ID: ${custID} is already added.` })
                return
            }
            favesCollection
                .insertOne({ customerID: custID })
                .then(results => {
                    if (results.insertedId)
                        res.status(200).json({ message: "Customer added to favourites." })
                    else
                        res.status(400).json({ error: "An error occurred while adding to favourites." })
                })
        })
}

export { addToFaves }