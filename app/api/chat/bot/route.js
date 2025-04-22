import { processUserMessageWithBot } from "../../../../lib/questionProcessor";

export async function POST(request) {
  try {
    const { message, bot } = await request.json();
    
    console.log("Received message:", message);
    console.log("Received bot:", bot);
    const processedQuestion = await processUserMessageWithBot(JSON.stringify(bot), message);
    
    const response = {
        explanation: processedQuestion.content,
    };
    
    return Response.json({ success: true, response });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}