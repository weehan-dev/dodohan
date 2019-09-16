const dataParser = data =>
	data
		.split(" ")
		.slice(1)
		.split("/");

const makePerson = rawData => {
	const {
		rawInfo,
		rawContact,
		gender,
		fbLink: facebookLink,
		isLeader,
		school
	} = rawData;
	const info = dataParser(rawInfo);
	let name, weehanId, age;
	const [kakaoId, phone, email] = dataParser(rawContact);
	if (info.length === 3) {
		[name, weehanId, age] = info;
	} else {
		[name, age] = info;
	}

	const ret = {
		school,
		name,
		weehanId,
		age,
		kakaoId,
		phone,
		email,
		gender,
		facebookLink,
		isLeader
	};

	return ret;
};

export const makePeople = async (...rawPeopleData) => {
	const ret = Promise.all(
		rawPeopleData.map(
			rawPersonData =>
				new Promise((resolve, reject) => {
					return resolve(makePerson(rawPersonData));
				})
		)
	);

	return ret;
};
