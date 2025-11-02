import React, { useState } from 'react';
import { generateNickname } from '../services/geminiService';
import { NicknameData, ZodiacSign } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { NicknameIcon } from './icons/NicknameIcon';
import { COUNTRIES, WESTERN_ZODIAC_SIGNS } from '../constants';

interface NicknameGeneratorProps {
    goBack: () => void;
}

const NicknameGenerator: React.FC<NicknameGeneratorProps> = ({ goBack }) => {
    const [nicknameData, setNicknameData] = useState<NicknameData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [country, setCountry] = useState('');
    const [personality, setPersonality] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Female');
    const [horoscope, setHoroscope] = useState<ZodiacSign>(WESTERN_ZODIAC_SIGNS[0].sign);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!country || !personality || !age || !gender || !horoscope) {
            setError('All fields are required.');
            return;
        }

        const countryIsValid = COUNTRIES.some(c => c.toLowerCase() === country.toLowerCase()) || country.toLowerCase() === 'any';
        if (!countryIsValid) {
            setError('Please select a valid country from the list or type "Any".');
            return;
        }

        setLoading(true);
        setError(null);
        setNicknameData(null);

        try {
            const result = await generateNickname(country, personality, age, gender, horoscope);
            setNicknameData(result);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred while generating your nickname.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <NicknameIcon className="w-16 h-16 mx-auto text-green-300" />
                <h2 className="text-3xl font-bold font-cinzel text-green-300 mt-2">Generate a Nickname</h2>
                <p className="text-gray-400">Find a name that reflects your personality and origin.</p>
            </div>

            {!nicknameData && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">For which country you want a name?</label>
                        <input type="text" id="country" value={country} list="countries-list" onChange={e => setCountry(e.target.value)} required placeholder='e.g., Japan, or type "Any"' className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400" />
                        <datalist id="countries-list">
                            {COUNTRIES.map(c => <option key={c} value={c} />)}
                        </datalist>
                    </div>
                     <div>
                        <label htmlFor="horoscope" className="block text-sm font-medium text-gray-300 mb-1">Horoscope Sign</label>
                        <select id="horoscope" value={horoscope} onChange={e => setHoroscope(e.target.value as ZodiacSign)} className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400">
                            {WESTERN_ZODIAC_SIGNS.map(signInfo => (
                                <option key={signInfo.sign} value={signInfo.sign}>{signInfo.sign}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="personality" className="block text-sm font-medium text-gray-300 mb-1">Personality</label>
                        <input type="text" id="personality" value={personality} onChange={e => setPersonality(e.target.value)} required placeholder="e.g., Adventurous and kind" className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                     <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">Age</label>
                        <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} required placeholder="e.g., 25" className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                        <select id="gender" value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400">
                            <option>Female</option>
                            <option>Male</option>
                            <option>Non-binary</option>
                        </select>
                    </div>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    <div className="flex justify-center pt-4">
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded transition-colors duration-300" disabled={loading}>
                            {loading ? 'Generating...' : 'Generate Nickname'}
                        </button>
                    </div>
                </form>
            )}

            {loading && <LoadingSpinner message="Crafting your unique nickname..." />}

            {nicknameData && !loading && (
                <div className="text-center animate-fade-in p-4 bg-gray-800/30 rounded-lg">
                    <p className="text-gray-400">Your generated nickname is:</p>
                    <h3 className="text-4xl font-cinzel text-yellow-300 my-2">{nicknameData.nickname}</h3>
                    <p className="text-purple-300 italic">{nicknameData.meaning}</p>
                    <div className="mt-6 flex justify-center">
                         <button onClick={() => setNicknameData(null)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Generate Another</button>
                    </div>
                </div>
            )}

            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default NicknameGenerator;