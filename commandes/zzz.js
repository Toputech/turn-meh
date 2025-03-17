const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../bdd/antibot")
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');



zokou({ nomCom: "tagalladmin", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions;

  if (!verifGroupe) { 
    repondre("✋🏿 ✋🏿 This command is reserved for groups ❌"); 
    return; 
  }

  if (!verifAdmin && !superUser) { 
    repondre("Command reserved for admins ❌"); 
    return; 
  }

  let mess = arg && arg !== ' ' ? arg.join(' ') : 'Aucun Message';

  let adminsGroupe = infosGroupe.participants.filter(membre => membre.admin); // Filtering only admins

  let tag = `  
╭─────────────━┈⊷ 
│🔰 ALONE MD v²
╰─────────────━┈⊷ \n
│👥 *Group* : ${nomGroupe} 
│👤 *Hey😀* : *${nomAuteurMessage}* 
│📜 *Message* : *${mess}* 
╰─────────────━┈⊷\n\n`;

  let emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$', '😟', '🥵', '🐅'];
  let random = Math.floor(Math.random() * emoji.length);

  for (const membre of adminsGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`;
  }

  zk.sendMessage(dest, { text: tag, mentions: adminsGroupe.map(i => i.id) }, { quoted: ms });

});

zokou({ nomCom: "fakereply", categorie: "Tools" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;

    // Function to generate a random word with meaning from A-Z
    const generateRandomWord = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        let wordLength = Math.floor(Math.random() * 5) + 3; // Word length between 3-7
        let word = "";

        for (let i = 0; i < wordLength; i++) {
            let randomIndex = Math.floor(Math.random() * alphabet.length);
            word += alphabet[randomIndex];
        }

        return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize first letter
    };

    let replyText = generateRandomWord();
    repondre(replyText);
});

zokou({
    nomCom: "chifumi",
    categorie: "Games",
    reaction: "📺"
  },
  async (origineMessage, zk, commandeOptions) => {
    const { repondre, ms, auteurMessage, auteurMsgRepondu, msgRepondu , arg , idBot } = commandeOptions;

    if (msgRepondu) {
        zk.sendMessage(origineMessage, {
            text: `@${auteurMessage.split('@')[0]} invite @${auteurMsgRepondu.split('@')[0]} Pour jouer au jeu de chifoumi (Pierre-feuille-ciseaux);
Pour accepter le défi, tapez oui`,
            mentions: [auteurMessage, auteurMsgRepondu]
        });

        try {
            const repinv = await zk.awaitForMessage({
                sender: auteurMsgRepondu,
                chatJid: origineMessage,
                timeout: 30000 // 30 secondes
            });
   console.log(repinv) ;

            if (repinv.message.conversation.toLowerCase() === 'oui' || repinv.message.extendedTextMessage.text.toLowerCase() === 'oui' ) {

              let msg1 = `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]}
*joueur 2 :* @${auteurMessage.split('@')[0]}

*Regle :* Le jeu va bientot debute , vous avez 1min maxi seconde pour faire un choix dans ma discussion  priver chacun son tours ;`

      zk.sendMessage(origineMessage,{text : msg1,mentions : [auteurMessage, auteurMsgRepondu]} ) ;

      let msg2 = `Vous avez droit a 3 choix ;

   pierre
   papier
   ciseaux

 Veillez envoyez votre choix`
 let players = [auteurMessage,auteurMsgRepondu] ;
let choix = [] ;

 try {

        for (const player of players) {

         zk.sendMessage(origineMessage,{ text : `@${player.split("@")[0]} Veillez vous diriger dans cette discussion pour faire un choix https://wa.me/${idBot.split('@')[0]} ` , mentions : [player]})
            zk.sendMessage(player,{text : msg2}) ;

          const msgrecu =  await zk.awaitForMessage({
                sender: player,
                chatJid: player,
                timeout: 30000 // 30 secondes
            });
           console.log('voici le message de' + ' ' + player)
     console.log(msgrecu)

            choix.push(msgrecu.message.extendedTextMessage.text.toLowerCase()) ;

        }

        console.log(choix)
  const choixPossibles = ["pierre", "papier", "ciseaux"];    

  const choixJoueur1 = choix[0] ;
