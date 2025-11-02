import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { BellIcon } from './icons/BellIcon';
import LoadingSpinner from './LoadingSpinner';

interface DailyReminderProps {
    profile: UserProfile;
    goBack: () => void;
}

const DailyReminder: React.FC<DailyReminderProps> = ({ profile, goBack }) => {
    const [permission, setPermission] = useState<NotificationPermission>(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            return Notification.permission;
        }
        return 'default';
    });
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const storageKey = `cosmic-reminder-${profile.id}`;

    useEffect(() => {
        try {
            const storedValue = localStorage.getItem(storageKey);
            setIsSubscribed(storedValue === 'true');
        } catch (e) {
            console.error("Failed to read reminder status from localStorage", e);
        }
    }, [storageKey]);
    
    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
            return;
        }

        if (permission === 'granted') {
            toggleSubscription();
            return;
        }

        setLoading(true);
        try {
            const permissionResult = await Notification.requestPermission();
            setPermission(permissionResult);
            if (permissionResult === 'granted') {
                toggleSubscription(true); // Force subscribe after getting permission
            }
        } catch(error) {
            console.error("Error requesting notification permission", error);
        } finally {
            setLoading(false);
        }
    };
    
    const toggleSubscription = (forceSubscribe?: boolean) => {
        const shouldSubscribe = forceSubscribe !== undefined ? forceSubscribe : !isSubscribed;

        setIsSubscribed(shouldSubscribe);
        try {
            localStorage.setItem(storageKey, String(shouldSubscribe));
        } catch (e) {
            console.error("Failed to save reminder status to localStorage", e);
        }

        if (shouldSubscribe) {
            new Notification('Cosmic Reminders Activated!', {
                body: `We'll remind you to check your daily insights, ${profile.name}!`,
                icon: '/favicon.ico', // Assuming there's a favicon
            });
        }
    };
    
    const getStatusText = () => {
        if (permission === 'denied') {
            return 'Notifications have been blocked in your browser settings.';
        }
        if (isSubscribed) {
            return `You are subscribed for daily reminders, ${profile.name}.`;
        }
        return 'Subscribe to get a daily reminder to check your horoscope.';
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 shadow-lg shadow-purple-900/50 animate-fade-in space-y-6">
            <div className="text-center">
                <BellIcon className="w-16 h-16 mx-auto text-purple-300" />
                <h2 className="text-3xl font-bold font-cinzel text-purple-300 mt-2">Daily Reminders</h2>
                <p className="text-gray-400">{getStatusText()}</p>
            </div>
            
            {loading && <LoadingSpinner message="Awaiting your permission..." />}
            
            <div className="flex justify-center">
                {permission !== 'denied' && (
                     <button 
                        onClick={requestPermission} 
                        disabled={loading}
                        className={`${
                            isSubscribed 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-purple-500 hover:bg-purple-600'
                        } text-white font-bold py-2 px-8 rounded transition-colors duration-300 disabled:opacity-50`}
                    >
                        {isSubscribed ? 'Unsubscribe' : 'Subscribe Now'}
                    </button>
                )}
            </div>

            <div className="mt-6 flex justify-center">
                <button onClick={goBack} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">Go Back</button>
            </div>
        </div>
    );
};

export default DailyReminder;
