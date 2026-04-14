import { custCollection } from "./myMongo.js"

const getCustomers = (res) => {
    custCollection
        .find(
            {}, //find every document in the collection
            {
                limit: 15, //grab the first fifteen docmuents
                sort: { birthdate: -1 } //sorting by specified field in ascending (1) or descending (-1) order
            }
        )
        .project( //specify fields 0 means exclude and 1 means include
            {
                tier_and_details: 0,
                // accounts: 0
            }
        )
        .toArray() //find returns a cursor object, so toArray converts it to an array of documents
        .then(results => {
            if (!results) {
                res.status(400).json({ "error": "No customers found" })
                return
            }
            for (let doc of results) {
                if (doc.name) {
                    let [firstname, lastname] = doc.name.split(" ")
                    doc.firstname = firstname //create a new field 
                    doc.lastname = lastname
                    delete doc.name //remove the original field
                }
            }
            res.status(200).json(results)
        })
}

export { getCustomers }