const Team = require("./schema/teams.schema");
const Participant = require("./schema/participants.schema");

module.exports = {
	makeTeam: async teamObj => {
		const team = await Team.create(teamObj);
		return team;
	},

	makeTeamforMathcing: async gender => {
		const getTeamObj = await Team.find(
			{
				matchingType: 3,
				gender: gender
			},
			{
				preferAge: true,
				leader: true,
				members: true,
				teamPoint: true
			}
		)
			.populate("leader", "age")
			.populate("members", "age")
			.sort({ teamPoint: 1 });
		return getTeamObj;
	},

	getMatchedTeamList: async () => {
		const teamList = await Team.find({ isMatched: true }).populate(
			"leader"
		);

		return teamList;
	}
};

/*
데이터 형식
{ preferAge: [ 24, 25, 26, 27 ],
  members:
   [ { _id: 5d8722912f114d1948208ca7, age: 24 },
     { _id: 5d8722912f114d1948208ca8, age: 20 } ],
  _id: 5d8722912f114d1948208cac,
  teamPoint: 0,
  leader: { _id: 5d8722912f114d1948208ca6, age: 24 } }

*/
