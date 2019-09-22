const emailSender = require('../utils/utilMail');
const fs = require('fs');
const htmlBase = fs.readFileSync('./ddh.html', 'utf8');
const emailInfo = require('../config');

exports.send = function (list) {
    // 매칭 결과가 [첫 번째 팀, 두 번째 팀] 으로 들어올 경우 유효
    const leaderA = list[0].leader;
    const leaderB = list[1].leader;
    const kakaoA = leaderA.kakaoId; //결과에서 얻은 A팀 대표의 카카오톡 아이디 입력
    const kakaoB = leaderB.kakaoId; //매칭 결과에서 얻은 B팀 대표의 카카오톡 아이디 입력
    const emailA = leaderA.email; //A팀 대표의 이메일 입력
    const emailB = leaderB.email; //B팀 대표의 이메일 입력
    emailSender.emailFunc(emailA, kakaoB, htmlBase);
    emailSender.emailFunc(emailB, kakaoA, htmlBase);
};
module.exports = {
  send: async list=>{
       const leaderA = list[0].leader;
        const leaderB = list[1].leader;
        const kakaoA = leaderA.kakaoId; //결과에서 얻은 A팀 대표의 카카오톡 아이디 입력
        const kakaoB = leaderB.kakaoId; //매칭 결과에서 얻은 B팀 대표의 카카오톡 아이디 입력
        const emailA = leaderA.email; //A팀 대표의 이메일 입력
        const emailB = leaderB.email; //B팀 대표의 이메일 입력
        emailSender.emailFunc(emailA, kakaoB, htmlBase);
        emailSender.emailFunc(emailB, kakaoA, htmlBase);
  }
};


module.exports = {
    emailSender: async list => {
        const leaderA = list[0].leader;
        const leaderB = list[1].leader;
        const kakaoA = leaderA.kakaoId; //결과에서 얻은 A팀 대표의 카카오톡 아이디 입력
        const kakaoB = leaderB.kakaoId; //매칭 결과에서 얻은 B팀 대표의 카카오톡 아이디 입력
        const emailA = leaderA.email; //A팀 대표의 이메일 입력
        const emailB = leaderB.email; //B팀 대표의 이메일 입력
        emailSender.emailFunc(emailA, kakaoB, htmlBase);
        emailSender.emailFunc(emailB, kakaoA, htmlBase);
        try {
            await Promise.all(

            );
            return {result: true, ret};
        } catch (e) {
            return {result: false};
        }
    }
};




// function emailTest() {
//     const kakaoA = 'kakaoA'; //결과에서 얻은 A팀 대표의 카카오톡 아이디 입력
//     const kakaoB = 'kakaoB'; //매칭 결과에서 얻은 B팀 대표의 카카오톡 아이디 입력
//     const emailA = emailInfo.EMAIL_INFO.TEST1; //A팀 대표의 이메일 입력
//     const emailB = emailInfo.EMAIL_INFO.TEST2; //B팀 대표의 이메일 입력
//     emailSender.emailFunc(emailA, kakaoB, htmlBase);
//     emailSender.emailFunc(emailB, kakaoA, htmlBase);
// }
//
//
// emailTest();
