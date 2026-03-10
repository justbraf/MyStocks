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

const deleteFromFaves = (res, custID) => {
    favesCollection
        .countDocuments({ customerID: custID })
        .then(counted => {
            if (counted == 0) {
                res.status(200).json({ error: `Customer ID: ${custID} doesn't exist.` })
                return
            }
            favesCollection
            .deleteOne({customerID: custID})
            .then(result => {
                if (result.deletedCount > 0){
                    res.status(200).json({ message: "Deleted successfully."})
                }
                else
                    res.status(200).json({ error: "An occurred while attempting to delete that customer."})
            })
        })
}

export { addToFaves, deleteFromFaves }