const utilMail = require("../utils/utilMail");
const modTeam = require("../models/modTeams");

module.exports = {
	sendMailToMatchedTeam: async () => {
		const teamList = await modTeam.getMatchedTeamList();
		for (team of teamList) {
			await utilMail.matchingEmailSend(team);
		}
		console.log("매칭된 사람들에게 이메일 완료");
	},

	sendMailToUnmatchedTeam: async () => {
		const teamList = await modTeam.getUnmatchedTeamList();
		for (team of teamList) {
			await utilMail.unmatchingEmailSend(team);
		}
		console.log("매칭 안된 사람들에게 이메일 완료");
	}
};