const choixJoueur2 = choix[1] ;


if (!choixPossibles.includes(choixJoueur1) || !choixPossibles.includes(choixJoueur2)) {
    // Gérez le cas où les choix ne sont pas valides
    zk.sendMessage(origineMessage,{ text : `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]}
*joueur 2 :* @${auteurMessage.split('@')[0]}

*resultat :* l'un ou les deux choix ne sont pas valides.`, mentions : [auteurMessage, auteurMsgRepondu] });

} else if (choixJoueur1 === choixJoueur2) {
    // C'est une égalité
    zk.sendMessage(origineMessage,{ text : `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]} a choisi(e) *${choixJoueur2}* 
*joueur 2 :* @${auteurMessage.split('@')[0]} a choisi(e) *${choixJoueur1}*

resultat : il y'a donc match nul` , mentions : [auteurMessage, auteurMsgRepondu] });
} else if (
    (choixJoueur1 === "pierre" && choixJoueur2 === "ciseaux") ||
    (choixJoueur1 === "papier" && choixJoueur2 === "pierre") ||
    (choixJoueur1 === "ciseaux" && choixJoueur2 === "papier")
) {
    // Joueur 1 gagne
    zk.sendMessage(origineMessage,{ text : `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]} a choisi(e) *${choixJoueur2}* 
*joueur 2 :* @${auteurMessage.split('@')[0]} a choisi(e) *${choixJoueur1}*

*resultat :* @${auteurMessage.split('@')[0]} remporte la partie ` ,mentions : [auteurMessage, auteurMsgRepondu] });
} else {
    // Joueur 2 gagne
    zk.sendMessage(origineMessage,{ text : `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]} a choisi(e) *${choixJoueur2}* 
*joueur 2 :* @${auteurMessage.split('@')[0]} a choisi(e) *${choixJoueur1}*

*resultat :* @${auteurMsgRepondu.split('@')[0]} remporte la partie ` , mentions : [auteurMessage, auteurMsgRepondu] });
}

           } catch (error) {
            if (error.message === 'Timeout') {
                // Le temps d'attente est écoulé
                zk.sendMessage(origineMessage,{ text : `*joueur 1 :* @${auteurMsgRepondu.split('@')[0]}
*joueur 2 :* @${auteurMessage.split('@')[0]}

*resultat :* nos joueurs ont mis trop de temps pour ce decider ;
Par consequent , le jeu est annuler` , mentions : [auteurMessage, auteurMsgRepondu]});
            } else {
                // Gérez d'autres erreurs ici si nécessaire
                console.error(error);
            }
           }

           } else {
                repondre('invitation refuse') ;
            }


        } catch (error) {
            if (error.message === 'Timeout') {
                // Le temps d'attente est écoulé
                zk.sendMessage(origineMessage,{ text : `@${auteurMsgRepondu.split('@')[0]} a mis trop de temps pour repondre a l'invitation de @${auteurMessage.split('@')[0]} ;
Par consequent , le jeu est annuler`, mentions : [auteurMessage, auteurMsgRepondu]});
            } else {
                // Gérez d'autres erreurs ici si nécessaire
                console.error(error);
            }
        }
    }
});


