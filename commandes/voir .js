const {zokou}=require("../framework/zokou")
const {getContentType}=require("@whiskeysockets/baileys")



zokou({nomCom:"vv",categorie:"system",reaction:"🫣"},async(dest,zk,commandeOptions)=>{

const {ms,msgRepondu,repondre}=commandeOptions;


if(!msgRepondu){return repondre("*Mention a view once media* .");}


if(msgRepondu.viewOnceMessageV3)
{
      if(msgRepondu.viewOnceMessageV3.message.imageMessage)
       {
         var image =await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV3.message.imageMessage)
        var texte = msgRepondu.viewOnceMessageV3.message.imageMessage.caption
    
     await zk.sendMessage(dest,{image:{url:image},caption:texte},{quoted:ms})
      }else if(msgRepondu.viewOnceMessageV3.message.videoMessage){

    var video = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV3.message.videoMessage)
var texte =msgRepondu.viewOnceMessageV3.message.videoMessage.caption


await zk.sendMessage(dest,{video:{url:video},caption:texte},{quoted:ms})

}
}else
{
   return repondre("```this message is not on view once .```")
}



})
