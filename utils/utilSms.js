const { config, Group } = require("coolsms-sdk-v4");
const configApi = require("../config/index");

const matchSuccessSms = async (num, content) => {
	// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
	const apiKey = configApi.SMS_INFO.KEY;
	const apiSecret = configApi.SMS_INFO.SECRET;
	config.init({ apiKey, apiSecret });

	async function send(params = {}) {
		try {
			const response = await Group.sendSimpleMessage(params);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	}

	const params = {
		text: `두근두근 라치오스 매칭에 성공하였습니다! 상대팀 대표의 카카오톡 아이디는 ${content}입니다`,
		type: "SMS", // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
		to: num, // 수신번호 (받는이)
		from: configApi.SMS_INFO.FROM // 발신번호 (보내는이)
	};
	console.log(params);
	await send(params);
};

exports.smsTest = matchSuccessSms;

const matchFailSms = async num => {
	// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
	const apiKey = configApi.SMS_INFO.KEY;
	const apiSecret = configApi.SMS_INFO.SECRET;
	config.init({ apiKey, apiSecret });

	async function send(params = {}) {
		try {
			const response = await Group.sendSimpleMessage(params);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	}

	const params = {
		text: `아쉽게도 성비 불균형으로 인해 두근두근 라치오스 매칭에 실패했습니다. 이번 이벤트에 관심 가져주셔서 감사합니다.`,
		type: "SMS", // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
		to: num, // 수신번호 (받는이)
		from: configApi.SMS_INFO.FROM // 발신번호 (보내는이)
	};
	console.log(params);
	await send(params);
};

module.exports = {
	smsSend: async team => {
		try {
			await matchSuccessSms(
				team.leader.phoneNumber,
				team.partnerTeam.leader.kakaoId
			);
		} catch (e) {
			console.log(e.message);
		}
	},
	smsSendUnmatched: async team => {
		try {
			await matchFailSms(team.leader.phoneNumber);
		} catch (e) {
			console.log(e.message);
		}
	},

	test: async () => {
		await matchSuccessSms(configApi.SMS_INFO.TESTNUM, "아무내용");
	}
};
