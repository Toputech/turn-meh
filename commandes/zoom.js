const { zokou } = require('../framework/zokou');

const isIdeaCommandEnabled = true; // Variable pour activer ou désactiver la commande "idea"

const { zokou } = require("../framework/zokou");
const conf = require(__dirname + "/../set");
const axios = require('axios');




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
zokou({ nomCom: "lydea", categorie: "IA", reaction:"❣️", active: isIdeaCommandEnabled }, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre } = commandeOptions;
  const message = arg.join(' ');

  // Greetings
  const greetings = ["Hello!", "Hi there!", "Greetings!", "Hey!", "Nice to see you!"];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Introduction
  const introduction = [
    "I'm Assistant, a helpful bot. I'm here to assist you with any questions or tasks you have.",
    "Welcome! I'm Assistant, your friendly bot here to help you with anything you need.",
    "Hi! I'm Assistant, your personal AI assistant. How can I assist you today?",
    "Greetings! I'm Assistant, ready to assist you with your queries and tasks."
  ];
  const randomIntroduction = introduction[Math.floor(Math.random() * introduction.length)];

  // Project Suggestions
  const projet = [
    "You should start a new project related to your passion!",
    "How about working on a creative project that excites you?",
    "Consider starting a project that aligns with your interests and goals.",
    "Why not embark on a project that challenges and inspires you?"
  ];
  const randomProjet = projet[Math.floor(Math.random() * projet.length)];

  // Suggestions for "presentement"
  const presentement = [
    "Currently, you could learn a new skill or hobby.",
    "Right now, you might explore new books or movies.",
    "At the moment, you could try practicing mindfulness or meditation.",
    "Presently, you could focus on improving your physical fitness."
  ];
  const randomPresentement = presentement[Math.floor(Math.random() * presentement.length)];

  // Custom response for the "idea" command when it is enabled
  const customResponse = `This is a custom response for the 'idea' command when it is enabled.
Réponse générée le ${new Date().toLocaleString()}.`;

  // Check if the "idea" command is enabled
  if (isIdeaCommandEnabled) {
    // Ajouter un délai de 60 secondes pour la réponse
    setTimeout(() => {
      repondre(customResponse);
    }, 60000); // 60 secondes (60000 millisecondes)
  } else {
    // Envoyer une réponse indiquant que la commande est désactivée
    repondre("Désolé, la commande 'idea' est actuellement désactivée.");
    return;
  }

  // Vérifier le contenu du message et générer une réponse en conséquence
  if (message.includes('project')) {
    repondre(` ${randomGreeting} ${randomProjet} ${randomIntroduction}`);
  } else if (message.includes('book')) {
    repondre(` ${randomGreeting} How about writing a book on a topic you're knowledgeable about? ${randomIntroduction}`);
  } else if (message.includes('trip') || message.includes('travel')) {
    repondre(` ${randomGreeting} Plan a trip to a destination you've always wanted to visit! ${randomIntroduction}`);
  } else if (message.includes('presentement')) {
    repondre(` ${randomGreeting} ${randomPresentement} ${randomIntroduction}`);
  } else {
    repondre(` ${randomGreeting} I have an idea for you, but I need more information. Could you provide more details? ${randomIntroduction}`);
  }
});
