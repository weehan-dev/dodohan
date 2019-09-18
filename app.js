const utilCsv = require("./utils/utilCsv");
const serParticipant = require("./services/serParticipant");
const serTeam = require("./services/serTeam");

class app {
	constructor() {
		if (app.instance) return app.instance;
		app.instance = this;
		return app.instance;
	}

	injectStart = async () => {
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
			whParsedCsv.map(async whRawTeamForm => {
				const { result, ret } = await serParticipant.injectWeehanMembers(
					whRawTeamForm
				);
				if (!result) {
					console.log("위한 중복 참여 팀:", ++whDuplicatedNum);
					return;
				}

				//TODO: 여기서 ret가 멤버가 담겨있는 배열이라고 가정함. bulkInsert 확인 필요함

				await serTeam.injectTeam(ret, whRawTeamForm);

				console.log(`위한 팀 추가: ${++whTeamsNum}`);
				return;
			});

			otParsedCsv.map(async otRawTeamForm => {
				const { result, ret } = await serParticipant.injectOthersMembers(
					otRawTeamForm
				);
				if (!result) {
					console.log("타대생 중복 참여 팀:", ++otDuplicatedNum);
					return;
				}

				//TODO: 여기서 ret가 멤버가 담겨있는 배열이라고 가정함. bulkInsert 확인 필요함
				await serTeam.injectTeam(ret, otRawTeamForm);
				console.log(`타대생 팀 추가: ${++otTeamsNum}`);
				return;
			});
		};

		await inject();
	};
}
const App = new app();

module.exports = App;
