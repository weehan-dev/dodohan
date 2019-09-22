const nodemailer = require("nodemailer");
const config = require("../config");
const fs = require("fs");
const path = require("path");
const unmatchedTemplate = fs.readFileSync(
    path.join(__dirname, "./unmatched.html"),
    "utf8"
);
const mathcedTemplate = fs.readFileSync(
    path.join(__dirname, "./matched.html"),
    "utf8"
);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // 보내는 지메일 주소
        user: config.EMAIL_INFO.ID,
        // 보내는 지메일 비밀번호
        pass: config.EMAIL_INFO.PW
    }
});

const matchSuccess = async (email, content, html) => {
    const htmlArray = html.split("<div></div>");
    const htmlEnd = htmlArray[0] + `<h1>${content}</h1>` + htmlArray[1];

    const mailOption = {
        // ProAl 이라는 시스템이라는데 네이버 메일을 적으면 이메일 앞에 있는 Weehan 이름으로 메일이 발송됨
        from: `Weehan ${config.EMAIL_INFO.PROAL}`,
        // 메일을 전송할 주소- 여기에 array로 추가 가능
        to: email,
        // 이메일 제목
        subject: "위한 두근두근 라치오스 매칭 결과입니다.",
        // 이메일 내용 html 형식으로 작성 (메일 보낼 양식이 정해지면 제가 만들게요)
        html: htmlEnd
    };

    const info = await transporter.sendMail(mailOption);
};

const matchFail = async (email, html) => {
    const mailOption = {
        from: `Weehan ${config.EMAIL_INFO.PROAL}`,
        to: email,
        subject: "위한 두근두근 라치오스 매칭 결과입니다.",
        html: html
    };

    await transporter.sendMail(mailOption);
};

module.exports = {
    matchingEmailSend: async team => {
        try {
            await matchSuccess(
                team.leader.email,
                team.partnerTeam.leader.kakaoId,
                mathcedTemplate
            );
        } catch (e) {
            console.log(e.message);
        }
    },

    unmatchingEmailSend: async team => {
        try {
            await matchFail(team.leader.email, unmatchedTemplate);
        } catch (e) {
            console.log(e.message);
        }
    }
};
