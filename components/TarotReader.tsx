import React, { useState, useEffect } from 'react';
import { generateTarotReading } from '../services/geminiService';
import { TAROT_CARD_IMAGES } from '../constants';
import LoadingSpinner from './LoadingSpinner';
import { CardIcon } from './icons/CardIcon';
import { UserProfile, DailyTarotReading } from '../types';

interface TarotReaderProps {
    profile: UserProfile;
    goBack: () => void;
}

const TarotReader: React.FC<TarotReaderProps> = ({ profile, goBack }) => {
    const [dailyReading, setDailyReading] = useState<DailyTarotReading | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const cardKeys = Object.keys(TAROT_CARD_IMAGES);
    const storageKey = `cosmic-tarot-${profile.id}`;
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        try {
            const storedReading = localStorage.getItem(storageKey);
            if (storedReading) {
                const parsedReading: DailyTarotReading = JSON.parse(storedReading);
                if (parsedReading.date === today) {
                    setDailyReading(parsedReading);
                } else {
                    localStorage.removeItem(storageKey);
                }
            }
        } catch (err) {
            console.error("Failed to load daily tarot reading from storage", err);
        }
    }, [storageKey, today]);

    const drawCard = async () => {
        setLoading(true);
        setError(null);

        const randomCardKey = cardKeys[Math.floor(Math.random() * cardKeys.length)];
        const cardName = randomCardKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        try {
            const result = await generateTarotReading(cardName, profile.name);
            const newReading: DailyTarotReading = {
                date: today,
                cardKey: randomCardKey,
                reading: result
            };
            localStorage.setItem(storageKey, JSON.stringify(newReading));
            setDailyReading(newReading);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <CardIcon className="w-16 h-16 mx-auto text-indigo-300" />
                <h2 className="text-3xl font-bold font-cinzel text-indigo-300 mt-2">Tarot Reading</h2>
                <p className="text-gray-400">
                    {dailyReading ? `Here is your card for today, ${profile.name}.` : 'Draw a card to reveal today\'s guidance.'}
                </p>
            </div>

            <div className="flex justify-center">
                {!dailyReading && (
                    <button onClick={drawCard} disabled={loading} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-8 rounded transition-colors duration-300 disabled:opacity-50">
                        {loading ? 'Shuffling...' : 'Draw a Card'}
                    </button>
                )}
            </div>

            {loading && <LoadingSpinner message="Connecting to the ethereal plane..." />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            {dailyReading && !loading && (
                <div className="animate-fade-in flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-gray-800/30 rounded-lg">
                    <img
                        src={TAROT_CARD_IMAGES[dailyReading.cardKey]}
                        alt={dailyReading.cardKey}
                        className="w-40 h-auto rounded-lg shadow-lg border-2 border-yellow-300/50"
                    />
                    <div className="md:w-2/3">
                        <h3 className="text-2xl font-cinzel text-yellow-300 mb-2">
                            {dailyReading.cardKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h3>
                        <p className="text-purple-300 whitespace-pre-wrap">{dailyReading.reading}</p>
                    </div>
                </div>
            )}
            
            {dailyReading && !loading && (
                 <p className="text-center text-gray-400 italic">Come back tomorrow for a new reading.</p>
            )}

            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default TarotReader;
