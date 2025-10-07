const { NekosAPI } = require("./v4/NekosAPI");
const v4 = new NekosAPI();

const argv = process.argv.slice(2);

(async () => {
    if (argv[0] === "--all" || argv[0] === "-A") {
        return Promise.all([
            v4.getRandomImage(),
            v4.getImage(),
            v4.getImages(undefined, { limit: 1 }),
            v4.getImageByID("4394")
        ])
    }
    return v4.getRandomImage("Catgirl");
})()
    .catch(err => {
        console.log(err);
        testFailed();
    })
    .then((v4res) => {
        if (v4res) {
            for (const res of Array.isArray(v4res) ? v4res : [v4res]) {
                console.log("Response: v4 image ids:", {
                    v4: res.id || "Array",
                })
            }
            return console.log("Test finished.");
        }
        else {
            return testFailed(v4res);
        }
    });

function testFailed(v4res = null) {
    throw new Error(`Test failed. ${"v4: " + v4res}`);
}