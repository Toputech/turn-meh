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