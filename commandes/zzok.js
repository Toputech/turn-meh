const { zokou } = require("../framework/zokou");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../bdd/antibot");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');
const cron = require("../bdd/cron");
const { exec } = require("child_process")
zokou({ nomCom: "antilink", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*for groups only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.") ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antilink is already activated for this group")
                    } else {
                  await ajouterOuMettreAJourJid(dest,"oui");
                
              repondre("the antilink is activated successfully") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await ajouterOuMettreAJourJid(dest , "non");

                repondre("The antilink has been successfully deactivated");
                
              } else {
                repondre("antilink is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {
                            

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`The anti-link action has been updated to ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("The only actions available are warn, remove, and delete") ;
              }
            

            } else repondre("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.")

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('You are not entitled to this order') ;
  }

});


