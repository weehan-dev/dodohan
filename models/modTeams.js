const Team = require("./schema/teams.schema");
const Participant = require("./schema/participants.schema");

module.exports = {
	makeTeam: async teamObj => {
		const team = await Team.create(teamObj);
		return team;
	},

	makeTeamforMathcing: async gender => {
		const getLeaderObj = await Team.aggregate([
			{
				$lookup: {
					from: "participants",
					localField: "leader",
					foreignField: "_id",
					as: "leader"
				}
			}
		]);
		const getMembersObj = await Team.aggregate([
			{ $unwind: "$members" },
			{
				$lookup: {
					from: "participants",
					localField: "members",
					foreignField: "_id",
					as: "getMembers"
				}
			},
			{ $unwind: "$getMembers" },
			{
				$group: {
					_id: "$_id",
					getMembers: { $push: "$getMembers" }
				}
			}
		]);

		const getTeam = await Team.find(
			{ matchingType: 3, gender },
			{
				preferAge: true,
				leader: true,
				members: true,
				teamPoint: true
			}
		).sort({ teamPoint: 1 });
	},

	getMatchedTeamList: async () => {
		const teamList = await Team.find({ isMatched: true })
			.populate("leader")
			.populate({
				path: "partnerTeam",
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
	}
};

// 내가 원하는 데이터 형식

// { _id: 5d8722922f114d1948208cd8,
// 	preferAge: [ 22, 23 ],
// 	members: [ [Object], [Ojbect] ]
// 	gender: 'male',
// 	teamPoint: 0,
// 	leader: [ [Ojbect] ] }
