const loaders = require("./loaders");
const app = require("./app");

(async function main(loaders, app) {
	try {
		await loaders();
		app.start();
	} catch (e) {
		console.error(e);
		console.log("앱이 비정상 종료 되었습니다.");
	}
})(loaders, app);
