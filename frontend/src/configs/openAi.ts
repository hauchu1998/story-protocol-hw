import OpenAI from "openai";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || "";

export const openAI = new OpenAI({
  apiKey: OPENAI_API_KEY!,
  dangerouslyAllowBrowser: true,
});
