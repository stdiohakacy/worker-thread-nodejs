const { Worker } = require("worker_threads");

const limit = 1000000;
const threads = 10;
const namesPerThread = limit / threads;
const outputFile = `${__dirname}/output/data.txt`;

let names = [...Array(threads)].fill(0);
for (let i = 0; i < threads; i++) {
    const port = new Worker(require.resolve("./worker.js"), {
        workerData: {
            namesPerThread,
            outputFile
        }
    });
    port.on("message", (data) => handleMessage(data, i));
    port.on("error", (e) => console.log(e));
    port.on("exit", (code) => console.log(`Exit code: ${code}`));
}

function handleMessage(_, index) {
    names[index]++;
}