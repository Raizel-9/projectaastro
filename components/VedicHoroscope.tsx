import React, { useState, useEffect } from 'react';
import { generateVedicHoroscope } from '../services/geminiService';
import { UserProfile } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { MoonIcon } from './icons/MoonIcon';

interface VedicHoroscopeProps {
    profile: UserProfile;
    goBack: () => void;
}

const VedicHoroscope: React.FC<VedicHoroscopeProps> = ({ profile, goBack }) => {
    const [reading, setReading] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        const today = new Date().toISOString().split('T')[0];
        const storageKey = `cosmic-vedic-${profile.id}-${today}`;

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
            const result = await generateVedicHoroscope(profile);
            setReading(result);
            localStorage.setItem(storageKey, result);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        handleGenerate();
    }, [profile]);

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <MoonIcon className="w-16 h-16 mx-auto text-blue-300" />
                <h2 className="text-3xl font-bold font-cinzel text-blue-300 mt-2">Vedic Astrology Reading</h2>
                <p className="text-gray-400">An ancient perspective on your cosmic blueprint.</p>
            </div>

            {loading && <LoadingSpinner message="Interpreting the ancient texts..." />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            {reading && !loading && (
                <div className="p-4 bg-gray-800/30 rounded-lg animate-fade-in">
                    <h3 className="text-2xl font-cinzel text-blue-300 mb-2 text-center">Reading for {profile.name}</h3>
                    <p className="text-purple-300 whitespace-pre-wrap">{reading}</p>
                </div>
            )}

            <div className="mt-6 flex justify-center gap-4">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
                <button onClick={handleGenerate} disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50">
                    {loading ? 'Recalculating...' : 'Refresh Reading'}
                </button>
            </div>
        </div>
    );
};

export default VedicHoroscope;
