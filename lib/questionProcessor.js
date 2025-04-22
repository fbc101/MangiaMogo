import gemini from './gemini';

export async function processUserMessage(user_message, recipe) {
    try {
      const systemPrompt = `
        You are a fun recipe assistant. 
        Provide some basic explanations of the user's question based on the provided recipe.
        Be excited, friendly, but concise.

        Respond with a JSON only, in this format:
        {
          "response": <string>
        }
      `;
  
      const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [systemPrompt, user_message, recipe],
      });
  
      const text = response.text;
      const cleanedText = text.replace(/```json\n/, '').replace(/\n```$/, '');
      const geminiResponse = JSON.parse(cleanedText);
      console.log('geminiResponse', geminiResponse);

      return {
        content: geminiResponse.response
      };
    } catch (error) {
      console.error("Error processing query with gemini:", error);
      return {
        content: "I'm having trouble understanding your request. Could you rephrase it?"
      };
    }
  }