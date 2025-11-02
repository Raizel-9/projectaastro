import React, { useState } from 'react';
import { generateLoveCompatibility } from '../services/geminiService';
import { UserProfile, ZodiacSign, CompatibilityData } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { WESTERN_ZODIAC_SIGNS } from '../constants';

// A heart icon for this component
const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);


interface CompatibilityCheckProps {
    profile: UserProfile;
    goBack: () => void;
}

const CompatibilityCheck: React.FC<CompatibilityCheckProps> = ({ profile, goBack }) => {
    const [partnerName, setPartnerName] = useState('');
    const [partnerSign, setPartnerSign] = useState<ZodiacSign>(WESTERN_ZODIAC_SIGNS[0].sign);
    const [compatibilityData, setCompatibilityData] = useState<CompatibilityData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!partnerName || !partnerSign) {
            setError('Please provide your partner\'s details.');
            return;
        }

        setLoading(true);
        setError(null);
        setCompatibilityData(null);

        try {
            const result = await generateLoveCompatibility(profile, partnerName, partnerSign);
            setCompatibilityData(result);
        } catch (err: any) {
            setError(err.message || 'Could not calculate compatibility at this time.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <HeartIcon className="w-16 h-16 mx-auto text-red-400" />
                <h2 className="text-3xl font-bold font-cinzel text-red-400 mt-2">Compatibility Check</h2>
                <p className="text-gray-400">See how your cosmic energies align.</p>
            </div>
            
            {!compatibilityData && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="partnerName" className="block text-sm font-medium text-gray-300 mb-1">Partner's Name</label>
                        <input
                            type="text"
                            id="partnerName"
                            value={partnerName}
                            onChange={(e) => setPartnerName(e.target.value)}
                            placeholder="e.g., Alex"
                            className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="partnerSign" className="block text-sm font-medium text-gray-300 mb-1">Partner's Zodiac Sign</label>
                        <select
                            id="partnerSign"
                            value={partnerSign}
                            onChange={(e) => setPartnerSign(e.target.value as ZodiacSign)}
                            className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
                        >
                            {WESTERN_ZODIAC_SIGNS.map(signInfo => (
                                <option key={signInfo.sign} value={signInfo.sign}>{signInfo.sign}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-center pt-2">
                        <button type="submit" disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded transition-colors duration-300 disabled:opacity-50">
                            {loading ? 'Calculating...' : 'Check Compatibility'}
                        </button>
                    </div>
                </form>
            )}

            {loading && <LoadingSpinner message="Comparing your star charts..." />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            {compatibilityData && !loading && (
                <div className="text-center animate-fade-in p-4 bg-gray-800/30 rounded-lg space-y-4">
                    <div>
                        <p className="text-lg text-gray-400">Compatibility Score</p>
                        <h3 className="text-6xl font-bold text-yellow-300 my-2">{compatibilityData.score}%</h3>
                        <p className="text-purple-300 italic">"{compatibilityData.match_summary}"</p>
                    </div>
                    <div className="text-left">
                        <h4 className="font-cinzel text-xl text-green-300 mb-1">Strengths:</h4>
                        <p className="text-gray-300 whitespace-pre-wrap">{compatibilityData.strengths}</p>
                    </div>
                     <div className="text-left">
                        <h4 className="font-cinzel text-xl text-orange-300 mb-1">Challenges:</h4>
                        <p className="text-gray-300 whitespace-pre-wrap">{compatibilityData.challenges}</p>
                    </div>
                    <div className="mt-6 flex justify-center">
                         <button onClick={() => setCompatibilityData(null)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Check Another</button>
                    </div>
                </div>
            )}

            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default CompatibilityCheck;
