const utilSms = require("../utils/utilSms");
const modTeam = require("../models/modTeams");

module.exports = {
	sendMessageToMatchedTeam: async () => {
		const teamList = await modTeam.getMatchedTeamList();
		let sms = 0;
		for (team of teamList) {
			await utilSms.smsSend(team);
			console.log("성공 메시지 전송 완료! ", ++sms);
		}
		console.log("매칭 된 사람들에게 SMS 전송 완료");
	},
	sendMessageToUnmatchedTeam: async () => {
		const teamList = await modTeam.getUnmatchedTeamList();
		let sms = 0;
		for (team of teamList) {
			await utilSms.smsSendUnmatched(team);
			console.log("실패 메시지 전송 완료!", ++sms);
		}
		console.log("매칭 안 된 사람들에게 SMS 전송 완료");
	},

	messageLimited: async (offset, limit) => {
		const limitedList = await modTeam.getListLimitedNum();

		let sms = 0;
		for (let team of limitedList) {
			if (!team.isNotified) {
				if (team.isMatched) {
					await utilSms.smsSend(team);
					sms++;
				} else {
					await utilSms.smsSendUnmatched(team);
					sms++;
				}
			}
			team.isNotified = true;
			await team.save();
		}
		console.log(`${sms}개 전송 끝`);
	}
};
