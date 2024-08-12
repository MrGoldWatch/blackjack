import React, { useEffect, useState } from 'react';

interface ScoreboardProps {
    playerWins: number;
    houseWins: number;
    playerName: string;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerWins, houseWins, playerName }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // Trigger the animation when the component mounts
    }, []);

    return (
        <div
            className={`absolute top-4 right-4 bg-transparent text-white p-4 border rounded shadow-lg transform transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
        >
            <div className="mt-2" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
                <div>{playerName}: {playerWins}</div>
                <div>House: {houseWins}</div>
            </div>
        </div>
    );
};

export default Scoreboard;
