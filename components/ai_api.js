import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export async function genConversion(lang, conlang, value) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Convert the following code from ${lang} to ${conlang}: ${value}
    
    CRITICAL: Output ONLY the raw source code. 
    Do not use markdown code blocks (backticks). 
    Do not include the language name. 
    Just the executable ${conlang} code text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}