zokou(
    { nomCom: "quizz", categorie: "Games", reaction: "👨🏿‍💻" },
    async (origineMessage, zk, commandeOptions) => {
        const { repondre, auteurMessage } = commandeOptions;

        try {
         let quizz = await axios.get("https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=1&difficulty=facile") ;


   let msg = `     Hacking-Quizz-Games

*Categorie :* ${quizz.data.quizzes[0].category}
*Question :* ${quizz.data.quizzes[0].question}\n\n*Propositon de reponses :*\n`

let Answers =[] ;
       for (const reponse of quizz.data.quizzes[0].badAnswers) {

         Answers.push(reponse)

       } ;

       Answers.push(quizz.data.quizzes[0].answer) ;

      async function shuffleArray(array) {
        const shuffledArray = array.slice(); // Copie du tableau d'origine

        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
      } ;

 let choix = await shuffleArray(Answers) ;

 for (let i = 0; i < choix.length; i++) {
    msg += `*${i + 1} :* ${choix[i]}\n`;
}


     msg+= `
Entrez le chiffre de votre choix`

       repondre(msg) ;

       let rep = await  zk.awaitForMessage({
        sender: auteurMessage,
        chatJid : origineMessage,
        timeout: 15000 // 30 secondes
    });
   let repse ;  
    try {
        repse = rep.message.extendedTextMessage.text
    } catch {
        repse = rep.message.conversation
    } ;

    if (choix[repse - 1 ] == quizz.data.quizzes[0].answer ) {

        repondre("Bravo vous avez trouvez la bonne reponse ;")
    } else {

        repondre("Erreur fin du quizz")
    }

        } catch (error) {
            console.log(error);
        }
    }
);

zokou({

    nomCom: "getall",
    categorie: "owner",
    reaction: "📜",
    fromMe: true,
    desc: "Get JIDs of all members of groups, personal chats, or all groups.",
    usage: "[ members / user / groups ]",
    filename: __filename,
    public: false
}, async (dest, zk, commandeOptions) => {
    try {
        let text = zk.body.split(" ")[1]; // Get command argument
        let response = "";

        if (!text) {
            return dest.reply(`*Use:* ${prefix}getall members | user | groups`);
        }

        if (text === "members" || text === "member") {
            if (!zk.isGroup) return dest.reply(tlang("group"));
            const participants = zk.metadata.participants || [];
            for (let i of participants) {
                response += `📍 ${i.id}\n`;
            }
            response ? dest.reply(`*「 LIST OF GROUP MEMBERS 」*\n\n` + response) : dest.reply("*Request Denied!*");

        } else if (text === "user" || text === "pm" || text === "pc") {
            let privateChats = (await zokou.chats.all()).filter(v => v.id.endsWith('.net'));
            for (let i of privateChats) {
                response += `📍 ${i.id}\n`;
            }
            response ? dest.reply(`*「 LIST OF PERSONAL CHATS 」*\n\nTotal ${privateChats.length} users in personal chat.\n\n` + response) : dest.reply("*Request Denied!*");

        } else if (text === "group" || text === "groups" || text === "gc") {
            let allGroups = await zokou.groupFetchAllParticipating();
            const groupList = Object.entries(allGroups).map(([key, value]) => value.id);
            for (let i of groupList) {
                response += `📍 ${i}\n`;
            }
            response ? dest.reply(`*「 LIST OF GROUP CHAT JIDS 」*\n\n` + response) : dest.reply("*Request Denied!*");

        } else {
            return dest.reply(`*Use:* ${prefix}getall members | user | groups`);
        }

    } catch (error) {
        console.error(error);
        dest.reply(`*Error in getall command:* ${error.message}`);
    }
});
zokou({
  nomCom: "timezone",
  aliases: ["timee", "datee"],
  desc: "Check the current local time and date for a specified timezone.",
  categorie: "new",
  reaction: '🕰️',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const timezone = arg[0];

  if (!timezone) {
    return repondre("❌ Please provide a timezone code. Example: .timezone TZ");
  }

  try {
    // Get current date and time
    const now = new Date();

    // Get local time and date in the specified timezone
    const options = { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true, 
      timeZone: timezone 
    };

    const timeOptions = { 
      ...options, 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };

    const localTime = now.toLocaleTimeString("en-US", options);
    const localDate = now.toLocaleDateString("en-US", timeOptions);

    // Send the local time and date as reply
    repondre(`🕰️ *Current Local Time:* ${localTime}\n📅 *Current Date:* ${localDate}`);
  } catch (e) {
    console.error("Error in .timezone command:", e);
    repondre("❌ An error occurred. Please try again later.");
  }
});

