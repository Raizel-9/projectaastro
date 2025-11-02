import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, ChineseZodiacInfo, ZodiacSign, NicknameData, LuckyInfoData, CompatibilityData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to parse JSON from model response
const parseJsonResponse = <T>(jsonString: string, functionName: string): T => {
    try {
        // The model might return markdown with json block.
        const sanitizedString = jsonString.replace(/^```json\s*|```\s*$/g, '').trim();
        return JSON.parse(sanitizedString) as T;
    } catch (e) {
        console.error(`Error parsing JSON from ${functionName}:`, e);
        console.error("Original string:", jsonString);
        throw new Error(`Failed to get a valid response from the cosmic energies. Please try again. Response was not valid JSON.`);
    }
};


export const generateWesternHoroscope = async (sign: ZodiacSign, period: 'daily' | 'weekly' | 'monthly'): Promise<string> => {
    const prompt = `Generate a ${period} horoscope for the zodiac sign ${sign}. The tone should be mystical, insightful, and positive. Focus on themes of personal growth, relationships, and career. Provide actionable advice. Format it as a single block of text.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
};


export const generateVedicHoroscope = async (profile: UserProfile): Promise<string> => {
    const prompt = `Generate a personalized Vedic astrology reading for ${profile.name}, born on ${profile.date} at ${profile.time} in ${profile.country}. Based on these details, provide a summary of their key planetary positions and what they signify for their personality and life path. The tone should be wise, spiritual, and encouraging. Focus on strengths and areas for growth. Keep it to around 3-4 paragraphs.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro', // Using pro for more complex reasoning
        contents: prompt,
    });

    return response.text;
};

export const generateChineseHoroscope = async (zodiacInfo: ChineseZodiacInfo, name: string): Promise<string> => {
    const { animal, element, yinYang } = zodiacInfo;
    const prompt = `Generate a short and insightful Chinese zodiac reading for ${name}, who is a ${element} ${animal} (${yinYang}). Provide a brief overview of their personality traits based on this combination, and then give them a personalized fortune for today covering wealth, career, and relationships. The tone should be traditional, wise, and slightly playful.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
};

export const generateTarotReading = async (cardName: string, userName: string): Promise<string> => {
    const prompt = `Provide a tarot card reading for ${userName}. The card drawn for today is "${cardName}". Explain the card's meaning in an upright position and provide personalized guidance for the day related to challenges or opportunities ${userName} might face. The tone should be mystical, empowering, and clear. Format as a single block of text.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
};

export const generateNickname = async (country: string, personality: string, age: string, gender: string, horoscope: ZodiacSign): Promise<NicknameData> => {
    const prompt = `Generate one creative and fitting nickname based on the following user profile.
    - Country of Origin: ${country === 'any' ? 'Any' : country}
    - Horoscope Sign: ${horoscope}
    - Personality Traits: ${personality}
    - Age: ${age}
    - Gender: ${gender}
    
    Return a JSON object with two keys: "nickname" (the generated name as a string) and "meaning" (a brief, one-sentence explanation of why the name is fitting, in a whimsical tone).`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    nickname: { type: Type.STRING },
                    meaning: { type: Type.STRING }
                },
                required: ["nickname", "meaning"]
            }
        }
    });
    
    return parseJsonResponse<NicknameData>(response.text, 'generateNickname');
};

export const askAnything = async (question: string, profile: UserProfile): Promise<string> => {
    const prompt = `You are a mystical, all-knowing cosmic guide. A user, ${profile.name}, has a question for you.
    Their profile: Born on ${profile.date} at ${profile.time} in ${profile.country}.
    Their question: "${question}"

    Answer their question from your cosmic perspective. Your tone should be wise, enigmatic, and slightly poetic, but still provide a helpful and direct answer. Do not give financial or medical advice.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });

    return response.text;
};

export const generateGuidance = async (mood: string, sector: string, profile: UserProfile): Promise<string> => {
    const prompt = `You are a wise and compassionate cosmic advisor. ${profile.name} is seeking guidance.
    - Their current mood: "${mood}"
    - Area of life in question: "${sector}"
    - Their profile: Born on ${profile.date} at ${profile.time} in ${profile.country}.
    
    Provide a short, comforting, and actionable piece of advice for them. The tone should be gentle, empowering, and insightful. Address them directly. Keep it to one or two paragraphs.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
};

export const generateLuckyInfo = async (profile: UserProfile): Promise<LuckyInfoData> => {
    const prompt = `Based on the user profile of ${profile.name} (born on ${profile.date}), generate their lucky information for today.
    
    Return a JSON object with three keys:
    1. "luckyNumber": A single integer between 1 and 100.
    2. "luckyColor": An object with "name" (e.g., "Cosmic Indigo") and "hex" (e.g., "#4B0082").
    3. "luckyTime": A specific time of day in "HH:MM AM/PM" format (e.g., "03:33 PM").
    
    The choices should feel astrologically and mystically inspired.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    luckyNumber: { type: Type.NUMBER },
                    luckyColor: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            hex: { type: Type.STRING },
                        },
                        required: ["name", "hex"],
                    },
                    luckyTime: { type: Type.STRING },
                },
                required: ["luckyNumber", "luckyColor", "luckyTime"],
            },
        },
    });

    return parseJsonResponse<LuckyInfoData>(response.text, 'generateLuckyInfo');
};

export const generateFunFact = async (topic: string): Promise<string> => {
    const prompt = `Tell me an amazing and little-known fun fact about ${topic}. The tone should be exciting and wondrous.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
};


export const generateLoveCompatibility = async (userProfile: UserProfile, partnerName: string, partnerSign: ZodiacSign): Promise<CompatibilityData> => {
    const prompt = `Analyze the love compatibility between two people based on their zodiac signs and names.
    Person 1: ${userProfile.name} (details: born ${userProfile.date}, which makes them a specific sign you should determine).
    Person 2: ${partnerName} (zodiac sign: ${partnerSign}).
    
    Provide a detailed analysis and return it as a JSON object with the following structure:
    - "score": An integer from 0 to 100 representing the compatibility percentage.
    - "match_summary": A catchy, one-sentence summary of the relationship dynamic.
    - "strengths": A paragraph describing the positive aspects and strengths of their connection.
    - "challenges": A paragraph outlining potential challenges or areas for growth in their relationship, with constructive advice.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    score: { type: Type.NUMBER, description: "Compatibility score from 0 to 100" },
                    match_summary: { type: Type.STRING, description: "A one-sentence summary of the relationship." },
                    strengths: { type: Type.STRING, description: "A paragraph on the relationship's strengths." },
                    challenges: { type: Type.STRING, description: "A paragraph on potential challenges." }
                },
                required: ["score", "match_summary", "strengths", "challenges"]
            }
        }
    });

    return parseJsonResponse<CompatibilityData>(response.text, 'generateLoveCompatibility');
};
