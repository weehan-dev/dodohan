const modParticipant = require("../models/modParticipant");
const { createBaseMember } = require("../utils/utilTeam");
const { checkDuplicated, makeParticipant } = modParticipant;

module.exports = {
	injectWeehanMembers: async rawForm => {
		const { leader, mem1, mem2 } = createBaseMember(rawForm, "hanyang");
		const users = [leader, mem1, mem2];
		try {
			await Promise.all(users.map(user => checkDuplicated(user)));
			//TODO: ret 안에 생성된 유저들이 있어야 함 확인 못해봄
			const ret = await Promise.all(users.map(user => makeParticipant(user)));
			return { result: true, ret };
		} catch (e) {
			console.log(e.message);
			return { result: false };
		}
	},
	injectOthersMembers: async rawForm => {
		const { leader, mem1, mem2 } = createBaseMember(rawForm, "others");
		const users = [leader, mem1, mem2];
		try {
			await Promise.all(users.map(user => checkDuplicated(user)));
			//TODO: ret 안에 생성된 유저들이 있어야 함 확인 못해봄
			const ret = await Promise.all(users.map(user => makeParticipant(user)));

			return { result: true, ret };
		} catch (e) {
			console.log(e.message);
			return { result: false };
		}
	}
};
