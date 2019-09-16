const modPartipant = require("../models/modParticipant");
const modTeam = require("../models/modTeams");
const field = require("../othersField.json");

module.exports = {
	injectTeam: async (users, form) => {
		// form은 raw json이 들어와도 됨
		const { school, gender } = users[0];
		const preferAge = form[field.preferAge];
		const matchingType = 3;

		const { teamPoint, age } = users.reduce(
			(accumulator, current) => {
				const { teamPoint: accTP, age: accAge } = accumulator;
				const { teamPoint: curTP, age: curAge } = current;
				return { teamPoint: curTP + accTP, age: accAge + curAge };
			},
			{ teamPoint: 0, age: 0 }
		);

		// TODO: 정수인지 체크
		const avgAge = age / users.length;

		const members = users.filter(user => !user.isLeader).map(user => user._id);
		const leader = users.filter(user => user.isLeader)[0]._id;

		const teamObj = {
			school,
			gender,
			preferAge,
			matchingType,
			teamPoint,
			avgAge,
			members,
			leader
		};

		const team = await modTeam.makeTeam(teamObj);
		return team;
	}
};
