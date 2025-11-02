import React, { useState } from 'react';
import { askAnything } from '../services/geminiService';
import { UserProfile } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { QuestionIcon } from './icons/QuestionIcon';

interface AskAnythingProps {
    profile: UserProfile;
    goBack: () => void;
}

const AskAnything: React.FC<AskAnythingProps> = ({ profile, goBack }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) {
            setError('Please ask a question.');
            return;
        }
        setLoading(true);
        setError(null);
        setAnswer(null);

        try {
            const result = await askAnything(question, profile);
            setAnswer(result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <QuestionIcon className="w-16 h-16 mx-auto text-cyan-300" />
                <h2 className="text-3xl font-bold font-cinzel text-cyan-300 mt-2">Ask Anything</h2>
                <p className="text-gray-400">Ask the cosmos a question, {profile.name}.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="What would you like to know?"
                        className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 h-24 focus:ring-yellow-400 focus:border-yellow-400"
                        disabled={loading}
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" disabled={loading} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-8 rounded transition-colors duration-300 disabled:opacity-50">
                        {loading ? 'Asking the Cosmos...' : 'Ask Question'}
                    </button>
                </div>
            </form>

            {loading && <LoadingSpinner message="Searching the cosmic records..." />}
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            {answer && !loading && (
                <div className="p-4 bg-gray-800/30 rounded-lg animate-fade-in">
                    <h3 className="text-xl font-cinzel text-cyan-300 mb-2">Cosmic Guide's Answer:</h3>
                    <p className="text-purple-300 whitespace-pre-wrap">{answer}</p>
                </div>
            )}
            
            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default AskAnything;
