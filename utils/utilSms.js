const {config, Group} = require('coolsms-sdk-v4');
const configApi = require('../config/index');


const smsFunc = async(num, content)=> {

// 인증을 위해 발급받은 본인의 API Key를 사용합니다.
    const apiKey = configApi.SMS_INFO.KEY;
    const apiSecret = configApi.SMS_INFO.SECRET;
    config.init({apiKey, apiSecret});
    console.log(apiKey);
    console.log(apiSecret);

    async function send(params = {}) {
        try {
            console.log('function send에 접근 성공');
            // 이 부분에서 왜 인지 모르겠지만 catch 로 넘어가지도 않고 그냥 이 함수 자체가 종료되듯이 다음 실행으로 넘어감
            const response = await Group.sendSimpleMessage(params);
            // await 를 빼면 promise <Pending> 상태가 되며 그냥 지나감
            console.log('response 설정');
            console.log(response);
            console.log('function send 마무리 성공');
        } catch (e) {
            console.log(e);
            console.log('error occur!!!!!!!!!!')
        }
    }

    const params = {
        text: `두근두근 라치오스 매칭에 성공하였습니다! 상대팀 대표의 카카오톡 아이디는 ${content}입니다`, // 문자 내용
        type: 'SMS', // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
        to: num, // 수신번호 (받는이)
        from: '01091853702' // 발신번호 (보내는이)
    };
    console.log(params);
    await send(params)
};



module.exports = {
    smsSend: async team => {
        console.log(team.leader.phoneNumber);
        console.log(team.leader.kakaoId);
        await smsFunc(team.leader.phoneNumber, team.leader.kakaoId);

        return console.log('Sending sms success')
    }
};

//
// smsFunc('01091853702','skkk');
