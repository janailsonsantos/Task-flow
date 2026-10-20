import {DatabaseSync} from "node:sqlite"

const db = new DatabaseSync("database.sqlite")

export default db;