zokou({
  nomCom: "color",
  aliases: ["rcolor", "colorcode"],
  desc: "Generate a random color with name and code.",
  categorie: "script",
  reaction: '🤦',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;

  try {
    const colorNames = [
      "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", 
      "Gray", "Cyan", "Magenta", "Violet", "Indigo", "Teal", "Lavender", "Turquoise"
    ];

    const randomColorHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];

    repondre(`🎨 *Random Color:* \nName: ${randomColorName}\nCode: ${randomColorHex}`);
  } catch (e) {
    console.error("Error in .color command:", e);
    repondre("❌ An error occurred while generating the random color.");
  }
});


zokou({
  nomCom: "binary",
  aliases: ["binarydgt", "binarycode"],
  desc: "Convert text into binary format",
  categorie: "script",
  reaction: '🤦',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  if (!text) {
    return repondre('Please provide a text to convert to binary.');
  }

  try {
    const binaryText = text.split('').map(char => {
      return `00000000${char.charCodeAt(0).toString(2)}`.slice(-8);
    }).join(' ');

    repondre(`🔑 *Binary Representation:* \n${binaryText}`);
  } catch (e) {
    console.error("Error in .binary command:", e);
    repondre("❌ An error occurred while converting to binary.");
  }
});

zokou({
  nomCom: "dbinary",
  aliases: ["binarydecode", "decodebinary"],
  desc: "Decode binary string into text.",
  categorie: "script",
  reaction: '🔓',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  if (!text) {
    return repondre("❌ Please provide the binary string to decode.");
  }

  try {
    const binaryString = text;
    const textDecoded = binaryString.split(' ').map(bin => {
      return String.fromCharCode(parseInt(bin, 2));
    }).join('');

    repondre(`🔓 *Decoded Text:* \n${textDecoded}`);
  } catch (e) {
    console.error("Error in .dbinary command:", e);
    repondre("❌ An error occurred while decoding the binary string.");
  }
});

zokou({
  nomCom: "base64",
  aliases: ["base64encode", "encodebase64"],
  desc: "Encode text into Base64 format.",
  categorie: "script",
  reaction: '🔒',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  if (!text) {
    return repondre("❌ Please provide the text to encode into Base64.");
  }

  try {
    // Encode the text into Base64
    const encodedText = Buffer.from(text).toString('base64');

    // Send the encoded Base64 text
    repondre(`🔑 *Encoded Base64 Text:* \n${encodedText}`);
  } catch (e) {
    console.error("Error in .base64 command:", e);
    repondre("❌ An error occurred while encoding the text into Base64.");
  }
});

zokou({
  nomCom: "unbase64",
  aliases: ["base64decode", "decodebase64"],
  desc: "Decode Base64 encoded text.",
  categorie: "script",
  reaction: '🔓',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  if (!text) {
    return repondre("❌ Please provide the Base64 encoded text to decode.");
  }

  try {
    // Decode the Base64 text
    const decodedText = Buffer.from(text, 'base64').toString('utf-8');

    // Send the decoded text
    repondre(`🔓 *Decoded Text:* \n${decodedText}`);
  } catch (e) {
    console.error("Error in .unbase64 command:", e);
    repondre("❌ An error occurred while decoding the Base64 text.");
  }
});

zokou({
  nomCom: "urlencode",
  aliases: ["urlencode", "encodeurl"],
  desc: "Encode text into URL encoding.",
  categorie: "script",
  reaction: '🔒',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  if (!text) {
    return repondre("❌ Please provide the text to encode into URL encoding.");
  }

  try {
    // Encode the text into URL encoding
    const encodedText = encodeURIComponent(text);

    // Send the encoded URL text
    repondre(`🔑 *Encoded URL Text:* \n${encodedText}`);
  } catch (e) {
    console.error("Error in .urlencode command:", e);
    repondre("❌ An error occurred while encoding the text.");
  }
});

