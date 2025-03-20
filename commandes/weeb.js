const axios = require('axios');
const fs = require('fs');
const { zokou } = require("../framework/zokou");
const { writeFile } = require('fs/promises')


zokou({nomCom:"couplepp",categorie: "Weeb",reaction : "💞"},async(dest,zk,commandeOptions)=>{ const {repondre , ms} = commandeOptions;
    let api = 'https://smiling-hosiery-bear.cyclic.app/weeb/couplepp'
  try {
     repondre('she/he dont love you :)')
 const result = await axios.get(api)
  

    zk.sendMessage(dest, { image: { url: result.data.male }, caption: `For Man` }, { quoted: ms })
        zk.sendMessage(dest, { image: { url: result.data.female }, caption: `_For woman_` }, { quoted: ms })
    
  } catch (e) { repondre(e)}                                                                                        
  
}
      )

