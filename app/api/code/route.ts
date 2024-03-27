import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer  code snippets. for code part Use pre  for explanation",
};
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internet error ", { status: 500 });
  }
}
