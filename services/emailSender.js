var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        // 보내는 지메일 주소
        user : '지메일@gmail.com',
        // 보내는 지메일 비밀번호
        pass : '비밀번호'
    }
});


var mailOption = {
    // ProAl 이라는 시스템이라는데 네이버 메일을 적으면 이메일 앞에 있는 Weehan 이름으로 메일이 발송됨
    from : 'Weehan <네이버메일>',
    // 메일을 전송할 주소- 여기에 array로 추가 가능
    to : [''],
    // 이메일 제목
    subject : '위한 두근두근라치오스에 참여해주셔서 감사합니다',
    // 이메일 내용 html 형식으로 작성 (메일 보낼 양식이 정해지면 제가 만들게요)
    html: '<a href="https://www.weehan.com/"><img src="https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/20430132_1352389891525050_3591124631438117403_n.jpg?_nc_cat=103&_nc_oc=AQmIBUYR-5Trxujx1wI-BfmAixFrNgZpDXokGa8MnF0Y6bv-yKN7J9xsh7XxOpZ7Zyg&_nc_ht=scontent-icn1-1.xx&oh=1bbf8251db87079d5685662b73fef993&oe=5E35E0F3" alt=""></a>'
};

transporter.sendMail(mailOption, function(err, info) {
    if ( err ) {
        console.error('Send Mail error : ', err);
    }
    else {
        console.log('Message sent : ', info);
    }
});