zokou({
  nomCom: "urldecode",
  aliases: ["decodeurl", "urldecode"],
  desc: "Decode URL encoded text.",
  categorie: "coding",
  reaction: '🔓',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  if (!text) {
    return repondre("❌ Please provide the URL encoded text to decode.");
  }

  try {
    const decodedText = decodeURIComponent(text);

    repondre(`🔓 *Decoded Text:* \n${decodedText}`);
  } catch (e) {
    console.error("Error in .urldecode command:", e);
    repondre("❌ An error occurred while decoding the URL encoded text.");
  }
});

zokou({
  nomCom: "dice",
  aliases: ["rolldice", "diceroll", "roll"],
  desc: "Roll a dice (1-6).",
  categorie: "fun",
  reaction: '🎲',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    // Roll a dice (generate a random number between 1 and 6)
    const result = Math.floor(Math.random() * 6) + 1;

    // Send the result
    repondre(`🎲 You rolled: *${result}*`);
  } catch (e) {
    console.error("Error in .roll command:", e);
    repondre("❌ An error occurred while rolling the dice.");
  }
});

zokou({
  nomCom: "coinflip",
  aliases: ["flipcoin", "coinflip"],
  desc: "Flip a coin and get Heads or Tails.",
  categorie: "fun",
  reaction: '🪙',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    // Simulate coin flip (randomly choose Heads or Tails)
    const result = Math.random() < 0.5 ? "Heads" : "Tails";

    // Send the result
    repondre(`🪙 Coin Flip Result: *${result}*`);
  } catch (e) {
    console.error("Error in .coinflip command:", e);
    repondre("❌ An error occurred while flipping the coin.");
  }
});

zokou({
  nomCom: "flip",
  aliases: ["fliptext", "textflip"],
  desc: "Flip the text you provide.",
  categorie: "fun",
  reaction: '🔄',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  if (!text) {
    return repondre("❌ Please provide the text to flip.");
  }

  try {
    // Flip the text
    const flippedText = text.split('').reverse().join('');

    // Send the flipped text
    repondre(`🔄 Flipped Text: *${flippedText}*`);
  } catch (e) {
    console.error("Error in .flip command:", e);
    repondre("❌ An error occurred while flipping the text.");
  }
});

zokou({
  nomCom: "pick",
  aliases: ["choose", "select"],
  desc: "Pick between two choices.",
  categorie: "fun",
  reaction: '🚚',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  // Ensure two options are provided
  if (!text.includes(',')) {
    return repondre("❌ Please provide two choices to pick from. Example: `.pick Ice Cream, Pizza`");
  }

  try {
    // Pick a random option
    const options = text.split(',').map(option => option.trim());
    const choice = options[Math.floor(Math.random() * options.length)];

    // Send the result
    repondre(`🎉 Bot picks: *${choice}*`);
  } catch (e) {
    console.error("Error in .pick command:", e);
    repondre("❌ An error occurred while processing your request.");
  }
});

zokou({
  nomCom: "timenow",
  aliases: ["currenttime", "time"],
  desc: "Check the current local time.",
  categorie: "new",
  reaction: '🕰️',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    // Get current date and time
    const now = new Date();

    // Get local time in the configured timezone
    const localTime = now.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true,
      timeZone: conf.TIMEZONE, // Using the configured timezone from set.js
    });

    // Send the local time as reply
    repondre(`🕒 Current Local Time: ${localTime}`);
  } catch (e) {
    console.error("Error in .timenow command:", e);
    repondre("❌ An error occurred. Please try again later.");
  }
});


zokou({
  nomCom: "date",
  aliases: ["currentdate", "todaydate"],
  desc: "Check the current date.",
  categorie: "new",
  reaction: '📆',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    // Get current date
    const now = new Date();

    // Get the formatted date (e.g., "Monday, January 15, 2025")
    const currentDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Send the current date as reply
    repondre(`📅 Current Date: ${currentDate}`);
  } catch (e) {
    console.error("Error in .date command:", e);
    repondre("❌ An error occurred. Please try again later.");
  }
});


