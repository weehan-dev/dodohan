const modTeam = require("../models/modTeams");

module.exports = {
	makeListForCandidates: async () => {
		const maleList = await modTeam.makeTeamforMathcing("male");
		const femaleList = await modTeam.makeTeamforMathcing("female");
		return [maleList, femaleList];
	},

	makeListForMatching: async () => {
		const maleList = await modTeam.getTeamListWithCandidates("male");
		return maleList;
	},

	setCandidate: async (x, y) => {
		for (let team of x) {
			const candidates = [];
			for (let anotherTeam of y) {
				const isCandidate = anotherTeam.ages.every(age =>
					team.preferAge.includes(age)
				);

				if (isCandidate) candidates.push(anotherTeam._id);
			}
			team.candidates = candidates;
			//인덱스가 앞에 있을 수록 팀 포인트가 높다
			await team.save();
		}
	},

	/* 매칭 알고리즘 */
	match: async maleList => {
		const unmatchedMale = maleList;
		const engaged = new Map(); //[[w, m]]의 map 형식

		while (unmatchedMale.length) {
			const m = unmatchedMale.shift();

			const manCandidates = m.candidates;
			const validateCandidates = manCandidates.filter(candi =>
				candi.candidates.includes(m._id)
			);

			let isMatched = false;
			while (validateCandidates.length && !isMatched) {
				w = validateCandidates.shift();
				isSheEngaged = engaged.get(w);
				if (isSheEngaged) {
					if (
						w.candidates.indexOf(m._id) < w.candidates.indexOf(isSheEngaged._id)
					) {
						// 더 우선 순위가 높음
						// 약혼변경
						engaged.set(w, m);
						m.candidates = validateCandidates;
						await m.save();
						unmatchedMale.unshift(isSheEngaged);
						isMatched = true;
					}
				} else {
					engaged.set(w, m);
					m.candidates = validateCandidates;
					await m.save();
					isMatched = true;
				}
			}
		}

		for (var [w, m] of engaged.entries()) {
			w.isMatched = true;
			w.partnerTeam = m._id;
			await w.save();

			m.isMatched = true;
			m.partnerTeam = w._id;
			await m.save();
		}

		return engaged;
	},

	makeListForRematching: async () => {
		const maleList = await modTeam.getRematchableTeamList("male");
		return maleList;
	},

	getRematchableTeam: async () => {
		const maleList = await modTeam.getRematchableTeamList("male");
		const femaleList = await modTeam.getRematchableTeamList("female");
		for (m of maleList) {
			m.candidates = [];
			await m.save();
		}

		for (f of femaleList) {
			f.candidates = [];
			await f.save();
		}

		return [maleList, femaleList];
	}
};
