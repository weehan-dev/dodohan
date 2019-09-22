const {config, Group} = require('coolsms-sdk-v4');
const configApi = require('../config/index');


const smsFunc = async(num, content, matchBool)=> {
    let message = '';
// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
    const apiKey = configApi.SMS_INFO.KEY;
    const apiSecret = configApi.SMS_INFO.SECRET;
    config.init({apiKey, apiSecret});

    async function send(params = {}) {
        try {
            const response = await Group.sendSimpleMessage(params);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
    if (matchBool === true) {
        message = `두근두근 라치오스 매칭에 성공하였습니다! 상대팀 대표의 카카오톡 아이디는 ${content}입니다`;
    }else{
        message = '두근두근 라치오스에 관심 가져주셔서 감사합니다. 아쉽게도 성비 불균형으로 인해 매칭에 실패하였습니다. 더 나은 위한이 되도록 노력하겠습니다';
    }

    const params = {
        text: message,
        type: 'SMS', // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
        to: num, // 수신번호 (받는이)
        from: '01091853702' // 발신번호 (보내는이)
    };
    console.log(params);
    await send(params)
};



module.exports = {

    smsSend: async team => {

        await smsFunc(team.leader.phoneNumber, team.leader.kakaoId, team.isMatched);

        return console.log('Sending sms success')
    },
};
