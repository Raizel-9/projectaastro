import { LUNAR_NEW_YEAR_DATES, WESTERN_ZODIAC_SIGNS } from '../constants';
import { ZodiacSign, ZodiacSignInfo, ChineseZodiacInfo, ChineseZodiacAnimal, ChineseElement } from '../types';

export const getWesternZodiac = (month: number, day: number): ZodiacSignInfo | null => {
    for (const signInfo of WESTERN_ZODIAC_SIGNS) {
        const { sign, dateRange } = signInfo;
        const [start, end] = dateRange.split(' - ');
        const [startMonthStr, startDayStr] = start.split(' ');
        const [endMonthStr, endDayStr] = end.split(' ');

        const monthMap: { [key: string]: number } = {
            "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
            "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
        };

        const startMonth = monthMap[startMonthStr];
        const startDay = parseInt(startDayStr, 10);
        const endMonth = monthMap[endMonthStr];
        const endDay = parseInt(endDayStr, 10);
        
        if (startMonth === 12) { // Handle Capricorn case which spans years
            if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
                return signInfo;
            }
        } else {
            if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
                return signInfo;
            }
        }
    }
    return null;
};

export const getChineseZodiacInfo = (dateString: string): ChineseZodiacInfo => {
    const [year, month, day] = dateString.split('-').map(Number);
    const lunarNewYear = LUNAR_NEW_YEAR_DATES[year];
    
    let effectiveYear = year;
    if (lunarNewYear) {
        const [lnyMonth, lnyDay] = lunarNewYear.split('-').map(Number);
        if (month < lnyMonth || (month === lnyMonth && day < lnyDay)) {
            effectiveYear = year - 1;
        }
    }

    const animals: ChineseZodiacAnimal[] = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
    const elements: ChineseElement[] = ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'];
    
    const zodiacStartYear = 1900; // Year of the Rat (Metal)
    const animalIndex = (effectiveYear - zodiacStartYear) % 12;
    const elementIndex = (effectiveYear - zodiacStartYear) % 10;

    const animal = animals[animalIndex < 0 ? animalIndex + 12 : animalIndex];
    const element = elements[elementIndex < 0 ? elementIndex + 10 : elementIndex];
    const yinYang = effectiveYear % 2 === 0 ? 'Yang' : 'Yin';

    return { animal, element, yinYang };
};