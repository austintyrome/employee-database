const db = require("./lib/database")
const Ask = require("./lib/input")

db.connectToDatabase()
// async function init(){
//     const result = await db.getData("SELECT * FROM department");
// console.log(result.rows);
// }
// init();
const app = new Ask(db)
app.init();
