const modTeam = require("../models/modTeams");

module.exports = {
	//남녀 리스트 가져오기
	makeList: async () => {
		const maleList = modTeam.makeTeamforMathcing("male");
		const femaleList = modTeam.makeTeamforMathcing("female");
		return [maleList, femaleList];
	},

	//선호 나이대에 맞는 매칭 후보 맵핑
	setCandidate: (x, y) => {
		var people = [];

		for (var i = 0; i < x.length; i++) {
			var person = {};
			var id = x[i]["_id"];
			var candidates = [];

			for (var j = 0; j < y.length; j++) {
				var tf = y[j]["age"].every(element => {
					return x[i]["prefer_age"].includes(element);
				});
				if (tf) {
					candidates.push(y[j]["kakaoId"]);
				}
			}
			person.kakaoId = kakaoId;
			person.candidates = candidates;
			people.push(person);
		}
		return people;
	},

	// 각 남녀의 선호 이성 리스트
	findCandidates: (preferList, com) => {
		for (key in preferList) {
			if (preferList[key]["kakaoId"] === com) {
				var prefer = preferList[key]["candidates"];
			}
		}
		return prefer;
	},

	// 여자와 이미 매칭된 남자 찾기
	findcurrMan: map => {
		if ([...map.entries()] == false) {
			return null;
		} else {
			return [...map.entries()][0][0];
		}
	},

	/* 매칭 알고리즘 */
	match: (malePrefer, femalePrefer) => {
		var engaged = new Map(); //[[man, woman]]의 map 형식
		const notMatchedMale = malePrefer.map(obj => obj["kakaoId"]);

		while (!(notMatchedMale == "")) {
			var man = notMatchedMale.pop();
			var manPreferList = findCandidates(malePrefer, man);
			var woman = manPreferList.pop();
			var womanPreferList = findCandidates(femalePrefer, woman);

			var findMap = new Map([...engaged].filter(([m, w]) => w === woman));
			var currMan = findcurrMan(findMap);

			if (!currMan) {
				if (womanPreferList.includes(man)) {
					engaged.set(man, woman);
					//console.log(`${man}과 ${woman}이 매칭되었습니다. ${engaged}`);
				} else {
					if (manPreferList) {
						notMatchedMale.push(man);
					}
				}
			} else {
				if (womanPreferList.includes(man)) {
					if (womanPreferList.indexOf(currMan) > womanPreferList.indexOf(man)) {
						engaged.set(man, woman);
						var currManPreferList = findCandidates(malePrefer, currMan);
						if (currManPreferList) {
							notMatchedMale.push(currMan);
						}
					} else {
						if (manPreferList) {
							notMatchedMale.push(man);
						}
					}
				} else {
					if (manPreferList) {
						notMatchedMale.push(man);
						//   console.log(
						//     `${man}이 ${currMan}이 있는 ${woman}한테 차이고 다시 대기`
						//   );
					}
				}
			}
		}
		return engaged;
	},

	// 테스트 코드
	test: async () => {
		await modTeam.makeTeamforMathcing("female");
		await modTeam.makeTeamforMathcing("male");
	}
};
