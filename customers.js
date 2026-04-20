import { custCollection } from "./myMongo.js"

const formatName = (doc) => {
    // check if the name key of the current index exist
    if (doc.name) {
        // split the full name by the space character and store the first part in first name and the second part in surname
        let [firstname, lastname] = doc.name.split(" ")
        doc.firstname = firstname // create a new field in the document called firstname
        doc.lastname = lastname // create a new field in the document called lastname
        delete doc.name //remove the original field from the document called name
    }
    return doc
}

/* 
function to retrieve a list of customers as an array of documents

three parameters: 
* res - response object used to send data to client.
* page - specifies which page of documents to retieve, defaults to a value of 1, if not provided.
* pageSize - sets the number of docmuents to retrieve per page, defaults to a value of 9, if not provided.
*/
const getCustomers = (res, page = 1, pageSize = 9) => {
    // convert requested page number into the number of records to skip
    let numDocsToSkip = (page - 1) * pageSize

    custCollection
        .find(
            {}, //find every document in the collection
            {
                limit: pageSize, // only retrieve the number of docmuents specified here
                skip: numDocsToSkip,
                sort: { birthdate: -1 } // sort results by specified field in ascending (1) or descending (-1) order
            }
        )
        .project( //specify fields, 0 means exclude and 1 means include
            {
                tier_and_details: 0,
                // accounts: 0
            }
        )
        .toArray() // find() returns a cursor object, so toArray() converts it to an array of documents
        .then(results => {
            //  check to see if the results are empty and send an error message if they are
            if (!results) {
                res.status(400).json({ "error": "No customers found." })
                return
            }
            // this for loop iterates through each of the indexes of an array of an unknown size
            for (let doc of results) {
                doc = formatName(doc)
            }

            // send the curated data to the client
            res.status(200).json(results)
        })
}

// reireve a single customer record
const getCustomer = (res, uname) => {
    custCollection
        .findOne({ username: uname })
        .project( //specify fields, 0 means exclude and 1 means include
            {
                // tier_and_details: 0,
            }
        )
        .then(result => {
            if (!result) {
                res.status(400).json({ "error": "No customer found." })
                return
            }
            result = formatName(result)
            res.status(200).json(result)
        })
}

export { getCustomers, getCustomer }