const modParticipant = require("../models/modParticipant");
import { createBaseMember } from "../utils/utilTeam";
const { checkDuplicated, makeBulkInsert } = modParticipant;

module.exports = {
	injectWeehanMembers: async rawForm => {
		const [leader, mem1, mem2] = createBaseMember(rawForm, "hanyang");
		try {
			await Promise.all([
				checkDuplicated(leader),
				checkDuplicated(mem1),
				checkDuplicated(mem2)
			]);
			//TODO: ret 안에 생성된 유저들이 있어야 함 확인 못해봄
			const ret = await makeBulkInsert([leader, mem1, mem2]);
			return ret;
		} catch (e) {
			console.error(e);
			return { result: false };
		}
	},
	injectOthersMembers: async rawForm => {
		const [leader, mem1, mem2] = createBaseMember(rawForm, "others");
		try {
			await Promise.all([
				checkDuplicated(leader),
				checkDuplicated(mem1),
				checkDuplicated(mem2)
			]);

			const ret = await makeBulkInsert([leader, mem1, mem2]);
			return ret;
		} catch (e) {
			console.error(e);
			return { result: false };
		}
	}
};
