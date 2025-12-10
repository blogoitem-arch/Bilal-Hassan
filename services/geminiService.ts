import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CONCIERGE_SYSTEM_INSTRUCTION = `
You are "Aurelius", an elite career concierge for a super-luxury recruitment agency called "LuxeRemote".
Your tone is sophisticated, discerning, and extremely polite, but professional. You speak like a butler at a 7-star hotel.
You are assisting a candidate who is interested in the "Remote Assistant Officer" position.
Your goal is to screen them gently by asking about their experience with high-net-worth individuals, their travel availability, and their taste for luxury.
Keep responses concise (under 80 words) but elegant. 
Do not be overly enthusiastic; be composed and welcoming.
`;

const REFINER_SYSTEM_INSTRUCTION = `
You are an expert luxury brand copywriter. 
Your task is to take a standard, boring job description or professional bio provided by the user and rewrite it to sound opulent, exclusive, and high-status.
Use words like "orchestrate", "curate", "bespoke", "visionary", "seamless", "global", "elite".
The result should sound like it belongs in a high-end magazine or an exclusive club membership application.
Keep the original meaning but elevate the vocabulary and tone significantly.
Output strictly the rewritten text.
`;

export const sendMessageToConcierge = async (
  history: Message[],
  newMessage: string
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: CONCIERGE_SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return response.text || "I apologize, but I am momentarily distracted by a pressing matter. Please try again.";
  } catch (error) {
    console.error("Concierge Error:", error);
    return "Regrettably, our connection seems to be fluctuating. Please verify your network.";
  }
};

export const refineBioWithGemini = async (currentBio: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Rewrite the following professional bio to sound luxurious and elite: "${currentBio}"`,
      config: {
        systemInstruction: REFINER_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    return response.text || "I could not refine the text at this moment.";
  } catch (error) {
    console.error("Refiner Error:", error);
    return "An error occurred while crafting your narrative.";
  }
};