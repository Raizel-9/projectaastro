import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import ProfileManager from './components/ProfileManager';
import HomeScreen from './components/HomeScreen';

const App: React.FC = () => {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

    // Load profiles from local storage on initial render
    useEffect(() => {
        try {
            const storedProfiles = localStorage.getItem('cosmic-profiles');
            if (storedProfiles) {
                setProfiles(JSON.parse(storedProfiles));
            }
        } catch (error) {
            console.error("Failed to load profiles from local storage", error);
        }
    }, []);

    // Save profiles to local storage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('cosmic-profiles', JSON.stringify(profiles));
        } catch (error) {
            console.error("Failed to save profiles to local storage", error);
        }
    }, [profiles]);

    const handleAddAndSelectProfile = (profileData: Omit<UserProfile, 'id'>) => {
        const newProfile: UserProfile = { ...profileData, id: new Date().toISOString() };
        setProfiles(prevProfiles => [...prevProfiles, newProfile]);
        setSelectedProfileId(newProfile.id);
    };

    const handleDeleteProfile = (profileId: string) => {
        setProfiles(prevProfiles => prevProfiles.filter(p => p.id !== profileId));
        if (selectedProfileId === profileId) {
            setSelectedProfileId(null);
        }
    };

    const handleSelectProfile = (profileId: string) => {
        setSelectedProfileId(profileId);
    };

    const handleGoBackToProfiles = () => {
        setSelectedProfileId(null);
    };

    const selectedProfile = profiles.find(p => p.id === selectedProfileId);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                {selectedProfile ? (
                    <HomeScreen profile={selectedProfile} goBack={handleGoBackToProfiles} />
                ) : (
                    <ProfileManager
                        profiles={profiles}
                        onAddProfile={handleAddAndSelectProfile}
                        onSelectProfile={handleSelectProfile}
                        onDeleteProfile={handleDeleteProfile}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
