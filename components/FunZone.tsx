import React, { useState } from 'react';
import { generateFunFact } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { FunIcon } from './icons/FunIcon';

interface FunZoneProps {
    goBack: () => void;
}

const TOPICS = [
    "black holes",
    "supernovas",
    "the planet Jupiter",
    "ancient astrology",
    "the zodiac signs",
    "comets",
    "tarot card history",
    "constellations"
];

const FunZone: React.FC<FunZoneProps> = ({ goBack }) => {
    const [fact, setFact] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [topic, setTopic] = useState<string>('');

    const handleGenerate = async () => {
        const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        setTopic(randomTopic);
        setLoading(true);
        setError(null);
        setFact(null);

        try {
            const result = await generateFunFact(randomTopic);
            setFact(result);
        } catch (err: any) {
            setError(err.message || 'An cosmic disturbance occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <FunIcon className="w-16 h-16 mx-auto text-pink-300" />
                <h2 className="text-3xl font-bold font-cinzel text-pink-300 mt-2">Cosmic Fun Zone</h2>
                <p className="text-gray-400">Discover a wondrous fact from the cosmos!</p>
            </div>

            <div className="flex justify-center">
                <button onClick={handleGenerate} disabled={loading} className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-8 rounded transition-colors duration-300 disabled:opacity-50">
                    {loading ? 'Searching...' : 'Tell Me Something Cool!'}
                </button>
            </div>

            {loading && <LoadingSpinner message="Searching the cosmic archives..." />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            {fact && !loading && (
                <div className="animate-fade-in p-4 bg-gray-800/30 rounded-lg">
                     <h3 className="text-xl font-cinzel text-pink-300 mb-2 text-center">A Fun Fact About {topic}:</h3>
                    <p className="text-purple-300 whitespace-pre-wrap text-center">{fact}</p>
                </div>
            )}
            
            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default FunZone;
