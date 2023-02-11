import express from "express"
import process from "process";

const app = express();
const port = 3000;

app.use(express.json())

app.post('/connections', (req, res) => {
    console.log(req)

    let nick = {
        "test": 'asdf'
    }
    return res.send(nick);
});

app.listen(port, () => {
    console.log("Pod IP: " + process.env.POD_IP);
    console.log(`server started at http://localhost:${port}`)
});

// Making sure the process exits on ctrl + c.
process.on('SIGINT', function () {
    console.log("Caught interrupt signal")

    process.exit()
});