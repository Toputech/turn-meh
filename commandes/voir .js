const {zokou}=require("../framework/zokou");
const {getContentType}=require("@whiskeysockets/baileys");

const { downloadAndSaveMediaMessage } = require('@whiskeysockets/baileys');

zokou({nomCom:"vv",categorie:"system",reaction:"🫣"},async(dest,zk,commandeOptions)=>{

const {ms,msgRepondu,repondre}=commandeOptions;


if(!msgRepondu){return repondre("*Mention a view once media* .");}


if(msgRepondu.viewOnceMessage)
{
      if(msgRepondu.viewOnceMessage.message.imageMessage)
       {
         var image =await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessage.message.imageMessage)
        var texte = msgRepondu.viewOnceMessage.message.imageMessage.caption
    
     await zk.sendMessage(dest,{image:{url:image},caption:texte},{quoted:ms})
      }else if(msgRepondu.viewOnceMessage.message.videoMessage){

    var video = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessage.message.videoMessage)
var texte =msgRepondu.viewOnceMessage.message.videoMessage.caption


await zk.sendMessage(dest,{video:{url:video},caption:texte},{quoted:ms})

}
}else
{
   return repondre("```this message is not on view once .```")
}



})
