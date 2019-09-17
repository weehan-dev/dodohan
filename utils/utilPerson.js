const dataParser = data => data.split("/");

const makePerson = rawData => {
	const {
		rawInfo,
		rawContact,
		gender: rawGender,
		fbLink,
		isLeader,
		school
	} = rawData;
	const gender = rawGender === "남자" ? "male" : "female";
	const info = dataParser(rawInfo);
	let name, weehanId, rawAge;
	const [kakaoId, phoneNumber, email] = dataParser(rawContact);
	if (info.length === 3) {
		[name, weehanId, rawAge] = info;
	} else {
		[name, rawAge] = info;
	}
	const facebookLink = fbLink || null;

	const ret = {
		school,
		name,
		weehanId,
		age: parseInt(rawAge),
		kakaoId,
		phoneNumber,
		email,
		gender,
		facebookLink,
		isLeader
	};
	return ret;
};

exports.makePeople = (...rawPeopleData) => {
	const ret = rawPeopleData.map(rawPersonData => makePerson(rawPersonData));
	return ret;
};
