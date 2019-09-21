const modParticipant = require("../models/modParticipant");
const serMemberPoint = require("./serMemberPoint");
const { createBaseMember } = require("../utils/utilTeam");

module.exports = {
	injectWeehanMembers: async rawForm => {
		const { leader, mem1, mem2 } = createBaseMember(rawForm, "hanyang");
		const users = [leader, mem1, mem2];
		try {
			await Promise.all(
				users.map(user => modParticipant.checkDuplicated(user))
			);

			await Promise.all(
				users.map(user => serMemberPoint.injectWeehanPoint(user))
			);

			//TODO: ret 안에 생성된 유저들이 있어야 함 확인 못해봄
			const ret = await Promise.all(
				users.map(user => modParticipant.makeParticipant(user))
			);
			return { result: true, ret };
		} catch (e) {
			return { result: false };
		}
	},
	injectOthersMembers: async rawForm => {
		const { leader, mem1, mem2 } = createBaseMember(rawForm, "others");
		const users = [leader, mem1, mem2];
		try {
			await Promise.all(
				users.map(user => modParticipant.checkDuplicated(user))
			);
			//TODO: ret 안에 생성된 유저들이 있어야 함 확인 못해봄
			const ret = await Promise.all(
				users.map(user => modParticipant.makeParticipant(user))
			);

			return { result: true, ret };
		} catch (e) {
			return { result: false };
		}
	}
};
