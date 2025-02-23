const fs = require("fs-extra");
const conf = require(__dirname + "/../set");


const linkRegex = /(https?:\/\/[^\s]+)/; // Regex to detect links
const badWords = ["wtf", "mia", "xxx", "fuck", "sex", "huththa", "pakaya", "ponnaya", "hutto", "lol"]; // Add more as needed
const tagRegex = /@/; // Regex to detect tags
const botRegex = /bot/i; // Regex to detect bots

const handleAntiLinkBadWordsAndTags = async (zk, ms, origineMessage, texte, verifGroupe, admins, idBot, auteurMessage, verifAdmin, superUser) => {
    try {
        const containsLink = conf.GCF === "yes" && texte.match(linkRegex);
        const containsBadWord = badWords.some(word => texte.toLowerCase().includes(word));
        const containsTag = conf.GCF === "yes" && texte.match(tagRegex);
        const isBot = conf.GCF === "yes" && texte.match(botRegex);

        if ((containsLink || containsBadWord || containsTag || isBot) && verifGroupe) {
            console.log("link, bad word, tag, or bot detected");

            const verifZokAdmin = verifGroupe ? admins.includes(idBot) : false;

            if (superUser || verifAdmin || !verifZokAdmin) {
                console.log('I will do nothing');
                return;
            }

            const key = {
                remoteJid: origineMessage,
                fromMe: false,
                id: ms.key.id,
                participant: auteurMessage
            };

            let action = "";
            if (containsLink) action = "link";
            if (containsBadWord) action = "bad word";
            if (containsTag) action = "tag";
            if (isBot) action = "mentioning a bot";
            
            let txt = `Message deleted \n @${auteurMessage.split("@")[0]} removed from group for using a ${action}.`;

            await zk.sendMessage(origineMessage, { text: txt, mentions: [auteurMessage] }, { quoted: ms });

            try {
                await zk.groupParticipantsUpdate(origineMessage, [auteurMessage], "remove");
            } catch (e) {
                console.log("Error removing participant:", e);
            }

            await zk.sendMessage(origineMessage, { delete: key });
        }
    } catch (e) {
        console.log("Error in antilink, antibadwords, and antitag:", e);
    }
};

module.exports = handleAntiLinkBadWordsAndTags
