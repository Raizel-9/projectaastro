import React, { useState, useEffect } from 'react';
import { generateChineseHoroscope } from '../services/geminiService';
import { getChineseZodiacInfo } from '../services/astrologyService';
import { UserProfile, ChineseZodiacInfo } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { DragonIcon } from './icons/DragonIcon';

interface ChineseHoroscopeProps {
    profile: UserProfile;
    goBack: () => void;
}

const ChineseHoroscope: React.FC<ChineseHoroscopeProps> = ({ profile, goBack }) => {
    const [reading, setReading] = useState<string | null>(null);
    const [zodiacInfo, setZodiacInfo] = useState<ChineseZodiacInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (info: ChineseZodiacInfo) => {
        const today = new Date().toISOString().split('T')[0];
        const storageKey = `cosmic-chinese-${profile.id}-${today}`;

        try {
            const cachedReading = localStorage.getItem(storageKey);
            if (cachedReading) {
                setReading(cachedReading);
                return;
            }
        } catch (e) { console.error("Cache read failed", e); }

        setLoading(true);
        setError(null);
        setReading(null);
        try {
            const result = await generateChineseHoroscope(info, profile.name);
            setReading(result);
            localStorage.setItem(storageKey, result);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const info = getChineseZodiacInfo(profile.date);
        setZodiacInfo(info);
        handleGenerate(info);
    }, [profile]);

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <DragonIcon className="w-16 h-16 mx-auto text-red-400" />
                <h2 className="text-3xl font-bold font-cinzel text-red-400 mt-2">Chinese Zodiac Reading</h2>
                <p className="text-gray-400">Wisdom from the Eastern traditions.</p>
            </div>

            {zodiacInfo && (
                <div className="text-center p-2 bg-gray-800/30 rounded-md">
                    <p className="text-lg text-yellow-300">
                        {profile.name}, you are a <span className="font-bold">{zodiacInfo.element} {zodiacInfo.animal}</span> ({zodiacInfo.yinYang}).
                    </p>
                </div>
            )}

            {loading && <LoadingSpinner message="Consulting the ancient scrolls..." />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            {reading && !loading && (
                <div className="p-4 bg-gray-800/30 rounded-lg animate-fade-in">
                    <p className="text-purple-300 whitespace-pre-wrap">{reading}</p>
                </div>
            )}

            <div className="mt-6 flex justify-center gap-4">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
                {zodiacInfo && <button onClick={() => handleGenerate(zodiacInfo)} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50">
                    {loading ? 'Recalculating...' : 'Refresh Reading'}
                </button>}
            </div>
        </div>
    );
};

export default ChineseHoroscope;
