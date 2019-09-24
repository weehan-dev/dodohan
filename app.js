const utilCsv = require("./utils/utilCsv");
const serParticipant = require("./services/serParticipant");
const serTeam = require("./services/serTeam");
const serMatching = require("./services/serMatching");
const serMail = require("./services/serMail");
const serSms = require("./services/serSms");
const serInfo = require("./services/serInfo");

class App {
	constructor() {
		if (App.instance) return App.instance;
		App.instance = this;
		return App.instance;
	}

	async smsLimited(offset) {
		await serSms.messageLimited();
	}

	async rematch() {
		const [male, female] = await serMatching.getRematchableTeam();
		await serMatching.setCandidate(male, female);
		await serMatching.setCandidate(female, male);
		const maleList = await serMatching.makeListForRematching();
		await serMatching.match(maleList);
	}

	async checkManInfo() {
		const list = await serInfo.getMatchedMale();
		const ulist = await serInfo.getUnmatchedMale();
		console.log(
			`
			전체 팀: ${list.length + ulist.length}
			매칭 된 남성 팀: ${list.length}
			매칭 안 된 남성 팀: ${ulist.length}
			`
		);
	}

	async checkWomanInfo() {
		const list = await serInfo.getMatchedFemale();
		const ulist = await serInfo.getUnmatchedFemale();
		console.log(
			`
			전체 팀: ${list.length + ulist.length}
			매칭 된 여성 팀: ${list.length}
			매칭 안 된 여성 팀: ${ulist.length}
			`
		);
	}

	async injectStart() {
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
					const { result, ret } = await serParticipant.injectWeehanMembers(
						whRawTeamForm
					);
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
					const { result, ret } = await serParticipant.injectOthersMembers(
						otRawTeamForm
					);
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
		const [male, female] = await serMatching.makeListForCandidates();
		await serMatching.setCandidate(male, female);
		await serMatching.setCandidate(female, male);
		const maleList = await serMatching.makeListForMatching();
		await serMatching.match(maleList);
	}

	async mailingStart() {
		await serMail.sendMailToMatchedTeam();
		await serMail.sendMailToUnmatchedTeam();
	}
	async messageStart() {
		await serSms.sendMessageToMatchedTeam();
		await serSms.sendMessageToUnmatchedTeam();
	}
}
const app = new App();

module.exports = app;
