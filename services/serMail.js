const utilMail = require('../utils/utilMail');
const modTeam = require('../models/modTeams');

module.exports = {
    test: async () => {
        const teamList = await modTeam.getMatchedTeamList();
        console.log(teamList);
        await Promise.all(teamList.map(team =>
            utilMail.emailSend(team)
        ));
        console.log('이메일 완료');
    }
};
