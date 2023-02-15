import process from "process";
import { createGraphqlApp } from "./graphql/app";

const app = createGraphqlApp()

const port = 3000
app.listen(port, () => {
    console.log(`Connection API server started on port: ${port}`)
});

// Making sure the process exits on ctrl + c.
process.on('SIGINT', function () {
    console.log("Caught interrupt signal")

    process.exit()
});