const request = require('request');
const {config, Group} = require('coolsms-sdk-v4');
const configApi = require('../config/index');

function smsFunc(num, content) {

// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
    const apiKey = configApi.SMS_INFO.KEY;
    const apiSecret = configApi.SMS_INFO.SECRET;
    config.init({apiKey, apiSecret});

    async function send(params = {}) {
        try {
            const response = await Group.sendSimpleMessage(params);
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const params = {
        text: `두근두근 라치오스 매칭에 성공하였습니다! 상대팀 대표의 카카오톡 아이디는 ${content}입니다`, // 문자 내용
        type: 'SMS', // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
        to: num, // 수신번호 (받는이)
        from: '01091853702' // 발신번호 (보내는이)
    };
    console.log(params);
    send(params)
}



module.exports = {
    smsSend: async team => {
        console.log(team.leader.phoneNumber);
        console.log(team.leader.kakaoId);
        await smsFunc(team.leader.phoneNumber, team.leader.kakaoId);

        return console.log('Sending sms success')
    }
};


