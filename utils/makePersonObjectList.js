const field = require("../field.json");
const stringToType = require("./stringToType");

module.exports = (form, school) => {
	const type = stringToType(form[field.type]);

	const gender = form[field.teamGender];

	console.log(form);
	// console.log(field.leaderRawInfo);
	// console.log(form[field.leaderRawInfo].split("/"));
	// console.log(form[field.mem1RawInfo].split("/"));
	// console.log(form[field.mem2RawInfo].split("/"));

	const [leaderName, leaderKakaoId, leaderWeehanId, leaderAge] = form[
		field.leaderRawInfo
	].split("/");

	const [mem1Name, mem1KakaoId, mem1WeehanId, mem1Age] = form[
		field.mem1RawInfo
	].split("/");

	const [mem2Name, mem2KakaoId, mem2WeehanId, mem2Age] = form[
		field.mem2RawInfo
	].split("/");

	throw new Error("테스트");

	const leader = {
		school,
		name: leaderName,
		kakaoId: leaderKakaoId,
		weehanId: leaderWeehanId,
		age: leaderAge,
		gender,
		isLeader: true
	};

	const member1 = {
		school,
		name: mem1Name,
		kakaoId: mem1KakaoId,
		weehanId: mem1WeehanId,
		age: mem1Age,
		gender
	};

	const member2 = {
		school,
		name: mem2Name,
		kakaoId: mem2KakaoId,
		weehanId: mem2WeehanId,
		age: mem2Age,
		gender
	};

	switch (type) {
		case 1:
			return [leader];
		case 2:
			return [leader, member1];
		case 3:
			return [leader, member1, member2];
	}
};
