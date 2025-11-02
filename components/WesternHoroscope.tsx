import React, { useState, useEffect } from 'react';
import { generateWesternHoroscope } from '../services/geminiService';
import { getWesternZodiac } from '../services/astrologyService';
import { ZodiacSignInfo, UserProfile } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { SunIcon } from './icons/SunIcon';

interface WesternHoroscopeProps {
    profile: UserProfile;
    goBack: () => void;
}

const WesternHoroscope: React.FC<WesternHoroscopeProps> = ({ profile, goBack }) => {
    const [selectedSign, setSelectedSign] = useState<ZodiacSignInfo | null>(null);
    const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [horoscope, setHoroscope] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (profile.date) {
            const [, month, day] = profile.date.split('-').map(Number);
            const signInfo = getWesternZodiac(month, day);
            setSelectedSign(signInfo);
        }
    }, [profile]);

    const getDateIdentifier = (p: 'daily' | 'weekly' | 'monthly') => {
        const now = new Date();
        if (p === 'daily') return now.toISOString().split('T')[0];
        if (p === 'monthly') return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
        // weekly
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
        return `${now.getFullYear()}-W${weekNumber}`;
    };

    const handleGenerate = async () => {
        if (!selectedSign) {
            setError('Could not determine your zodiac sign from your profile.');
            return;
        }

        const dateIdentifier = getDateIdentifier(period);
        const storageKey = `cosmic-western-${profile.id}-${selectedSign.sign}-${period}-${dateIdentifier}`;

        try {
            const cachedHoroscope = localStorage.getItem(storageKey);
            if (cachedHoroscope) {
                setHoroscope(cachedHoroscope);
                return;
            }
        } catch (e) {
            console.error("Failed to read from localStorage", e);
        }

        setLoading(true);
        setError(null);
        setHoroscope(null);
        try {
            const result = await generateWesternHoroscope(selectedSign.sign, period);
            setHoroscope(result);
            localStorage.setItem(storageKey, result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (selectedSign) {
            handleGenerate();
        }
    }, [selectedSign, period]);


    const selectedSignSymbol = selectedSign?.symbol ? React.createElement(selectedSign.symbol, { className: "w-16 h-16 mx-auto text-yellow-300" }) : <SunIcon className="w-16 h-16 mx-auto text-yellow-300" />;

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                {selectedSignSymbol}
                <h2 className="text-3xl font-bold font-cinzel text-yellow-300 mt-2">Western Horoscope</h2>
                {selectedSign ? (
                     <p className="text-gray-400">Your sign is <span className="font-bold text-yellow-300">{selectedSign.sign}</span>. Discover what the stars have in store.</p>
                ): (
                     <p className="text-gray-400">Discover what the stars have in store for you.</p>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="period" className="block text-sm font-medium text-gray-300 mb-1">Select Period:</label>
                    <select
                        id="period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
                        className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
                <button onClick={handleGenerate} disabled={loading || !selectedSign} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-8 rounded transition-colors duration-300 disabled:opacity-50">
                    {loading ? 'Consulting the Cosmos...' : 'Get Horoscope'}
                </button>
            </div>

            {loading && <LoadingSpinner message="Reading the celestial alignments..." />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            {horoscope && !loading && (
                <div className="p-4 bg-gray-800/30 rounded-lg animate-fade-in">
                    <h3 className="text-2xl font-cinzel text-yellow-300 mb-2 text-center">{selectedSign?.sign} - {period.charAt(0).toUpperCase() + period.slice(1)}</h3>
                    <p className="text-purple-300 whitespace-pre-wrap">{horoscope}</p>
                </div>
            )}
            
            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default WesternHoroscope;
