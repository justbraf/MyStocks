import { ObjectId } from "mongodb"
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
                .deleteOne({ customerID: custID })
                .then(result => {
                    if (result.deletedCount > 0) {
                        res.status(200).json({ message: "Deleted successfully." })
                    }
                    else
                        res.status(200).json({ error: "An occurred while attempting to delete that customer." })
                })
        })
}

const updateMemo = (res, fID, theMemo) => {
    // convert fID to ObjectID
    fID = new ObjectId(fID)

    // update the memo field with the new value.
    const query = { _id: fID }
    const updateData = {
        $set: {
            memo: theMemo
        }
    }
    const options = { upsert: true }
    favesCollection
        .updateOne(query, updateData, options)
        .then(result => {
            if (result.matchedCount == 0 || result.modifiedCount == 0) {
                res.status(400).json({
                    error: `Update failed: ${result.matchedCount} documents found and ${result.modifiedCount} documents updated.`
                })
                return
            }
            res.status(200).json({
                message: "Memo upadted successfully."
            })
        })
}

export { addToFaves, deleteFromFaves, updateMemo }