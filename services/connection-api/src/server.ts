import express from "express"
import process from "process";
import { registerHandlers } from "./manualDI";

const app = express();
const port = 3000;
app.use(express.json())

// Registering all the http endpoints with the express application.
registerHandlers(app)

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
});

// Making sure the process exits on ctrl + c.
process.on('SIGINT', function () {
    console.log("Caught interrupt signal")

    process.exit()
});