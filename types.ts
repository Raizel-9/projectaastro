export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface ZodiacSignInfo {
    sign: ZodiacSign;
    dateRange: string;
    symbol: React.FC<{ className?: string }>;
}

export type ChineseZodiacAnimal = 'Rat' | 'Ox' | 'Tiger' | 'Rabbit' | 'Dragon' | 'Snake' | 'Horse' | 'Goat' | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';
export type ChineseElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type YinYang = 'Yin' | 'Yang';

export interface ChineseZodiacInfo {
    animal: ChineseZodiacAnimal;
    element: ChineseElement;
    yinYang: YinYang;
}

export interface UserProfile {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    country: string;
}

export interface DailyTarotReading {
    date: string; // YYYY-MM-DD
    cardKey: string;
    reading: string;
}

export interface NicknameData {
    nickname: string;
    meaning: string;
}

export interface LuckyInfoData {
    luckyNumber: number;
    luckyColor: {
        name: string;
        hex: string;
    };
    luckyTime: string;
}

export interface CompatibilityData {
    score: number;
    match_summary: string;
    strengths: string;
    challenges: string;
}
