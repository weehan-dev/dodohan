const modTeam = require("../models/modTeams");
const field = require("../othersField.json");

module.exports = {
	injectTeam: async (users, form) => {
		// form은 raw json이 들어와도 됨
		const { school, gender } = users[0];

		rawPreferAge = form[field.preferAge];

		const preferAge = !!rawPreferAge
			? rawPreferAge.split(";").map(data => parseInt(data))
			: null;
		const matchingType = 3;

		const sumData = users
			.map(user => ({
				point: user.point,
				age: user.age
			}))
			.reduce((prev, curr) => ({
				point: prev.point + curr.point,
				age: prev.age + curr.age
			}));

		// TODO: 정수인지 체크
		const avgAge = Math.round(sumData.age / users.length);
		const teamPoint = sumData.point;
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
