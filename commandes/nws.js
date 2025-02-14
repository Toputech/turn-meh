const { zokou } = require('../framework/zokou');
const Heroku = require('heroku-client');
const s = require("../set");
const axios = require("axios");
const speed = require("performance-now");
const { exec } = require("child_process");
const conf = require(__dirname + "/../set");
const util = require('util');
const fs = require('fs-extra');
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
zokou({
  nomCom: 'oxy',
  aliases: ['logs', 'running'],
  desc: 'To check runtime',
  categorie: 'system', // Fixed the typo here (Categorie -> categorie)
  reaction: '❤️',
  fromMe: true, // Removed quotes to make it a boolean
}, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
*ALONE MD AVAILABLE MENUS* 


    ▸ *commander* : ${cm.length} 
    ▸ *rom* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
    ▸ *uptime* : ${os.platform()}
    ▸ *theme* : *TOPU TECH*

> ALONE❣️ MD WA BOT
> POWERED BY TOPU TECH 💎\n${readmore}`;
    
let menuMsg = `
> Hello ${nomAuteurMessage},,, Type menu2 to access a list of commands. 
  
╰───────────────────⏣`;
    
  // Send uptime information to the user
  try {
        const senderName = message.sender || message.from;
        await zk.sendMessage(message, {
            text: infomsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: `ALONE MD`,
                    body: conf.OWNER_NAME,
                    thumbnailUrl: conf.URL,
                    sourceUrl: conf.GURL,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        respond("🥵🥵 Menu error: " + error);
    }
});
