const { zokou } = require("../framework/zokou");
const ai = require('unlimited-ai');

zokou({
  nomCom: "gpt",
  aliases: ["gpt4", "ai"],
  reaction: '⚔️',
  categorie: "search"
}, async (context, message, params) => {
  const { repondre, arg } = params;  // Use args for the command arguments
  const alone = arg.join(" ").trim(); // Assuming args is an array of command parts

  if (!alone) {
    return repondre("Please provide a song name.");
  }

  // Assuming 'alone' is the text we want to use in the AI prompt
  const text = alone;  // Set the text that will be passed to the AI

  // Wrapped in an async IIFE to keep the flow correct
  (async () => {
    const model = 'gpt-4-turbo-2024-04-09'; 

    const messages = [
      { role: 'user', content: text },
      { role: 'system', content: 'You are an assistant in WhatsApp. You are called Topu. You respond to user commands.' }
    ];

    try {
      const response = await ai.generate(model, messages);
      await repondre(response);  // Send the response back to the user
    } catch (error) {
      console.error("Error generating AI response:", error);
      await repondre("Sorry, I couldn't process your request.");
    }
  })();
});

zokou({
  nomCom: "gemini",
  aliases: ["gpto4", "gemni", "gpt2", "gpt3"],
  reaction: '⚔️',
  categorie: "search"
}, async (context, message, params) => {
  const { repondre, arg } = params;
  const elementQuery = arg.join(" ").trim(); // Use 'arg' to capture the user query

  // Check if elementQuery is empty
  if (!elementQuery) {
    return repondre("Please provide a song name.");
  }

  try {
    // Dynamically import Gemini AI
    const { default: Gemini } = await import('gemini-ai');
    const gemini = new Gemini("AIzaSyDNO5AWTAL9buuRtqe3MZKXNhQCdGIljyk");

    const chat = gemini.createChat();

    // Ask Gemini AI for a response
    const res = await chat.ask(elementQuery);

    // Send the response back to the user
    await repondre(res);
  } catch (e) {
    // Handle errors by sending a message to the user
    await repondre("I am unable to generate responses\n\n" + e.message);
  }
});
