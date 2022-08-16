const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {
        // event loop is blocked here. non-IO operation
    }
}
app.get("/", (req, res) => {
    res.send(`Performance example from ${process.pid}`);
});

app.get("/timer", (req, res) => {
    // deplay the response
    delay(9000);
    res.send("Ding ding ding!");
})

if (cluster.isMaster) {
    console.log("Master has been started");
    const NUM_WORKERS = os.cpus().length;

    for (let core = 0; core < NUM_WORKERS; core++) {
        cluster.fork();
    }
} else {
    console.log("Worker process started.");
    app.listen(3000);
}
