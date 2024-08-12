import React, { useState } from 'react';
import profanityFilter from 'bad-words';

interface WelcomeScreenProps {
    gameStarted: boolean;
    dealerHits: boolean;
    handleStartGame: () => void;
    handleDealerHitsChange: () => void;
    setPlayerName: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ gameStarted, dealerHits, handleStartGame, handleDealerHitsChange, setPlayerName }) => {
    const [name, setName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filter = new profanityFilter();
        const sanitizedInput = filter.clean(e.target.value);
        setName(sanitizedInput);
    };

    const handleStart = () => {
        if (name.trim()) {
            setPlayerName(name.trim());
        }
        handleStartGame();
    };

    return (
        <>
            {!gameStarted && (
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-8">Welcome to BLACK JACK</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleNameChange}
                            className="px-4 py-2 mb-4 text-black rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="checkbox"
                            id="dealerHits"
                            checked={dealerHits}
                            onChange={handleDealerHitsChange}
                            className="mr-2"
                        />
                        <label htmlFor="dealerHits" className="text-lg">
                            Should the dealer hit after the initial 2 cards?
                        </label>
                    </div>
                    <button
                        onClick={handleStart}
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Start Game
                    </button>
                </div>
            )}
        </>
    );
};

export default WelcomeScreen;
