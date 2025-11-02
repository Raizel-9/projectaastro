import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { StarIcon } from './icons/StarIcon';
import { COUNTRIES } from '../constants';

interface ProfileManagerProps {
    profiles: UserProfile[];
    onAddProfile: (profile: Omit<UserProfile, 'id'>) => void;
    onSelectProfile: (profileId: string) => void;
    onDeleteProfile: (profileId: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ profiles, onAddProfile, onSelectProfile, onDeleteProfile }) => {
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (profiles.length === 0) {
            setIsAdding(true);
        }
    }, [profiles.length]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
            <header className="w-full max-w-md text-center mb-8">
                <div className="flex items-center justify-center gap-4">
                    <StarIcon className="w-8 h-8 text-yellow-300" />
                    <h1 className="text-4xl sm:text-5xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400">
                        Cosmic Profiles
                    </h1>
                    <StarIcon className="w-8 h-8 text-yellow-300" />
                </div>
                 <p className="text-purple-300 mt-2 text-sm sm:text-base">
                    {isAdding ? 'Add a new profile to begin.' : 'Select a profile or add a new one.'}
                </p>
            </header>
            
            <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in">
                {isAdding ? (
                    <AddProfileForm onProfileSave={(profileData) => {
                        onAddProfile(profileData);
                        setIsAdding(false);
                    }} onCancel={() => setIsAdding(false)} showCancel={profiles.length > 0} />
                ) : (
                    <div>
                        <h2 className="text-xl font-cinzel text-center text-yellow-300 mb-4">Select a Profile</h2>
                        <ul className="space-y-3 mb-6">
                            {profiles.map(profile => (
                                <li key={profile.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-purple-400/20">
                                    <span className="font-semibold text-lg">{profile.name}</span>
                                    <div className="space-x-2">
                                        <button onClick={() => onSelectProfile(profile.id)} className="px-3 py-1 text-sm font-bold text-gray-900 bg-yellow-400 rounded hover:bg-yellow-500 transition-colors">Select</button>
                                        <button onClick={() => onDeleteProfile(profile.id)} className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded hover:bg-red-700 transition-colors">Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center">
                            <button onClick={() => setIsAdding(true)} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                                Add New Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


interface AddProfileFormProps {
    onProfileSave: (profile: Omit<UserProfile, 'id'>) => void;
    onCancel: () => void;
    showCancel: boolean;
}

const AddProfileForm: React.FC<AddProfileFormProps> = ({ onProfileSave, onCancel, showCancel }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name || !date || !time || !country) {
            setError('All fields are required.');
            return;
        }

        const birthDate = new Date(date);
        const today = new Date();
        if (birthDate > today) {
            setError("Your cosmic journey can't start in the future! Please select a past date.");
            return;
        }

        const ageInMilliseconds = today.getTime() - birthDate.getTime();
        const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;

        if (ageInYears > 115) {
            setError('Greetings, time traveler! For our calculations, please enter an age less than 115 years.');
            return;
        }
        
        const countryExists = COUNTRIES.some(c => c.toLowerCase() === country.toLowerCase());
        if (!countryExists) {
            setError('Please select a valid country from the list.');
            return;
        }

        onProfileSave({ name, date, time, country });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g., Jane Doe" className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400" />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400" />
            </div>
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">Time of Birth</label>
                <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400" />
            </div>
            <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">Country of Birth</label>
                <input type="text" id="country" value={country} list="countries-list" onChange={e => setCountry(e.target.value)} required placeholder="e.g., India" className="w-full bg-gray-800 border border-purple-400/50 rounded-md p-2 focus:ring-yellow-400 focus:border-yellow-400" />
                <datalist id="countries-list">
                    {COUNTRIES.map(c => <option key={c} value={c} />)}
                </datalist>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <div className="flex flex-col sm:flex-row justify-center pt-4 gap-4">
                {showCancel && (
                     <button type="button" onClick={onCancel} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded transition-colors duration-300">
                        Cancel
                    </button>
                )}
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-8 rounded transition-colors duration-300 flex-grow">
                    Save & View Horoscope
                </button>
            </div>
        </form>
    );
};

export default ProfileManager;
