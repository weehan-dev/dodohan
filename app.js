const utilCsv = require("./utils/utilCsv");
const serParticipant = require("./services/serParticipant");
const serTeam = require("./services/serTeam");
const serMatching = require("./services/serMatching");

class App {
	constructor() {
		if (App.instance) return App.instance;
		App.instance = this;
		return App.instance;
	}

	async injectStart() {
		// 여기에 앱 동작을 정의 하시면 됩니다.
		console.log("앱 만들어지는 중...");

		const { whPath, otPath } = utilCsv.formPathMaker();
		const whParsedCsv = await utilCsv.csvParser(whPath);
		const otParsedCsv = await utilCsv.csvParser(otPath);

		let whDuplicatedNum = 0;
		let otDuplicatedNum = 0;
		let whTeamsNum = 0;
		let otTeamsNum = 0;
		const inject = async () => {
			await Promise.all(
				whParsedCsv.map(async whRawTeamForm => {
					const {
						result,
						ret
					} = await serParticipant.injectWeehanMembers(whRawTeamForm);
					if (!result) {
						console.log("위한 중복 참여 팀:", ++whDuplicatedNum);
						return;
					}

					await serTeam.injectTeam(ret, whRawTeamForm);

					console.log(`위한 팀 추가: ${++whTeamsNum}`);
					return;
				})
			);

			await Promise.all(
				otParsedCsv.map(async otRawTeamForm => {
					const {
						result,
						ret
					} = await serParticipant.injectOthersMembers(otRawTeamForm);
					if (!result) {
						console.log("타대생 중복 참여 팀:", ++otDuplicatedNum);
						return;
					}

					await serTeam.injectTeam(ret, otRawTeamForm);
					console.log(`타대생 팀 추가: ${++otTeamsNum}`);
					return;
				})
			);
		};

		await inject();
		console.log("완료");
	}

	async matching() {
		await serMatching.test();
	}
}
const app = new App();

module.exports = app;
