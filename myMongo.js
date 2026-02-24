import { MongoClient, ServerApiVersion } from "mongodb";
import { MDBURI } from "./config.js";


const client = new MongoClient(MDBURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const analDB = client.db("sample_analytics")
const custCollection = analDB.collection("customers")
const transCollection = analDB.collection("transactions")

export { custCollection, transCollection }