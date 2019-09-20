const nodemailer = require('nodemailer');

function sendEmail(target, content) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // 보내는 지메일 주소
            user: '지메일@gmail.com',
            // 보내는 지메일 비밀번호
            pass: '비밀번호'
        }
    });


    const mailOption = {
        from: 'Weehan <네이버 메일>',
        to: [target],
        // 이메일 제목
        subject: '두근두근한양 매칭결과입니다',
        // 이메일 내용 html 임시로 간단하게 만들어 놓음
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap" rel="stylesheet">
</head>
<body>
<div style="text-align: center;color: #E96D82; margin: 50px; font-family: 'Do Hyeon', sans-serif;"><h1>두근두근 라치오스 매칭에 성공했습니다!</h1></div>
<div style="background-color: #FFAECD; text-align: center;">
    <p style="font-size: 1.5em; color: #b51365;font-family: 'Do Hyeon', sans-serif;">상대팀 팀장의 카카오톡 ID:</p>
    <div style="background-color: white; color: #E96D82">
        <h1 style="font-family: 'Do Hyeon', sans-serif;">${content}</h1>
    </div>
    <p style="font-size: 1.5em; color:#b51365;font-family: 'Do Hyeon', sans-serif;">위의 카카오톡 아이디로 </p>
    <p  style="font-size: 1.5em; color:#b51365;font-family: 'Do Hyeon', sans-serif;">두근두근 라치오스에 참여해주셔서 감사합니다:)</p>
    
</div>


<img style="width: 100%" src="http://www.weehan.com/files/attach/images/3289940/514/807/021/34de7e8aae810dee4ac48ad260f71f2b.png" alt="">


</body>
</html>`
    };

    transporter.sendMail(mailOption, function (err, info) {
        if (err) {
            console.error('Send Mail error : ', err);
        } else {
            console.log('Message sent : ', info);
        }
    });

}


function sendResult(list) {
    //매칭 결과가 어떻게 들어올지 몰라서 일단 임의로 지정
    //
    //list 를 parameter 로 받아서 각 팀 대표의 카카오톡 아이디와 이메일 주소를 추출 하는 문장 추가 필요

    const kakaoA = ''; //매칭 결과에서 얻은 A팀 대표의 카카오톡 아이디 입력
    const kakaoB = ''; //매칭 결과에서 얻은 B팀 대표의 카카오톡 아이디 입력
    const emailA = ''; //A팀 대표의 이메일 입력
    const emailB = ''; //B팀 대표의 이메일 입력
    sendEmail(emailA,kakaoB);
    sendEmail(emailB,kakaoA);
}


sendResult()