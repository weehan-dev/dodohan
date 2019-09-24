const { config, Group } = require("coolsms-sdk-v4");
const configApi = require("../config/index");
const axios = require("axios").default;

const matchSuccessSms = async (num, content) => {
	// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
	const apiKey = configApi.SMS_INFO.KEY;
	const apiSecret = configApi.SMS_INFO.SECRET;
	config.init({ apiKey, apiSecret });

	const send = async (params = {}) => {
		try {
			const response = await Group.sendSimpleMessage(params);
		} catch (e) {
			console.log(e);
		}
	};

	const params = {
		text: `[회신 금지]두근두근 라치오스 매칭 성공! 상대 대표 카카오톡 아이디: ${content}`,
		type: "SMS", // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
		to: num, // 수신번호 (받는이)
		from: configApi.SMS_INFO.FROM // 발신번호 (보내는이)
	};
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
		text: `[회신 금지]아쉽게도 이번 두근두근 라치오스 매칭에 실패했습니다.`,
		type: "SMS", // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
		to: num, // 수신번호 (받는이)
		from: configApi.SMS_INFO.FROM // 발신번호 (보내는이)
	};
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
	}
};
