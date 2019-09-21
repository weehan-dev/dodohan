const loaders = require("./loaders");
const app = require("./app");
const main = async (loaders, app) => {
    try {
        await loaders();
        await app.injectStart();
    } catch (e) {
        console.error(e);
        console.log("앱이 비정상 종료 되었습니다.");
    }
};

main(loaders, app);
