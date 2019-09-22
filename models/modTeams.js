const Team = require("./schema/teams.schema");

module.exports = {
	makeTeam: async teamObj => {
		const team = await Team.create(teamObj);
		return team;
	},
	makeTeamforMathcing: async (teamObj, gender) => {
		const { leader, members, preferAge, teamPoint } = team;
		Team.find(
			{ gender, matchingType: 3 },
			{
				gender: false,
				school: false,
				preferAge: true,
				leader: true,
				matchingType: false,
				members: false,
				isMatched: false,
				partnerTeam: false,
				avgAge: false,
				teamPoint: true
			}
		).sort({ teamPoint: 1 }); //field: preferAge, leader
		return team;
	}
};