zokou({
  nomCom: "calculate2",
  aliases: ["calcu", "maths", "mathema"],
  desc: "Evaluate a mathematical expression.",
  categorie: "new",
  reaction: '🧮',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  // Ensure arguments are provided
  if (!text) {
    return repondre("🧮 Use this command like:\n *Example:* .calculate 5+3*2");
  }

  // Validate the input to prevent unsafe operations
  if (!/^[0-9+\-*/().\s]+$/.test(text)) {
    return repondre("❎ Invalid expression. Only numbers and +, -, *, /, ( ) are allowed.");
  }

  try {
    // Evaluate the mathematical expression
    let result = eval(text);

    // Reply with the result
    repondre(`✅ Result of "${text}" is: ${result}`);
  } catch (e) {
    console.error("Error in .calculate command:", e);
    repondre("❎ Error in calculation. Please check your expression.");
  }
});

zokou({
  nomCom: "emojify",
  aliases: ["emoji", "txtemoji"],
  desc: "Convert text into emoji form.",
  categorie: "fun",
  reaction: '🙂',
}, async (dest, zk, context) => {
  const { repondre, arg } = context;
  const text = arg.join(" ");

  // If no valid text is provided
  if (!text) {
    return repondre("❌ Please provide some text to convert into emojis!");
  }

  try {
    // Map text to corresponding emoji characters
    const emojiMapping = {
      "a": "🅰️",
      "b": "🅱️",
      "c": "🇨️",
      "d": "🇩️",
      "e": "🇪️",
      "f": "🇫️",
      "g": "🇬️",
      "h": "🇭️",
      "i": "🇮️",
      "j": "🇯️",
      "k": "🇰️",
      "l": "🇱️",
      "m": "🇲️",
      "n": "🇳️",
      "o": "🅾️",
      "p": "🇵️",
      "q": "🇶️",
      "r": "🇷️",
      "s": "🇸️",
      "t": "🇹️",
      "u": "🇺️",
      "v": "🇻️",
      "w": "🇼️",
      "x": "🇽️",
      "y": "🇾️",
      "z": "🇿️",
      "0": "0️⃣",
      "1": "1️⃣",
      "2": "2️⃣",
      "3": "3️⃣",
      "4": "4️⃣",
      "5": "5️⃣",
      "6": "6️⃣",
      "7": "7️⃣",
      "8": "8️⃣",
      "9": "9️⃣",
      " ": "␣" // for space
    };

    // Convert the input text into emoji form
    const emojiText = text.toLowerCase().split("").map(char => emojiMapping[char] || char).join("");

    await zk.sendMessage(dest, {
      text: emojiText,
    }, { quoted: context.ms });

  } catch (e) {
    console.error("Error in .emoji command:", e);
    repondre(`❌ Error: ${e.message}`);
  }
});



zokou({
  nomCom: "news2",
  aliases: ["latestnews", "newsheadlines"],
  desc: "Get the latest news headlines.",
  categorie: "AI",
  reaction: '🗞️',
}, async (dest, zk, context) => {
  const { repondre, from } = context;

  try {
    const apiKey = "0f2c43ab11324578a7b1709651736382";
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const articles = response.data.articles;

    if (!articles.length) {
      return repondre("No news articles found.");
    }

    // Send each article as a separate message with image and title
    for (let i = 0; i < Math.min(articles.length, 5); i++) {
      const article = articles[i];
      let message = `
📰 *${article.title}*
📝 _${article.description}_
🔗 _${article.url}_

> © Powered by ${conf.BOT}
      `;

      console.log('Article URL:', article.urlToImage); // Log image URL for debugging

      if (article.urlToImage) {
        // Send image with caption
        await zk.sendMessage(dest, { image: { url: article.urlToImage }, caption: message });
      } else {
        // Send text message if no image is available
        await zk.sendMessage(dest, { text: message });
      }
    }
  } catch (e) {
    console.error("Error fetching news:", e);
    repondre("Could not fetch news. Please try again later.");
  }
});