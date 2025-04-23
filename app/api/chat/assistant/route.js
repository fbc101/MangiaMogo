import { processUserMessage } from "../../../../lib/questionProcessor";

export async function POST(request) {
  try {
    const { message, recipe } = await request.json();
    
    console.log("Received message:", message);
    console.log("Received recipe:", recipe);
    const processedQuestion = await processUserMessage(message, JSON.stringify(recipe));
    
    const response = {
        explanation: processedQuestion.content,
    };
    
    return Response.json({ success: true, response });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}