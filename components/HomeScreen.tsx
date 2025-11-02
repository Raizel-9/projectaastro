import React, { useState } from 'react';
import { UserProfile } from '../types';

import WesternHoroscope from './WesternHoroscope';
import VedicHoroscope from './VedicHoroscope';
import ChineseHoroscope from './ChineseHoroscope';
import TarotReader from './TarotReader';
import NicknameGenerator from './NicknameGenerator';
import AskAnything from './AskAnything';
import Guidance from './Guidance';
import LuckyInfo from './LuckyInfo';
import FunZone from './FunZone';
import CompatibilityCheck from './CompatibilityCheck';
import DailyReminder from './DailyReminder';

import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { DragonIcon } from './icons/DragonIcon';
import { CardIcon } from './icons/CardIcon';
import { NicknameIcon } from './icons/NicknameIcon';
import { QuestionIcon } from './icons/QuestionIcon';
import { GuidanceIcon } from './icons/GuidanceIcon';
import { LuckyIcon } from './icons/LuckyIcon';
import { FunIcon } from './icons/FunIcon';
import { BellIcon } from './icons/BellIcon';

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);


interface HomeScreenProps {
    profile: UserProfile;
    goBack: () => void;
}

type View = 
    | 'main' 
    | 'western' 
    | 'vedic' 
    | 'chinese' 
    | 'tarot' 
    | 'nickname' 
    | 'ask' 
    | 'guidance' 
    | 'lucky' 
    | 'fun' 
    | 'compatibility'
    | 'reminder';

const HomeScreen: React.FC<HomeScreenProps> = ({ profile, goBack }) => {
    const [currentView, setCurrentView] = useState<View>('main');

    const featureCards = [
        { view: 'western', title: 'Western Horoscope', icon: SunIcon, color: 'text-yellow-300' },
        { view: 'vedic', title: 'Vedic Reading', icon: MoonIcon, color: 'text-blue-300' },
        { view: 'chinese', title: 'Chinese Zodiac', icon: DragonIcon, color: 'text-red-400' },
        { view: 'tarot', title: 'Tarot Reading', icon: CardIcon, color: 'text-indigo-300' },
        { view: 'lucky', title: 'Lucky Charms', icon: LuckyIcon, color: 'text-yellow-300' },
        { view: 'compatibility', title: 'Compatibility', icon: HeartIcon, color: 'text-red-400' },
        { view: 'guidance', title: 'Daily Guidance', icon: GuidanceIcon, color: 'text-teal-300' },
        { view: 'ask', title: 'Ask Anything', icon: QuestionIcon, color: 'text-cyan-300' },
        { view: 'nickname', title: 'Nickname Generator', icon: NicknameIcon, color: 'text-green-300' },
        { view: 'reminder', title: 'Daily Reminder', icon: BellIcon, color: 'text-purple-300' },
        { view: 'fun', title: 'Fun Zone', icon: FunIcon, color: 'text-pink-300' },
    ];

    const renderView = () => {
        const goBackToMain = () => setCurrentView('main');

        switch (currentView) {
            case 'western': return <WesternHoroscope profile={profile} goBack={goBackToMain} />;
            case 'vedic': return <VedicHoroscope profile={profile} goBack={goBackToMain} />;
            case 'chinese': return <ChineseHoroscope profile={profile} goBack={goBackToMain} />;
            case 'tarot': return <TarotReader profile={profile} goBack={goBackToMain} />;
            case 'nickname': return <NicknameGenerator goBack={goBackToMain} />;
            case 'ask': return <AskAnything profile={profile} goBack={goBackToMain} />;
            case 'guidance': return <Guidance profile={profile} goBack={goBackToMain} />;
            case 'lucky': return <LuckyInfo profile={profile} goBack={goBackToMain} />;
            case 'fun': return <FunZone goBack={goBackToMain} />;
            case 'compatibility': return <CompatibilityCheck profile={profile} goBack={goBackToMain} />;
            case 'reminder': return <DailyReminder profile={profile} goBack={goBackToMain} />;
            case 'main':
            default:
                return (
                    <div className="animate-fade-in space-y-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200">
                                Welcome, {profile.name}
                            </h1>
                            <p className="text-purple-300 mt-2">What cosmic insights are you seeking today?</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {featureCards.map(card => (
                                <button
                                    key={card.view}
                                    onClick={() => setCurrentView(card.view as View)}
                                    className={`card-glow flex flex-col items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm border border-purple-400/30 rounded-lg shadow-lg shadow-purple-900/20 transition-all duration-300 hover:bg-purple-900/50 hover:border-yellow-400/50 aspect-square hover:scale-105 hover:-translate-y-1`}
                                >
                                    <card.icon className={`w-12 h-12 mb-2 ${card.color}`} />
                                    <span className="text-center text-sm font-semibold text-gray-300">{card.title}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={goBack}
                                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
                            >
                                Change Profile
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return <div className="w-full max-w-4xl mx-auto">{renderView()}</div>;
};

export default HomeScreen;