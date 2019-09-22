const Team = require("./schema/teams.schema");

module.exports = {
	makeTeam: async teamObj => {
		const team = await Team.create(teamObj);
		return team;
	},
	getMatchedTeamList: async() =>{
		const teamList = await Team.find({isMatched:true}).populate('leader');

		return teamList
	}
};
