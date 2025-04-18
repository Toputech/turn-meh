












const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { zokou } = require(__dirname + "/../framework/zokou");
const os = require("os");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

const AUDIO_URL = "https://files.catbox.moe/z2roat.m4v"; // New audio URL
const THUMBNAIL_URL = "https://files.catbox.moe/yedfbr.jpg"; // New image URL

moment.tz.setDefault(`${conf.TZ}`);

const getTimeAndDate = () => {
    return {
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Ping Command
zokou({ nomCom: "ping", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 100) + 1; // Generate a random ping between 1ms - 100ms

    try {
        zk.sendMessage(dest, {
        contextInfo: {
          text: "This member cannot be removed because he is an administrator of the group",
        forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363295141350550@newsletter',
              newsletterName: 'ALONE Queen MD V²',
              serverMessageId: 143},
        externalAdReply: {
          
          title: "Follow for updates",
          body: "Enjoy..!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          
        }
      }
    }, { quoted: ms });       

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});
