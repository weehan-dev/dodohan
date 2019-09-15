const Team = require("../schema/teams.schema");
const stringToType = require("../utils/stringToType");
const makeTeam = async (form, school, members) => {
	const team = {};

	team.gender = form[field.teamGender];
	team.school = school;
	team.preferSchool = form[field.preferSchool];
	form[field.preferAge] ? (team.preferAge = form[field.preferAge]) : null;
	team.leader = members.filter(mem => mem.isLeader)[0]._id;

	team.matchingType = stringToType(form[field.type]);
	team.members = members.map(mem => mem._id);

	const reduceObject = members.reduce((prev, curr) => {
		if (prev[avgAge]) prev.avgAge += curr.age;
		else prev.avgAge = curr.age;
		if (prev[likesCount]) prev.likesCount += curr.point;
		else prev.likesCount = curr.point;
	}, {});
	reduceObject.avgAge /= members.length;

	Object.assign(team, reduceObject);
	try {
		const doc = await Team.create(team);
		return doc;
	} catch (e) {
		console.error(e);
	}
};

exports.makeTeam = makeTeam;
