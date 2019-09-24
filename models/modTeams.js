const Team = require("./schema/teams.schema");

module.exports = {
	getTeamById: async id => {
		const team = await Team.find({ _id: id });
		return team;
	},
	makeTeam: async teamObj => {
		const team = await Team.create(teamObj);
		return team;
	},

	getTeamListSorted: async gender => {
		const teamList = await Team.find({
			gender
		})
			.select({ candidates: true, teamPoint: true })
			.sort({ teamPoint: 1 });
		return teamList;
	},

	makeTeamforMathcing: async gender => {
		const teamList = await Team.find({
			gender
		}).sort({ teamPoint: 1 });
		return teamList;
	},

	getTeamListWithCandidates: async gender => {
		const teamList = await Team.find({
			gender
		})
			.populate("candidates")
			.sort({ teamPoint: 1 });
		return teamList;
	},

	getMatchedTeamList: async () => {
		const teamList = await Team.find({ isMatched: true })
			.populate("leader", ["phoneNumber", "email"])
			.populate({
				path: "partnerTeam",
				select: ["leader"],
				populate: { path: "leader", select: "kakaoId" }
			});

		return teamList;
	},

	getUnmatchedTeamList: async () => {
		const teamList = await Team.find({ isMatched: false }).populate("leader", [
			"email",
			"phoneNumber"
		]);
		return teamList;
	},

	getTeamByIsMatched: async (gender, isMatched) => {
		const teamList = await Team.find({ gender, isMatched });
		return teamList;
	},

	getRematchableTeamList: async gender => {
		const teamList = await Team.find({ gender, isMatched: false })
			.populate("candidates")
			.sort({ teamPoint: 1 });
		return teamList;
	},
	getListLimitedNum: async (offset, limit) => {
		const list = await Team.find({})
			.select({
				isMatched: true,
				leader: true,
				partnerTeam: true,
				isNotified: true
			})
			.populate("leader", "phoneNumber")
			.populate({
				path: "partnerTeam",
				select: "leader",
				populate: { path: "leader", select: "kakaoId" }
			});
		return list;
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
