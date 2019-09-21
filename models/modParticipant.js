const Participant = require("./schema/participants.schema");

module.exports = {
    makeParticipant: async person => {
        const participant = await Participant.create(person);
        return participant;
    },
    makeBulkInsert: async people => {
        let ret = await Participant.bulkWrite(
            people.map(person => ({
                insertOne: { document: person }
            }))
        );

        return { ret, result: true };
    },
    checkDuplicated: async person => {
        const { kakaoId, phoneNumber, email } = person;
        const existUser = await Participant.findOne({
            kakaoId,
            phoneNumber,
            email
        });

        if (existUser) throw new Error("DUPLICATED_USER");
        return true;
    }
};
