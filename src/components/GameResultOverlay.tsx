import React from 'react';

interface GameResultOverlayProps {
    gameOver: boolean;
    result: string;
    playerTotal: number;
    houseTotal: number;
    handleNewGame: () => void;
    playerName: string;
}

const GameResultOverlay: React.FC<GameResultOverlayProps> = ({ gameOver, result, playerTotal, houseTotal, handleNewGame, playerName }) => {
    if (!gameOver) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="text-center p-8 bg-transparent text-white rounded-lg">
                <h2 className="text-4xl font-bold mb-4">{result}</h2>
                <div className="text-2xl mb-4">
                    <p>{playerName}: {playerTotal}</p>
                    <p>House: {houseTotal}</p>
                </div>
                <button
                    onClick={handleNewGame}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    New Game
                </button>
            </div>
        </div>
    );
};

export default GameResultOverlay;
