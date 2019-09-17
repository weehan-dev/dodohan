const whField = require("../weehanField.json");
const otField = require("../othersField.json");
const { makePeople } = require("./utilPerson");

const trim = (data, school) => {
	const field = {
		hanyang: whField,
		others: otField
	};
	const gender = data[field[school].teamGender];
	const leaderRawData = {
		school,
		rawInfo: data[field[school].leaderRawInfo],
		rawContact: data[field[school].leaderRawContact],
		isLeader: true,
		gender,
		fbLink: data[field[school].leaderFbLink]
	};

	const memberOneRawData = {
		school,
		rawInfo: data[field[school].mem1RawInfo],
		rawContact: data[field[school].mem1RawContact],
		isLeader: false,
		gender,
		fbLink: data[field[school].mem1FbLink]
	};

	const memberTwoRawData = {
		school,
		rawInfo: data[field[school].mem2RawInfo],
		rawContact: data[field[school].mem2RawContact],
		isLeader: false,
		gender,
		fbLink: data[field[school].mem2FbLink]
	};

	return [leaderRawData, memberOneRawData, memberTwoRawData];
};

const createBaseMember = (form, school) => {
	const [leaderRawData, mem1RawData, mem2RawData] = trim(form, school);
	const [leader, mem1, mem2] = makePeople(
		leaderRawData,
		mem1RawData,
		mem2RawData
	);

	return {
		leader,
		mem1,
		mem2
	};
};

exports.createBaseMember = createBaseMember;
