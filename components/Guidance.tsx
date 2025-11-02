import React, { useState } from 'react';
import { generateGuidance } from '../services/geminiService';
import { UserProfile } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { GuidanceIcon } from './icons/GuidanceIcon';

interface GuidanceProps {
    profile: UserProfile;
    goBack: () => void;
}

const Guidance: React.FC<GuidanceProps> = ({ profile, goBack }) => {
    const [guidance, setGuidance] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [mood, setMood] = useState('');
    const [sector, setSector] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mood.trim() || !sector.trim()) {
            setError('Please describe your mood and select an area of life.');
            return;
        }

        setLoading(true);
        setError(null);
        setGuidance(null);

        try {
            const result = await generateGuidance(mood, sector, profile);
            setGuidance(result);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <GuidanceIcon className="w-16 h-16 mx-auto text-teal-300" />
                <h2 className="text-3xl font-bold font-cinzel text-teal-300 mt-2">Daily Guidance</h2>
                <p className="text-gray-400">Seeking clarity, {profile.name}? Let the cosmos offer some advice.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="mood" className="block text-sm font-medium text-gray-300 mb-1">Your Current Mood</label>
                    <input
                        type="text"
                        id="mood"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        placeholder="e.g., Hopeful, confused, energetic..."
                        className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-300 mb-1">Area of Life</label>
                    <input
                        type="text"
                        id="sector"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        placeholder="e.g., Career, love, personal growth..."
                        className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400"
                        required
                    />
                </div>
                 <div className="flex justify-center pt-2">
                    <button type="submit" disabled={loading} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-8 rounded transition-colors duration-300 disabled:opacity-50">
                        {loading ? 'Channeling...' : 'Get Guidance'}
                    </button>
                </div>
            </form>

            {loading && <LoadingSpinner message={`Channeling guidance for your situation...`} />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            {guidance && !loading && (
                <div className="p-4 bg-gray-800/30 rounded-lg animate-fade-in">
                    <h3 className="text-xl font-cinzel text-teal-300 mb-2">Cosmic Advice for You:</h3>
                    <p className="text-purple-300 whitespace-pre-wrap">{guidance}</p>
                </div>
            )}
            
            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default Guidance;