import React from 'react';

interface GameControlsProps {
    handleHit: () => void;
    handleStand: () => void;
    gameOver: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ handleHit, handleStand, gameOver }) => {
    return (
        <>
            {!gameOver && (
                <div>
                    <button
                        onClick={handleHit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                        Hit
                    </button>
                    <button
                        onClick={handleStand}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Stand
                    </button>
                </div>
            )}
        </>
    );
};

export default GameControls;
