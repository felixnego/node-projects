const {
    isMainThread,
    Worker,
    workerData
} = require("worker_threads");


if (isMainThread) {
    new Worker(__filename, {
        workerData: [7, 6, 2, 3]
    });
    new Worker(__filename, {
        workerData: [1, 3, 4, 3]
    });
} else {
    console.log("In a worker");
    console.log(`${workerData} sorted is ${workerData.sort()}`);
}
