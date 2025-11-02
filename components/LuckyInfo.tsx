import React, { useState, useEffect } from 'react';
import { generateLuckyInfo } from '../services/geminiService';
import { UserProfile, LuckyInfoData } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { LuckyIcon } from './icons/LuckyIcon';

interface LuckyInfoProps {
    profile: UserProfile;
    goBack: () => void;
}

const LuckyInfo: React.FC<LuckyInfoProps> = ({ profile, goBack }) => {
    const [luckyData, setLuckyData] = useState<LuckyInfoData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getLuckyInfo = async () => {
        setLoading(true);
        setError(null);

        const today = new Date().toISOString().split('T')[0];
        const storageKey = `cosmic-luckyinfo-${profile.id}-${today}`;

        try {
            const cachedData = localStorage.getItem(storageKey);
            if (cachedData) {
                setLuckyData(JSON.parse(cachedData));
                setLoading(false);
                return;
            }
        } catch (e) { console.error("Cache read failed", e); }

        try {
            const result = await generateLuckyInfo(profile);
            setLuckyData(result);
            localStorage.setItem(storageKey, JSON.stringify(result));
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLuckyInfo();
    }, [profile]);

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <LuckyIcon className="w-16 h-16 mx-auto text-yellow-300" />
                <h2 className="text-3xl font-bold font-cinzel text-yellow-300 mt-2">Your Lucky Charms</h2>
                <p className="text-gray-400">Today's fortunate alignments for {profile.name}.</p>
            </div>

            {loading && <LoadingSpinner message="Aligning with fortunate stars..." />}
            {error && (
                <div className="text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                    <button onClick={getLuckyInfo} className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-1 px-3 rounded text-sm">Try Again</button>
                </div>
            )}
            
            {luckyData && !loading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center animate-fade-in">
                    <div className="p-4 bg-gray-800/40 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-lg font-cinzel text-purple-300">Lucky Number</span>
                        <span className="text-5xl font-bold text-yellow-300">{luckyData.luckyNumber}</span>
                    </div>
                     <div className="p-4 bg-gray-800/40 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-lg font-cinzel text-purple-300">Lucky Color</span>
                        <div className="flex items-center gap-2 mt-2">
                             <div className="w-8 h-8 rounded-full border-2 border-white/50" style={{ backgroundColor: luckyData.luckyColor.hex }}></div>
                             <span className="text-2xl font-bold text-yellow-300">{luckyData.luckyColor.name}</span>
                        </div>
                    </div>
                     <div className="p-4 bg-gray-800/40 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-lg font-cinzel text-purple-300">Lucky Time</span>
                        <span className="text-2xl font-bold text-yellow-300">{luckyData.luckyTime}</span>
                    </div>
                </div>
            )}
            
            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default LuckyInfo;