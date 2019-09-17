const loaders = require("./loaders");
const app = require("./app");
(async function main(loaders, app) {
	try {
		await loaders();
		const result = await app.injectStart();
		console.log(`위한 팀: ${result.weehan.whTeamsNum}`);
		console.log(`위한 중복 신청팀: ${result.weehan.whDuplicatedNum}`);
		console.log(`타 대학 팀: ${result.others.otTeamsNum}`);
		console.log(`타 대학 중복 신청팀: ${result.others.otDuplicatedNum}`);
		process.exit();
	} catch (e) {
		console.error(e);
		console.log("앱이 비정상 종료 되었습니다.");
	}
})(loaders, app);
