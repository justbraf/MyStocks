import { custCollection } from "./myMongo.js"

const getCustomers = (res) => {
    custCollection
        .find(
            {},
            {
                limit: 15,
                sort: { birthdate: -1 }
            }
        )
        .project(
            {
                tier_and_details: 0,
                accounts: 0
            }
        )
        .toArray()
        .then(results => {
            if (!results) {
                res.status(400).json({ "error": "No customers found" })
                return
            }
            for (let doc of results) {
                if (doc.name) {
                    let [firstname, lastname] = doc.name.split(" ")
                    doc.firstname = firstname
                    doc.lastname = lastname
                    delete doc.name
                }
            }
            res.status(200).json(results)
        })
}

export { getCustomers }