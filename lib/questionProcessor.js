import gemini from './gemini';

export async function processUserMessage(user_message, recipe) {
  try {
    const systemPrompt = `
      You are a fun recipe assistant. 
      Provide some basic explanations of the user's question based on the provided recipe.
      Be excited, friendly, but concise.
    `;

    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [systemPrompt, user_message, recipe],
    });

    const text = response.text;
    console.log('response.text', text);

    return {
      content: text
    };
  } catch (error) {
    console.error("Error processing query with gemini:", error);
    return {
      content: "I'm having trouble understanding your request. Could you rephrase it?"
    };
  }
}

export async function processUserMessageWithBot(bot, user_message) {
  try {
    const systemPrompt = `
      Pretend you are the person/character that you are given, and respond to the user's message in a way that is consistent with that character's personality and style.
    `;

    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [systemPrompt, bot, user_message],
    });

    const text = response.text;
    console.log('response.text', text);

    return {
      content: text
    };
  } catch (error) {
    console.error("Error processing query with gemini:", error);
    return {
      content: "I'm having trouble understanding your request. Could you rephrase it?"
    };
  }
}