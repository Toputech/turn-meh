
const { zokou } = require('../framework/zokou');
const axios = require('axios');
const wiki = require('wikipedia');
const conf = require(__dirname + "/../set");

zokou({
  nomCom: "technews",
  reaction: '📰',
  categorie: 'search'
}, async (dest, zk, context) => {
  const { repondre, ms } = context;

  try {
    // Fetching tech news from the API
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const data = response.data;
    const { thumbnail, news } = data;

    await zk.sendMessage(dest, {
      text: news,
      contextInfo: {
        externalAdReply: {
          title: "THIS IS ALONE-MD TECH NEWS",
          body: "keep enjoying", 
          thumbnailUrl: thumbnail, 
          sourceUrl: conf.GURL, 
          mediaType: 1,
          showAdAttribution: true, 
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error fetching tech news:", error);
    await repondre("Sorry, there was an error retrieving the news. Please try again later.\n" + error);
  }
});
zokou({
  nomCom: "trivia",
  reaction: '🤔',
  categorie: 'Fun'
}, async (dest, zk, context) => {
  const { reply: replyToUser, prefix: prefix, ms: messageQuote } = context;
  try {
    // Fetch trivia question using axios
    const response = await axios.get("https://opentdb.com/api.php?amount=1&type=multiple");
    if (response.status !== 200) {
      return replyToUser("Invalid response from the trivia API. Status code: " + response.status);
    }

    const trivia = response.data.results[0];
    const question = trivia.question;
    const correctAnswer = trivia.correct_answer;
    const answers = [...trivia.incorrect_answers, correctAnswer].sort();

    // Format answer choices
    const answerChoices = answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n");

    // Send trivia question with answer choices
    await zk.sendMessage(dest, {
      text: `Here's a trivia question for you: \n\n${question}\n\n${answerChoices}\n\nI will send the correct answer in 10 seconds...`,
      contextInfo: {
        externalAdReply: {
          title: "Trivia Time!",
          body: "Challenge yourself with this fun trivia question!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });

    // Send the correct answer after 10 seconds
    setTimeout(async () => {
      await zk.sendMessage(dest, {
        text: `The correct answer is: ${correctAnswer}`,
        contextInfo: {
          externalAdReply: {
            title: "Trivia Answer Revealed",
            body: "Did you get it right? Try another trivia question!",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      }, { quoted: messageQuote });
    }, 10000); // Delay for 10 seconds

  } catch (error) {
    console.error("Error getting trivia:", error.message);
    await zk.sendMessage(dest, {
      text: "Error getting trivia. Please try again later.",
      contextInfo: {
        externalAdReply: {
          title: "Trivia Error",
          body: "There was an error retrieving the trivia question. Please try again.",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });
  }
});


zokou({
  nomCom: "question",
  categorie: "fun",
  reaction: "🤯"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  try {
    // Respond with a random question
    await zk.sendMessage(dest, {
      text: random_question(),
      contextInfo: {
        externalAdReply: {
          title: "Random Question",
          body: "Here's a fun random question for you to ponder!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: ms });
  } catch (error) {
    console.error("Error while handling 'question' command:", error);
    await repondre("Sorry, something went wrong.");
  }
});
zokou({
 nomCom: "advice",
  aliases: ["wisdom", "wise"],
  reaction: "🗨️",
  categorie: "Fun"
}, async (dest, zk, context) => {
  const { reply: replyToUser, ms: messageQuote } = context;
  try {
    // Get advice from the API using axios
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advice = response.data.slip.advice;

    // Send the advice with ad reply
    await zk.sendMessage(dest, {
      text: `Here is your advice: ${advice} 😊`,
      contextInfo: {
        externalAdReply: {
          title: "Daily Dose of Advice",
          body: "Here’s a little nugget of wisdom to brighten your day!",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });
  } catch (error) {
    console.error("Error fetching advice:", error.message || "An error occurred");
    await replyToUser("Oops, an error occurred while processing your request.");
  }
});
zokou({
  nomCom: "bible",
  reaction: '🎎',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const reference = arg.join(" ");
  
  if (!reference) {
    return repondre("Please specify the book, chapter, and verse you want to read. Example: bible john 3:16", {
      contextInfo: {
        externalAdReply: {
          title: "Bible Reference Required",
          body: "Please provide a book, chapter, and verse.",
          thumbnailUrl: "https://files.catbox.moe/zt9ie6.jpg", // Replace with a suitable thumbnail URL
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true,
        },
      },
    });
  }
  
  try {
    const response = await axios.get(`https://bible-api.com/${reference}`);
    
    if (!response.data) {
      return repondre("Invalid reference. Example: bible john 3:16", {
        contextInfo: {
          externalAdReply: {
            title: "Invalid Bible Reference",
            body: "Please provide a valid book, chapter, and verse.",
            thumbnailUrl: "https://files.catbox.moe/zt9ie6.jpg", // Replace with a suitable thumbnail URL
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true,
          },
        },
      });
    }
    
    const data = response.data;
    const messageText = `
ᬑ *ALONE~MD HOLY BIBLE* ᬒ

⧭ *_WE'RE READING:_* ${data.reference}

⧭ *_NUMBER OF VERSES:_* ${data.verses.length}

⧭ *_NOW READ:_* ${data.text}

⧭ *_LANGUAGE:_* ${data.translation_name}
╭────────────────◆
│ *_Powered by ${conf.OWNER_NAME}*
╰─────────────────◆ `;
    
    await zk.sendMessage(dest, {
      text: messageText,
      contextInfo: {
        externalAdReply: {
          title: "ALONE-MD HOLY BIBLE",
          body: `We're reading: ${data.reference}`,
          mediaType: 1,
          thumbnailUrl: "https://files.catbox.moe/zt9ie6.jpg", 
          sourceUrl: conf.GURL,
          showAdAttribution: true, 
        },
      },
    }, { quoted: ms });
    
  } catch (error) {
    console.error("Error fetching Bible passage:", error);
    await repondre("An error occurred while fetching the Bible passage. Please try again later.", {
      contextInfo: {
        externalAdReply: {
          title: "Error Fetching Bible Passage",
          body: "Please try again later.",
          thumbnailUrl: "https://files.catbox.moe/zt9ie6.jpg", // Replace with a suitable thumbnail URL
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true,
        },
      },
    });
  }
});

zokou({
  nomCom: "define",
  aliases: ["dictionary", "dict", "def"],
  reaction: '😁',
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const term = arg.join(" ");

  if (!term) {
    return repondre("Please provide a term to define.");
  }

  try {
    const { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${term}`);
    const definition = data.list[0];

    if (definition) {
      const definitionMessage = `
        Word: ${term}
        Definition: ${definition.definition.replace(/\[|\]/g, '')}
        Example: ${definition.example.replace(/\[|\]/g, '')}
      `;

      await zk.sendMessage(dest, {
        text: definitionMessage,
        contextInfo: {
          externalAdReply: {
            title: "ALONE-MD DICTIONARY",
            body: `Definition of ${term}`,
            mediaType: 1,
            thumbnailUrl: "https://files.catbox.moe/28j7yx.jpg", 
            sourceUrl: conf.GURL,
            showAdAttribution: true, 
          },
        },
      }, { quoted: ms });

    } else {
      return repondre(`No result found for "${term}".`);
    }
  } catch (error) {
    console.error(error);
    return repondre("An error occurred while fetching the definition.");
  }
});

zokou({
  nomCom: "code",
  aliases: ["session", "pair", "paircode", "qrcode"],
  reaction: '🚀',
  categorie: 'system'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    const replyText = "Example Usage: .code 255673xxxxx.";
    return repondre(replyText);
  }

  try {
    // Notify user that pairing is in progress
    const replyText = "```Wait Alone Md is getting your pair code 💚❤️...```";
    await repondre(replyText);

    // Prepare the API request
    const encodedNumber = encodeURIComponent(arg.join(" "));
    const apiUrl = `https://alone-md-nkds.onrender.com/code?number=${encodedNumber}`;

    // Fetch the pairing code from the API
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data && data.code) {
      const pairingCode = data.code;
      await zk.sendMessage(dest, {
        text: pairingCode,
        contextInfo: {
          externalAdReply: {
            title: "ALONE-MD PAIRING CODE",
            body: "Here is your pairing code:",
            mediaType: 1,
            thumbnailUrl: conf.URL, 
            sourceUrl: conf.GURL,
            showAdAttribution: true, 
          },
        },
      }, { quoted: ms });

      const secondReplyText = "Here is your pair code, copy and paste it to the notification above or link devices.";
      await repondre(secondReplyText);
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    const replyText = "Error getting response from API.";
    repondre(replyText);
  }
});

zokou({
  nomCom: "element",
  reaction: '📓',
  categorie: "search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const elementQuery = arg.join(" ").trim();

  if (!elementQuery) {
    return repondre("Please provide an element symbol or name.");
  }

  try {
    const response = await axios.get(`https://api.popcat.xyz/periodic-table?element=${elementQuery}`);
    
    if (!response.data) {
      return repondre("Could not find information for the provided element. Please check the symbol or name.");
    }

    const data = response.data;
    const thumb = data.image; // Assuming the API returns an 'image' property for the element thumbnail

    const formattedMessage = `
*Alone Md Element Information:*
🚀 *Name:* ${data.name}
🚀 *Symbol:* ${data.symbol}
🚀 *Atomic Number:* ${data.atomic_number}
🚀 *Atomic Mass:* ${data.atomic_mass}
🚀 *Period:* ${data.period}
🚀 *Phase:* ${data.phase}
🚀 *Discovered By:* ${data.discovered_by}
🚀 *Summary:* ${data.summary}
   
Regards ${conf.BOT} `;

    await zk.sendMessage(dest, {
      text: formattedMessage,
      contextInfo: {
        externalAdReply: {
          title: "ALONE-MD ELEMENT INFORMATION",
          body: "Here is the information you requested:",
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: conf.GURL,
          showAdAttribution: true, 
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error fetching the element data:", error);
    repondre("An error occurred while fetching the element data. Please try again later.");
  }
});

zokou({
  nomCom: "github",
  aliases: ["git"],
  reaction: '💻',
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const githubUsername = arg.join(" ");

  if (!githubUsername) {
    return repondre("Give me a valid GitHub username like: github Toputech");
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${githubUsername}`);
    const data = response.data;

    if (data.message === "Not Found") {
      return repondre(`User ${githubUsername} not found.`);
    }

    const thumb = data.avatar_url; // Using the avatar_url as the thumbnail

    const githubMessage = `
°GITHUB USER INFO°
🚩 Id: ${data.id}
🔖 Name: ${data.name}
🔖 Username: ${data.login}
✨ Bio: ${data.bio}
🏢 Company: ${data.company}
📍 Location: ${data.location}
📧 Email: ${data.email || "Not provided"}
📰 Blog: ${data.blog || "Not provided"}
🔓 Public Repos: ${data.public_repos}
🔐 Public Gists: ${data.public_gists}
👪 Followers: ${data.followers}
🫶 Following: ${data.following}
`;

    await zk.sendMessage(dest, {
      text: githubMessage,
      contextInfo: {
        externalAdReply: {
          title: "ALONE-MD GITHUB USER INFO",
          body: `Information about ${data.login}`,
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: conf.GURL,
          showAdAttribution: true,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error fetching GitHub user data:", error);
    await repondre("An error occurred while fetching GitHub user data.");
  }
});

zokou({
  nomCom: "tempmail",
  aliases: ['mail', 'temp'],
  reaction: '💞',
  categorie: "General"
}, async (dest, zk, context) => {
  const { repondre: replyToUser, prefix, ms: messageQuote } = context;

  try {
    const tempEmail = Math.random().toString(36).substring(2, 14) + "@1secmail.com";

    await zk.sendMessage(dest, {
      text: `Your temporary email is: ${tempEmail}

You can use this email for temporary purposes. I will notify you if you receive any emails.`,
      contextInfo: {
        externalAdReply: {
          title: "Temporary Email Service",
          body: "Create temporary emails quickly and easily for privacy and security.",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });

    // Function to check for new emails
    const checkEmails = async () => {
      try {
        const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${tempEmail}&domain=1secmail.com`);
        const emails = response.data;

        if (emails.length > 0) {
          for (const email of emails) {
            const emailDetails = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${tempEmail}&domain=1secmail.com&id=${email.id}`);
            const emailData = emailDetails.data;
            const links = emailData.textBody.match(/(https?:\/\/[^\s]+)/g);
            const linksText = links ? links.join("\n") : "No links found in the email content.";

            await zk.sendMessage(dest, {
              text: `You have received a new email!\n\nFrom: ${emailData.from}\nSubject: ${emailData.subject}\n\n${emailData.textBody}\nLinks found:\n${linksText}`,
              contextInfo: {
                externalAdReply: {
                  title: "Temporary Email Notification",
                  body: "You received a new email on your temporary inbox. Check it out now!",
                  thumbnailUrl: conf.URL,
                  sourceUrl: conf.GURL,
                  mediaType: 1,
                  showAdAttribution: true
                }
              }
            }, { quoted: messageQuote });
          }
        }
      } catch (error) {
        console.error("Error checking temporary email:", error.message);
      }
    };

    // Set an interval to check for new emails every 30 seconds
    const emailCheckInterval = setInterval(checkEmails, 30000);

    // End the email session after 10 minutes
    setTimeout(() => {
      clearInterval(emailCheckInterval);
      zk.sendMessage(dest, {
        text: "Your temporary email session has ended. Please create a new temporary email if needed.",
        contextInfo: {
          externalAdReply: {
            title: "Temporary Email Session Ended",
            body: "Your temporary email session has ended. Need another one? Just ask!",
            thumbnailUrl: conf.URL,
            sourceUrl: conf.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      }, { quoted: messageQuote });
    }, 600000); // 10 minutes in milliseconds

  } catch (error) {
    console.error("Error generating temporary email:", error.message);
    await zk.sendMessage(dest, {
      text: "Error generating temporary email. Please try again later.",
      contextInfo: {
        externalAdReply: {
          title: "Temporary Email Error",
          body: "There was an issue generating your temporary email. Please try again later.",
          thumbnailUrl: conf.URL,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    }, { quoted: messageQuote });
  }
});
zokou({
  nomCom: "wiki",
  aliases: ["wikipedia", "wikipeda"],
  reaction: '❤️',
  categorie: "search"
}, async (zk, dest, context) => {
  const { repondre, arg, ms } = context;

  // Ensure that the search term is provided
  const text = arg.join(" ").trim(); 

  try {
    if (!text) return repondre(`Provide the term to search,\nE.g What is JavaScript!`);
    
    // Fetch summary from Wikipedia
    const con = await wiki.summary(text);
    
    // Format the reply message
    const texa = `
*📚 Wikipedia Summary 📚*

🔍 *Title*: _${con.title}_

📝 *Description*: _${con.description}_

💬 *Summary*: _${con.extract}_

🔗 *URL*: ${con.content_urls.mobile.page}

> Powered by Alone Md
    `;
    repondre(texa);
  } catch (err) {
    console.error(err);
    repondre(`Got 404. I did not find anything!`);
  }
})
