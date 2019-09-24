const modTeam = require("../models/modTeams");

module.exports = {
	getMatchedMale: async () => {
		const list = await modTeam.getTeamByIsMatched("male", true);
		return list;
	},

	getUnmatchedMale: async () => {
		const list = await modTeam.getTeamByIsMatched("male", false);
		return list;
	},

	getMatchedFemale: async () => {
		const list = await modTeam.getTeamByIsMatched("female", true);
		return list;
	},

	getUnmatchedFemale: async () => {
		const list = await modTeam.getTeamByIsMatched("female", false);
		return list;
	}
};
